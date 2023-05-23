using Dev_Backend.Bussiness.API;
using Dev_Backend.Bussiness.API.GenericPagings;
using Dev_Backend.Data.Models.Courses;
using Dev_Backend.Extensions;
using Dev_Backend.Helpers;
using Dev_Backend.Maqui.Data.Models;
using Dev_Backend.Utils.WherePredicate;

namespace Dev_Backend.Data.Repositories
{
    public class CourseRepository : RepositoryBase<DbContext>
    {
        public CourseRepository(DbContext dbContext) : base(dbContext)
        {

        }

        public async Task<IEnumerable<GetCourse>> GetCourses(GetCourseFilterPaging filterParams, int? alonePageSize)
        {
            string where = "";
            string calculateNextDate = @"
                (
                    select
                        t.D_Data_Inicio
                    from Turma t
                    where t.I_Cod_Curso = c.I_Cod_Curso and t.D_Data_Inicio >= curdate()
                    order by t.D_Data_Inicio desc
                    limit 1
                )
            ".Replace(Environment.NewLine, "");
            if (filterParams.isAdvancedSearch)
            {
                where = CoursesWherePredicate.GetCoursesFilterWhere(filterParams);
            }
            else
            {
                where = FilterByTerms.GetWhereOfTerms(filterParams.termsInput, new [] { "c.S_Sequencial", "c.S_Nome", "c.F_Valor", calculateNextDate });
            }

            int minPageSize = 5;
            int maxPageSize = 50;
            if (alonePageSize < minPageSize)
            {
                alonePageSize = minPageSize;
            }
            if (alonePageSize > maxPageSize)
            {
                alonePageSize = maxPageSize;
            }

            string sql = @$"
                SELECT
                    c.I_Cod_Curso,
                    c.S_Sequencial,
                    c.S_Nome,
                    c.F_Valor,
                    {calculateNextDate} AS DataInicioProximaTurma
                FROM Curso c
                WHERE 1=1 {where}
                ORDER BY {calculateNextDate}
                LIMIT @_skip
            ";
            
            var sqlParams = new Dictionary<string, object?>
            {
                ["@serial"] = filterParams.serial,
                ["@name"] = filterParams.name,
                ["@priceExact"] = filterParams.priceExact,
                ["@priceDe"] = filterParams.priceDe,
                ["@priceAte"] = filterParams.priceAte,
                ["@nextClassroomStartDateExact"] = filterParams.nextClassroomStartDateExact,
                ["@nextClassroomStartDateDe"] = filterParams.nextClassroomStartDateDe,
                ["@nextClassroomStartDateAte"] = filterParams.nextClassroomStartDateAte,
                ["@_skip"] = alonePageSize,
            };
            if (!filterParams.isAdvancedSearch)
            {
                FilterByTerms.AddTerms(sqlParams, filterParams.termsInput);
            }
            var result = await QueryAsync<GetCourse>(sql, sqlParams.AsExpandoObject());

            return result;
        }

        private string CourseDetailQuery(int idCourse, Dictionary<string, object?> sqlParams, bool shouldGetAllStudents = false)
        {
            string sql = @$"
                SELECT
                    c.I_Cod_Curso,
                    c.S_Sequencial,
                    c.S_Nome,
                    c.F_Valor,
                    c.S_Pre_Cod
                FROM Curso c WHERE c.I_Cod_Curso = @I_Cod_Curso;
                    
                SELECT
                    t.I_Cod_Turma,
                    t.I_Cod_Curso,
                    t.S_Sequencial,
                    t.I_Modalidade,
                    t.I_Cod_Configuracao_De_Periodo,
                    t.B_Esta_Pendente,
                    t.D_Data_Inicio,
                    t.D_Data_Fim,
                    t.S_Pre_Cod,
                    t.S_Pre_Cod_Curso
                FROM Turma t WHERE t.I_Cod_Curso = @I_Cod_Curso;
                    
                SELECT
                    h.I_Cod_Horario,
                    h.I_Cod_Turma,
                    h.I_Dia_Da_Semana,
                    h.D_Hora_Inicio,
                    h.D_Hora_Fim,
                    h.B_E_Hora_Fim_No_Dia_Seguinte,
                    h.S_Pre_Cod_Turma
                FROM Turma t
                    INNER JOIN Horario h ON h.I_Cod_Turma = t.I_Cod_Turma
                WHERE t.I_Cod_Curso = @I_Cod_Curso;
                    
                SELECT
                    m.I_Cod_Matricula,
                    m.I_Cod_Turma,
                    m.I_Cod_Aluno,
                    m.S_Sequencial_RA,
                    m.S_Pre_Cod_Turma,
                    m.S_Pre_Cod_Aluno
                FROM Turma t
                    INNER JOIN Matricula m ON m.I_Cod_Turma = t.I_Cod_Turma
                WHERE t.I_Cod_Curso = @I_Cod_Curso;
            ";
            if (shouldGetAllStudents)
            {
                sql += @$"
                    SELECT
                        a.I_Cod_Aluno,
                        a.S_CPF,
                        a.S_Email,
                        a.S_Nome,
                        '' as S_Senha,
                        0 as B_Tem_Senha_Temporaria,
                        a.S_Pre_Cod
                    FROM Aluno a;
                ";
            }
            else
            {
                sql += @$"
                    SELECT DISTINCT
                        a.I_Cod_Aluno,
                        a.S_CPF,
                        a.S_Email,
                        a.S_Nome,
                        '' as S_Senha,
                        0 as B_Tem_Senha_Temporaria,
                        a.S_Pre_Cod
                    FROM Turma t
                        INNER JOIN Matricula m ON m.I_Cod_Turma = t.I_Cod_Turma
                        INNER JOIN Aluno a ON a.I_Cod_Aluno = m.I_Cod_Aluno
                    WHERE t.I_Cod_Curso = @I_Cod_Curso;
                ";
            }
            sqlParams.Add("@I_Cod_Curso", idCourse);

            return sql;
        }

