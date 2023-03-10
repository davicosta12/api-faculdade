using Dev_Backend.Data.Models.Courses;
using Dev_Backend.Data.Models.GenericPagings;

namespace Dev_Backend.Data.Repositories
{
    public class CourseRepository : RepositoryBase<DbContext>
    {
        public CourseRepository(DbContext dbContext) : base(dbContext)
        {

        }

        public async Task<GenericPaging<Course>> GetCourses(
                string? courseName = null,
                string? semesterLimitQtdeType = null,
                int? semesterLimitQtdeDe = null,
                int? semesterLimitQtdeAte = null,
                string? fieldOrderLabel = null,
                bool? isDesc = null,
                int currentPageNumber = 0,
                int pageSize = 10)
        {
            string where = "WHERE 1=1";
            string orderBy = "";

            if (String.IsNullOrEmpty(courseName) == false)
                where += $" AND c.S_Nome=@S_Nome";

            if (String.IsNullOrEmpty(semesterLimitQtdeType) == false)
            {
                switch (semesterLimitQtdeType.Trim().ToLower())
                {
                    case "exact":
                        where += $" AND c.I_Qtd_Limite_Semestres=@I_Qtd_Limite_Semestres";
                        break;
                    case "interval":
                        string sqlSemesterLimitQtdeDe = semesterLimitQtdeDe != null
                            ? " AND c.I_Qtd_Limite_Semestres >= @I_Qtd_Limite_SemestresDe"
                            : "";

                        string sqlSemesterLimitQtdeAte = semesterLimitQtdeAte != null
                            ? " AND c.I_Qtd_Limite_Semestres <= @I_Qtd_Limite_SemestresAte"
                            : "";

                        where += $"{sqlSemesterLimitQtdeDe}{sqlSemesterLimitQtdeAte}";
                        break;
                    default:
                        break;
                }
            }

            if (String.IsNullOrEmpty(fieldOrderLabel) == false)
            {
                orderBy = isDesc == false ? $"ORDER BY c.{fieldOrderLabel} ASC" : $"ORDER BY c.{fieldOrderLabel} DESC";
            }

            int maxPageSize = 50;

            pageSize = pageSize < maxPageSize ? pageSize : maxPageSize;

            int skip = currentPageNumber * pageSize;
            int take = pageSize;

            string sql = @$"SELECT COUNT(*) FROM Curso;

                            SELECT * FROM Curso c 
                            {where}
                            {orderBy} 
                            LIMIT @_skip, @_take";

            var reader = await QueryMultipleAsync(sql, new
            {
                @S_Nome = courseName,
                @I_Qtd_Limite_Semestres = semesterLimitQtdeDe,
                @I_Qtd_Limite_SemestresDe = semesterLimitQtdeDe,
                @I_Qtd_Limite_SemestresAte = semesterLimitQtdeAte,
                @_skip = skip,
                @_take = take
            });

            int totalCount = reader.Read<int>().FirstOrDefault();
            var courses = reader.Read<Course>().ToList();

            var result = new GenericPaging<Course>(courses, totalCount, currentPageNumber, pageSize);

            return result;
        }

        public async Task<Course?> GetCourse(int idCourse)
        {
            string sql = "SELECT I_Cod_Curso, S_Nome, I_Qtd_Limite_Semestres FROM Curso WHERE I_Cod_Curso=@I_Cod_Curso;";

            var courseFound = await QueryFirstOrDefaultAsync<Course>(sql, new
            {
                @I_Cod_Curso = idCourse
            });

            return courseFound;
        }

        public async Task<Course> CreateCourse(PostCourse course)
        {
            string sql;
            int identityId;

            sql = @"INSERT INTO Curso ( S_Nome, I_Qtd_Limite_Semestres ) VALUES ( @S_Nome, @I_Qtd_Limite_Semestres );
                           SELECT LAST_INSERT_ID();";

            identityId = await ExecuteScalarAsync<int>(sql, new
            {
                @S_Nome = course.S_Nome,
                @I_Qtd_Limite_Semestres = course.I_Qtd_Limite_Semestres
            });

            var courseCreated = new Course()
            {
                I_Cod_Curso = identityId,
                S_Nome = course.S_Nome,
                I_Qtd_Limite_Semestres = course.I_Qtd_Limite_Semestres
            };

            return courseCreated;
        }

        public async Task<Course?> UpdateCourse(int idCourse, PostCourse course)
        {
            string sql = @"UPDATE Curso SET S_Nome = @S_Nome, I_Qtd_Limite_Semestres = @I_Qtd_Limite_Semestres
                           WHERE I_Cod_Curso=@I_Cod_Curso;";

            await ExecuteAsync(sql, new
            {
                @I_Cod_Curso = idCourse,
                @S_Nome = course.S_Nome,
                @I_Qtd_Limite_Semestres = course.I_Qtd_Limite_Semestres
            });

            var courseUpdated = new Course()
            {
                I_Cod_Curso = idCourse,
                S_Nome = course.S_Nome,
                I_Qtd_Limite_Semestres = course.I_Qtd_Limite_Semestres
            };

            return courseUpdated;
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