        public async Task<Course?> GetCourse(int idCourse)
        {
            var sqlParams = new Dictionary<string, object?>();
            string sql = CourseDetailQuery(idCourse, sqlParams);

            var reader = await QueryMultipleAsync(sql, sqlParams);

            var result = reader.Read<Course>().FirstOrDefault();
            if (result is null)
            {
                return null;
            }
            result.Classrooms = reader.Read<Classroom>().ToList();
            var times = reader.Read<Time>().ToList();
            var enrollments = reader.Read<Enrollment>().ToList();
            var students = reader.Read<Student>().ToList();
            foreach (var iClassroom in result.Classrooms)
            {
                iClassroom.Times = times.Where(x => x.I_Cod_Turma == iClassroom.I_Cod_Turma).ToList();
                iClassroom.Enrollments = enrollments.Where(x => x.I_Cod_Turma == iClassroom.I_Cod_Turma).ToList();
                foreach (var iEnrollment in iClassroom.Enrollments)
                {
                    iEnrollment.Student = students.First(x => x.I_Cod_Aluno == iEnrollment.I_Cod_Aluno);
                }
            }

            return result;
        }

        private string UpdateCourseQuery(int idCourse, PostCourse nextCourse, Dictionary<string, object?> sqlParams)
        {
            string sql = @$"
                update Curso set
                    S_Nome = @Nome,
                    F_Valor = @Valor
                where I_Cod_Curso = @I_Cod_Curso
            ";
            sqlParams.Add("@Nome", nextCourse.S_Nome);
            sqlParams.Add("@Valor", nextCourse.F_Valor);
            sqlParams.Add("@I_Cod_Curso", idCourse);
            return sql;
        }

        private string UpdateClassroomsQuery(
            List<Classroom> nextClassrooms,
            List<Classroom> classrooms,
            Dictionary<string, object?> sqlParams
        )
        {
            string sql = "";
            int indexNew = 1;
            var notUpdated = new HashSet<int>(classrooms.Select(x => x.I_Cod_Turma));
            foreach (var iNextClassroom in nextClassrooms)
            {
                int cod = iNextClassroom.I_Cod_Turma;
                if (cod == 0)
                {
                    sql += @$"
                        INSERT INTO Turma (
                            I_Cod_Curso, S_Sequencial, I_Modalidade, I_Cod_Configuracao_De_Periodo, B_Esta_Pendente,
                            D_Data_Inicio, D_Data_Fim, S_Pre_Cod
                        ) VALUES (
                            @I_Cod_Curso, CONCAT(
                                @Sequencial_{indexNew}_NEWCLASSROOM, IIF(@Modalidade_{indexNew}_NEWCLASSROOM = 2, '', (SELECT C_Sigla FROM Configuracao_De_Periodo WHERE I_Cod_Configuracao_De_Periodo = @Cod_Configuracao_De_Periodo_{cod}_NEWCLASSROOM))
                            ),
                            @Modalidade_{indexNew}_NEWCLASSROOM, @Cod_Configuracao_De_Periodo_{indexNew}_NEWCLASSROOM, 1, @Data_Inicio_{indexNew}_NEWCLASSROOM, @Data_Fim_{indexNew}_NEWCLASSROOM,
                            @Pre_Cod_{indexNew}_NEWCLASSROOM
                        );
                    ";
                    sqlParams.Add($"@Sequencial_{indexNew}_NEWCLASSROOM", iNextClassroom.S_Sequencial);
                    sqlParams.Add($"@Modalidade_{indexNew}_NEWCLASSROOM", iNextClassroom.I_Modalidade);
                    sqlParams.Add($"@Cod_Configuracao_De_Periodo_{indexNew}_NEWCLASSROOM", iNextClassroom.I_Cod_Configuracao_De_Periodo);
                    sqlParams.Add($"@Data_Inicio_{indexNew}_NEWCLASSROOM", iNextClassroom.D_Data_Inicio);
                    sqlParams.Add($"@Data_Fim_{indexNew}_NEWCLASSROOM", iNextClassroom.D_Data_Fim);
                    sqlParams.Add($"@Pre_Cod_{indexNew}_NEWCLASSROOM", iNextClassroom.S_Pre_Cod);
                    indexNew++;
                    continue;
                }

                notUpdated.Remove(cod);

                sql += @$"
                    UPDATE Turma SET
                        I_Modalidade = @Modalidade_{cod}_CLASSROOM,
                        D_Data_Inicio = @Data_Inicio{cod}_CLASSROOM,
                        D_Data_Fim = @Data_Fim_{cod}_CLASSROOM,
                    WHERE I_Cod_Turma = {cod};
                ";
                sqlParams.Add($"@Modalidade_{cod}_CLASSROOM", iNextClassroom.I_Modalidade);
                sqlParams.Add($"@Cod_Configuracao_De_Periodo_{cod}_CLASSROOM", iNextClassroom.I_Cod_Configuracao_De_Periodo);
                sqlParams.Add($"@Data_Inicio_{cod}_CLASSROOM", iNextClassroom.D_Data_Inicio);
                sqlParams.Add($"@Data_Fim_{cod}_CLASSROOM", iNextClassroom.D_Data_Fim);
            }

            if (notUpdated.Any())
            {
                sql += @$"
                    DELETE FROM Turma
                        WHERE I_Cod_Turma IN ({string.Join(',', notUpdated)});
                ";
            }
            return sql;
        }

        private string UpdateTimesQuery(
            List<Time> nextTimes,
            List<Time> times,
            Dictionary<string, object?> sqlParams
        )
        {
            string sql = "";
            int indexNew = 1;
            var notUpdated = new HashSet<int>(times.Select(x => x.I_Cod_Horario));
            foreach (var iNextTime in nextTimes)
            {
                int cod = iNextTime.I_Cod_Horario;
                if (cod == 0)
                {
                    if (iNextTime.I_Cod_Turma == 0)
                    {
                        sql += @$"
                            INSERT INTO Horario (
                                I_Dia_Da_Semana, D_Hora_Inicio, D_Hora_Fim, B_E_Hora_Fim_No_Dia_Seguinte, S_Pre_Cod_Turma
                            ) VALUES (
                                @Dia_Da_Semana_{indexNew}_NEWTIME, @Hora_Inicio_{indexNew}_NEWTIME, @Hora_Fim_{indexNew}_NEWTIME,
                                @B_E_Hora_Fim_No_Dia_Seguinte_{indexNew}_NEWTIME, @Pre_Cod_Turma_{indexNew}_NEWTIME
                            );
                        ";
                        sqlParams.Add($"@Dia_Da_Semana_{indexNew}_NEWTIME", iNextTime.I_Dia_Da_Semana);
                        sqlParams.Add($"@Hora_Inicio_{indexNew}_NEWTIME", iNextTime.D_Hora_Inicio);
                        sqlParams.Add($"@Hora_Fim_{indexNew}_NEWTIME", iNextTime.D_Hora_Fim);
                        sqlParams.Add($"@B_E_Hora_Fim_No_Dia_Seguinte_{indexNew}_NEWTIME", iNextTime.B_E_Hora_Fim_No_Dia_Seguinte);
                        sqlParams.Add($"@Pre_Cod_Turma_{indexNew}_NEWTIME", iNextTime.S_Pre_Cod_Turma);
                        indexNew++;
                        continue;
                    }
                    else
                    {
                        sql += @$"
                            INSERT INTO Horario (
                                I_Cod_Turma, I_Dia_Da_Semana, D_Hora_Inicio, D_Hora_Fim, B_E_Hora_Fim_No_Dia_Seguinte
                            ) VALUES (
                                @Cod_Turma, @Dia_Da_Semana_{indexNew}_NEWTIME,
                                @Hora_Inicio_{indexNew}_NEWTIME, @Hora_Fim_{indexNew}_NEWTIME, @B_E_Hora_Fim_No_Dia_Seguinte_{indexNew}_NEWTIME
                            );
                        ";
                        sqlParams.Add($"@Cod_Turma_{indexNew}_NEWTIME", iNextTime.I_Cod_Turma);
                        sqlParams.Add($"@Dia_Da_Semana_{indexNew}_NEWTIME", iNextTime.I_Dia_Da_Semana);
                        sqlParams.Add($"@Hora_Inicio_{indexNew}_NEWTIME", iNextTime.D_Hora_Inicio);
                        sqlParams.Add($"@B_E_Hora_Fim_No_Dia_Seguinte_{indexNew}_NEWTIME", iNextTime.B_E_Hora_Fim_No_Dia_Seguinte);
                        sqlParams.Add($"@Hora_Fim_{indexNew}_NEWTIME", iNextTime.D_Hora_Fim);
                        indexNew++;
                        continue;
                    }
                }

                notUpdated.Remove(cod);

                sql += @$"
                    UPDATE Horario SET
                        I_Dia_Da_Semana = @Dia_Da_Semana_{cod}_TIME,
                        D_Hora_Inicio = @Hora_Inicio_{cod}_TIME,
                        D_Hora_Fim = @Hora_Fim_{cod}_TIME,
                        B_E_Hora_Fim_No_Dia_Seguinte = @B_E_Hora_Fim_No_Dia_Seguinte_{cod}_TIME
                    WHERE I_Cod_Horario = {cod};
                ";
                sqlParams.Add($"@Dia_Da_Semana_{cod}_TIME", iNextTime.I_Dia_Da_Semana);
                sqlParams.Add($"@Hora_Inicio{cod}_TIME", iNextTime.D_Hora_Inicio);
                sqlParams.Add($"@Hora_Fim{cod}_TIME", iNextTime.D_Hora_Fim);
                sqlParams.Add($"@B_E_Hora_Fim_No_Dia_Seguinte_{indexNew}_TIME", iNextTime.B_E_Hora_Fim_No_Dia_Seguinte);
            }

            if (notUpdated.Any())
            {
                sql += @$"
                    DELETE FROM Horario
                        WHERE I_Cod_Horario IN ({string.Join(',', notUpdated)});
                ";
            }
            return sql;
        }

        private string UpdateEnrollmentsQuery(
            List<Enrollment> nextEnrollments,
            List<Enrollment> enrollments,
            List<Classroom> nextClassrooms,
            List<Classroom> classrooms,
            Dictionary<string, object?> sqlParams
        )
        {
            string sql = "";
            int indexNew = 1;
            var notUpdated = new HashSet<int>(enrollments.Select(x => x.I_Cod_Matricula));
            var lastSerialsByClasroomId = new Dictionary<string, int>();
            var currentYear = (DateTime.Now.Year % 100).ToString();
            foreach (var iEnrollment in enrollments)
            {
                if (string.IsNullOrWhiteSpace(iEnrollment.S_Sequencial_RA))
                {
                    continue;
                }
                if (iEnrollment.S_Sequencial_RA.Substring(0, 2) != currentYear)
                {
                    continue;
                }
                string classroomSerial = iEnrollment.S_Sequencial_RA.Substring(0, 5);
                string ownSerialAsString = iEnrollment.S_Sequencial_RA.Substring(5, 4);
                int ownSerial = int.Parse(ownSerialAsString);
                if (!lastSerialsByClasroomId.TryAdd(classroomSerial, ownSerial))
                {
                    if (lastSerialsByClasroomId[classroomSerial] < ownSerial)
                        lastSerialsByClasroomId[classroomSerial] = ownSerial;
                }
            }
            foreach (var iNextEnrollment in nextEnrollments)
            {
                var findClassroom = classrooms.FirstOrDefault(x => x.I_Cod_Turma == iNextEnrollment.I_Cod_Turma);
                if (findClassroom == null) {
                    findClassroom = iNextEnrollment.I_Cod_Turma == 0 ?
                        nextClassrooms.FirstOrDefault(x => x.S_Pre_Cod == iNextEnrollment.S_Pre_Cod_Turma) :
                        nextClassrooms.FirstOrDefault(x => x.I_Cod_Turma == iNextEnrollment.I_Cod_Turma);
                }
                    
                var findClassroomSerialNoYear = findClassroom == null ? "992" : findClassroom.S_Sequencial;
                string findClassroomSerial = $"{currentYear}{findClassroomSerialNoYear}";
                int findOwnSerial = lastSerialsByClasroomId.GetValueOrDefault(findClassroomSerial);

                int cod = iNextEnrollment.I_Cod_Matricula;
                string sqlStudentColumn = iNextEnrollment.I_Cod_Aluno == 0 ? ", S_Pre_Cod_Aluno" : ", I_Cod_Aluno";
                string sqlStudentParam = iNextEnrollment.I_Cod_Aluno == 0 ? "@Pre_Cod_Aluno" : "@I_Cod_Aluno";
                string sqlStudentParamComma = $",{sqlStudentParam}";
                if (cod == 0)
                {
                    if (iNextEnrollment.I_Cod_Turma == 0)
                    {
                        findOwnSerial++;
                        lastSerialsByClasroomId[findClassroomSerial] = findOwnSerial;
                        sqlStudentParam += $"_{indexNew}_NEWENROLLMENT";
                        sqlStudentParamComma = $", {sqlStudentParam}";
                        sql += @$"
                            INSERT INTO Matricula (
                                S_Sequencial, S_Pre_Cod_Turma {sqlStudentColumn}
                            ) VALUES (
                                @Sequencial, @Pre_Cod_Turma_{indexNew}_NEWENROLLMENT {sqlStudentParamComma}
                            );
                        ";
                        sqlParams.Add($"@Sequencial_{indexNew}_NEWENROLLMENT", findClassroomSerial + findOwnSerial.ToString().PadLeft(4, '0'));
                        sqlParams.Add($"@Pre_Cod_Turma_{indexNew}_NEWENROLLMENT", iNextEnrollment.S_Pre_Cod_Turma);
                        sqlParams.Add(sqlStudentParam, iNextEnrollment.I_Cod_Aluno == 0 ? iNextEnrollment.S_Pre_Cod_Aluno : iNextEnrollment.I_Cod_Aluno);
                        indexNew++;
                        continue;
                    }
                    else
                    {
                        findOwnSerial++;
                        lastSerialsByClasroomId[findClassroomSerial] = findOwnSerial;
                        if (sqlStudentParam != "")
                        {
                            sqlStudentParam += $"_{indexNew}_NEWENROLLMENT";
                            sqlStudentParamComma = $", {sqlStudentParam}";
                        }
                        sql += @$"
                            INSERT INTO Matricula (
                                I_Cod_Turma, S_Sequencial {sqlStudentColumn}
                            ) VALUES (
                                @Cod_Turma, @Sequencial {sqlStudentParamComma}
                            );
                        ";
                        sqlParams.Add($"@Cod_Turma_{indexNew}_NEWENROLLMENT", iNextEnrollment.I_Cod_Turma);
                        sqlParams.Add($"@Sequencial_{indexNew}_NEWENROLLMENT", findClassroomSerial + findOwnSerial.ToString().PadLeft(4, '0'));
                        if (sqlStudentParam != "")
                        {
                            sqlParams.Add(sqlStudentParam, iNextEnrollment.S_Pre_Cod_Aluno);
                        }
                        indexNew++;
                        continue;
                    }
                }

                notUpdated.Remove(cod);
                sqlStudentColumn = iNextEnrollment.I_Cod_Aluno == 0 ? "S_Pre_Cod_Aluno" : "I_Cod_Aluno";
                sqlStudentParam = iNextEnrollment.I_Cod_Aluno == 0 ? $"@Pre_Cod_Aluno_{cod}_ENROLLMENT" : $"@I_Cod_Aluno_{cod}_ENROLLMENT";

                sql += @$"
                    UPDATE Matricula SET
                        {sqlStudentColumn} = {sqlStudentParam}
                    WHERE I_Cod_Matricula = {cod};
                ";
                sqlParams.Add(sqlStudentParam, iNextEnrollment.I_Cod_Aluno == 0 ? iNextEnrollment.S_Pre_Cod_Aluno : iNextEnrollment.I_Cod_Aluno);
            }

            if (notUpdated.Any())
            {
                sql += @$"
                    DELETE FROM Matricula
                        WHERE I_Cod_Matricula IN ({string.Join(',', notUpdated)});
                ";
            }
            return sql;
        }

        private string UpdateStudentsQuery(
            List<Student> nextStudents,
            List<Student> students,
            Dictionary<string, object?> sqlParams
        )
        {
            string sql = "";
            int indexNew = 1;
            foreach (var iNextStudent in nextStudents)
            {
                int cod = iNextStudent.I_Cod_Aluno;
                if (cod == 0)
                {
                    sql += @$"
                        INSERT INTO Aluno (
                            S_CPF, S_Email, S_Nome, S_Senha, B_Tem_Senha_Temporaria, S_Pre_Cod
                        ) VALUES (
                            @CPF_{indexNew}_NEWSTUDENT, @Email_{indexNew}_NEWSTUDENT, @Nome_{indexNew}_NEWSTUDENT,
                            SHA2(@Senha_{indexNew}_NEWSTUDENT, 512), 1, @Pre_Cod_{indexNew}_NEWSTUDENT
                        );
                    ";
                    sqlParams.Add($"@CPF_{indexNew}_NEWSTUDENT", iNextStudent.S_CPF);
                    sqlParams.Add($"@Email_{indexNew}_NEWSTUDENT", iNextStudent.S_Email);
                    sqlParams.Add($"@Nome_{indexNew}_NEWSTUDENT", iNextStudent.S_Nome);
                    sqlParams.Add($"@Senha_{indexNew}_NEWSTUDENT", iNextStudent.S_Senha);
                    sqlParams.Add($"@Pre_Cod_{indexNew}_NEWSTUDENT", iNextStudent.S_Pre_Cod);
                    indexNew++;
                    continue;
                }

                string sqlSetPass = iNextStudent.S_Senha == "" ? "" : @$"
                    ,
                    S_Senha = @Senha_{cod}_STUDENT,
                    B_Tem_Senha_Temporaria = 1
                ";

                sql += @$"
                    UPDATE Aluno SET
                        S_CPF = @CPF_{cod}_STUDENT,
                        S_Email = @Email_{cod}_STUDENT,
                        S_Nome = @Nome_{cod}_STUDENT
                        {sqlSetPass}
                    WHERE I_Cod_Aluno = {cod};
                ";
                sqlParams.Add($"@CPF_{cod}_STUDENT", iNextStudent.S_CPF);
                sqlParams.Add($"@Email_{cod}_STUDENT", iNextStudent.S_Email);
                sqlParams.Add($"@Nome_{cod}_STUDENT", iNextStudent.S_Nome);
                if (iNextStudent.S_Senha != "")
                {
                    sqlParams.Add($"@Senha_{cod}_STUDENT", iNextStudent.S_Senha);
                }
            }

            return sql;
        }

        public async Task UpdateCourse(int idCourse, PostCourse nextCourse)
        {
            var sqlDetailsParams = new Dictionary<string, object?>();
            string sqlDetails = CourseDetailQuery(idCourse, sqlDetailsParams, true);

            var reader = await QueryMultipleAsync(sqlDetails, sqlDetailsParams);

            var courseResult = reader.Read<Course>().FirstOrDefault();
            if (courseResult is null)
            {
                return;
            }
            courseResult.Classrooms = reader.Read<Classroom>().ToList();
            var times = reader.Read<Time>().ToList();
            var enrollments = reader.Read<Enrollment>().ToList();
            var students = reader.Read<Student>().ToList();
            var guidHelper = new GuidHelper();
            foreach (var iClassroom in nextCourse.Classrooms)
            {
                if (iClassroom.I_Cod_Turma > 0 || (iClassroom.Times.Count == 0 && iClassroom.Enrollments.Count == 0))
                {
                    continue;
                }
                iClassroom.S_Pre_Cod = Guid.NewGuid().ToString();
                guidHelper.Units.Add(new GuidUnit { Guid = iClassroom.S_Pre_Cod, HelpedTable = "Turma" });
                if (iClassroom.Times.Count > 0)
                {
                    guidHelper.Listeners.Add(new GuidColumnListener { GuidListened = iClassroom.S_Pre_Cod, HelpedTable = "Horario" });
                    foreach (var iTime in iClassroom.Times)
                    {
                        iTime.S_Pre_Cod_Turma = iClassroom.S_Pre_Cod;
                    }
                }
                if (iClassroom.Enrollments.Count > 0)
                {
                    guidHelper.Listeners.Add(new GuidColumnListener { GuidListened = iClassroom.S_Pre_Cod, HelpedTable = "Matricula" });
                    foreach (var iEnrollment in iClassroom.Enrollments)
                    {
                        iEnrollment.S_Pre_Cod_Turma = iClassroom.S_Pre_Cod;
                    }
                }
            }
            foreach (var iClassroom in nextCourse.Classrooms)
            {
                foreach (var iEnrollment in iClassroom.Enrollments)
                {
                    if (iEnrollment.I_Cod_Aluno == 0)
                    {
                        var studentGuid = Guid.NewGuid().ToString();
                        iEnrollment.Student.S_Pre_Cod = studentGuid;
                        guidHelper.Units.Add(new GuidUnit { Guid = studentGuid, HelpedTable = "Aluno" });
                        iEnrollment.S_Pre_Cod_Aluno = studentGuid;
                        guidHelper.Listeners.Add(new GuidColumnListener { GuidListened = studentGuid, HelpedTable = "Matricula" });
                    }
                }
            }
            
            var nextTimes = nextCourse.Classrooms.SelectMany(x => x.Times).ToList();
            var nextEnrollments = nextCourse.Classrooms.SelectMany(x => x.Enrollments).ToList();
            var nextStudentsRepeated = nextCourse.Classrooms
                .SelectMany(clas => clas.Enrollments.Select(en => en.Student))
                .ToList();
            var nextStudents = new List<Student>();
            var studentIds = new HashSet<int>();
            foreach (var iNextStudent in nextStudentsRepeated)
            {
                if (iNextStudent.I_Cod_Aluno == 0 || !studentIds.Contains(iNextStudent.I_Cod_Aluno))
                {
                    studentIds.Add(iNextStudent.I_Cod_Aluno);
                    nextStudents.Add(iNextStudent);
                }
            }

            foreach (var iClassroom in nextCourse.Classrooms)
            {
                iClassroom.S_Sequencial = $"{courseResult.S_Sequencial}{iClassroom.I_Modalidade}";
            }

            string sql = "";
            var sqlParams = new Dictionary<string, object?>();

            sql += UpdateEnrollmentsQuery(nextEnrollments, enrollments, nextCourse.Classrooms, courseResult.Classrooms, sqlParams);
            sql += UpdateStudentsQuery(nextStudents, students, sqlParams);
            sql += UpdateTimesQuery(nextTimes, times, sqlParams);
            sql += UpdateClassroomsQuery(nextCourse.Classrooms, courseResult.Classrooms, sqlParams);
            sql += UpdateCourseQuery(idCourse, nextCourse, sqlParams);

            await ExecuteAsync(sql, sqlParams.AsExpandoObject());

            var sqlRetrieveSQLKeysParams = new Dictionary<string, object?>();
            var sqlRetrieveSQLKeys = guidHelper.RetrieveSQLKeysQuery(sqlRetrieveSQLKeysParams);
            var readerRetrieveSQLKeysParams = await QueryMultipleAsync(sqlRetrieveSQLKeys, sqlRetrieveSQLKeysParams);
            guidHelper.ReadRetrieveSQLKeys(readerRetrieveSQLKeysParams);

            var sqlSynchronizeListenersParams = new Dictionary<string, object?>();
            var sqlSynchronizeListeners = guidHelper.SynchronizeListenersQuery(sqlSynchronizeListenersParams);
            await ExecuteAsync(sqlSynchronizeListeners, sqlSynchronizeListenersParams.AsExpandoObject());
        }

        private string InsertCourseQuery(PostCourse nextCourse, Dictionary<string, object?> sqlParams)
        {
            string sql = @$"
                insert into Curso (S_Nome, F_Valor, Pre_Cod)
                values (@Nome, @Valor, @Pre_Cod_Curso);
            ";
            sqlParams.Add("@Nome", nextCourse.S_Nome);
            sqlParams.Add("@Valor", nextCourse.F_Valor);
            sqlParams.Add("@Pre_Cod_Curso", nextCourse.S_Pre_Cod);
            return sql;
        }

        private string InsertClassroomsQuery(
            List<Classroom> nextClassrooms,
            Dictionary<string, object?> sqlParams
        )
        {
            string sql = "";
            int indexNew = 1;
            foreach (var iNextClassroom in nextClassrooms)
            {
                sql += @$"
                    INSERT INTO Turma (
                        S_Sequencial, I_Modalidade, I_Cod_Configuracao_De_Periodo, B_Esta_Pendente,
                        D_Data_Inicio, D_Data_Fim, S_Pre_Cod, S_Pre_Cod_Curso
                    ) VALUES (
                        CONCAT(
                            @Sequencial_{indexNew}_NEWCLASSROOM, IIF(@Modalidade_{indexNew}_NEWCLASSROOM = 2, '', (SELECT C_Sigla FROM Configuracao_De_Periodo WHERE I_Cod_Configuracao_De_Periodo = @Cod_Configuracao_De_Periodo_{indexNew}_NEWCLASSROOM))
                        ),
                        @Modalidade_{indexNew}_NEWCLASSROOM, @Cod_Configuracao_De_Periodo_{indexNew}_NEWCLASSROOM, 1, @Data_Inicio_{indexNew}_NEWCLASSROOM, @Data_Fim_{indexNew}_NEWCLASSROOM,
                        @Pre_Cod_{indexNew}_NEWCLASSROOM, @Pre_Cod_Curso
                    );
                ";
                sqlParams.Add($"@Sequencial_{indexNew}_NEWCLASSROOM", iNextClassroom.S_Sequencial);
                sqlParams.Add($"@Modalidade_{indexNew}_NEWCLASSROOM", iNextClassroom.I_Modalidade);
                sqlParams.Add($"@Cod_Configuracao_De_Periodo_{indexNew}_NEWCLASSROOM", iNextClassroom.I_Cod_Configuracao_De_Periodo);
                sqlParams.Add($"@Data_Inicio_{indexNew}_NEWCLASSROOM", iNextClassroom.D_Data_Inicio);
                sqlParams.Add($"@Data_Fim_{indexNew}_NEWCLASSROOM", iNextClassroom.D_Data_Fim);
                sqlParams.Add($"@Pre_Cod_{indexNew}_NEWCLASSROOM", iNextClassroom.S_Pre_Cod);
                indexNew++;
                continue;
            }
            
            return sql;
        }

        public async Task CreateCourse(PostCourse course)
        {
            string sqlStudentsAndCourseSerial = @$"
                SELECT
                    a.I_Cod_Aluno,
                    a.S_CPF,
                    a.S_Email,
                    a.S_Nome,
                    '' as S_Senha,
                    0 as B_Tem_Senha_Temporaria,
                    a.S_Pre_Cod
                FROM Aluno a;

                SELECT S_Sequencial FROM Curso;
            ";
            var reader = await QueryMultipleAsync(sqlStudentsAndCourseSerial);

            var students = reader.Read<Student>().ToList();
            int lastCourseSerial = reader.Read<string>().ToList().Select(x => int.Parse(x)).Max();

            var guidHelper = new GuidHelper();
            if (course.Classrooms.Count > 0)
            {
                course.S_Pre_Cod = Guid.NewGuid().ToString();
                guidHelper.Units.Add(new GuidUnit { Guid = course.S_Pre_Cod, HelpedTable = "Curso" });
                guidHelper.Listeners.Add(new GuidColumnListener { GuidListened = course.S_Pre_Cod, HelpedTable = "Turma" });
                foreach (var iClassroom in course.Classrooms)
                {
                    iClassroom.S_Pre_Cod_Curso = course.S_Pre_Cod;
                    if (iClassroom.Times.Count == 0 && iClassroom.Enrollments.Count == 0)
                    {
                        continue;
                    }
                    iClassroom.S_Pre_Cod = Guid.NewGuid().ToString();
                    guidHelper.Units.Add(new GuidUnit { Guid = iClassroom.S_Pre_Cod, HelpedTable = "Turma" });
                    if (iClassroom.Times.Count > 0)
                    {
                        guidHelper.Listeners.Add(new GuidColumnListener { GuidListened = iClassroom.S_Pre_Cod, HelpedTable = "Horario" });
                        foreach (var iTime in iClassroom.Times)
                        {
                            iTime.S_Pre_Cod_Turma = iClassroom.S_Pre_Cod;
                        }
                    }
                    if (iClassroom.Enrollments.Count > 0)
                    {
                        guidHelper.Listeners.Add(new GuidColumnListener { GuidListened = iClassroom.S_Pre_Cod, HelpedTable = "Matricula" });
                        foreach (var iEnrollment in iClassroom.Enrollments)
                        {
                            iEnrollment.S_Pre_Cod_Turma = iClassroom.S_Pre_Cod;
                        }
                    }
                }
                foreach (var iClassroom in course.Classrooms)
                {
                    foreach (var iEnrollment in iClassroom.Enrollments)
                    {
                        if (iEnrollment.I_Cod_Aluno == 0)
                        {
                            var studentGuid = Guid.NewGuid().ToString();
                            iEnrollment.Student.S_Pre_Cod = studentGuid;
                            guidHelper.Units.Add(new GuidUnit { Guid = studentGuid, HelpedTable = "Aluno" });
                            iEnrollment.S_Pre_Cod_Aluno = studentGuid;
                            guidHelper.Listeners.Add(new GuidColumnListener { GuidListened = studentGuid, HelpedTable = "Matricula" });
                        }
                    }
                }
            }

            var nextTimes = course.Classrooms.SelectMany(x => x.Times).ToList();
            var nextEnrollments = course.Classrooms.SelectMany(x => x.Enrollments).ToList();
            var nextStudentsRepeated = course.Classrooms
                .SelectMany(clas => clas.Enrollments.Select(en => en.Student))
                .ToList();
            var nextStudents = new List<Student>();
            var studentIds = new HashSet<int>();
            foreach (var iNextStudent in nextStudentsRepeated)
            {
                if (iNextStudent.I_Cod_Aluno == 0 || !studentIds.Contains(iNextStudent.I_Cod_Aluno))
                {
                    studentIds.Add(iNextStudent.I_Cod_Aluno);
                    nextStudents.Add(iNextStudent);
                }
            }

            var configurationRepository = new ConfigurationRepository(dbContext);
            foreach (var iClassroom in course.Classrooms)
            {
                iClassroom.S_Sequencial = $"{lastCourseSerial.ToString().PadLeft(2, '0')}{iClassroom.I_Modalidade}";
            }

            string sql = "";
            var sqlParams = new Dictionary<string, object?>();

            sql += UpdateEnrollmentsQuery(nextEnrollments, new List<Enrollment>(), course.Classrooms, new List<Classroom>(), sqlParams);
            sql += UpdateStudentsQuery(nextStudents, students, sqlParams);
            sql += UpdateTimesQuery(nextTimes, new List<Time>(), sqlParams);
            sql += InsertClassroomsQuery(course.Classrooms, sqlParams);
            sql += InsertCourseQuery(course, sqlParams);

            await ExecuteAsync(sql, sqlParams.AsExpandoObject());

            var sqlRetrieveSQLKeysParams = new Dictionary<string, object?>();
            var sqlRetrieveSQLKeys = guidHelper.RetrieveSQLKeysQuery(sqlRetrieveSQLKeysParams);
            var readerRetrieveSQLKeysParams = await QueryMultipleAsync(sqlRetrieveSQLKeys, sqlRetrieveSQLKeysParams);
            guidHelper.ReadRetrieveSQLKeys(readerRetrieveSQLKeysParams);

            var sqlSynchronizeListenersParams = new Dictionary<string, object?>();
            var sqlSynchronizeListeners = guidHelper.SynchronizeListenersQuery(sqlSynchronizeListenersParams);
            await ExecuteAsync(sqlSynchronizeListeners, sqlSynchronizeListenersParams.AsExpandoObject());
        }

        public async Task DeleteCourse(int idCourse)
        {
            string sql = "DELETE FROM Curso WHERE I_Cod_Curso=@I_Cod_Curso;";

            await ExecuteAsync(sql, new
            {
                @I_Cod_Curso = idCourse
            });
        }
    }
}