using Dev_Backend.Bussiness.API;
using Dev_Backend.Bussiness.API.GenericPagings;
using Dev_Backend.Data.Models.Courses;
using Dev_Backend.Extensions;
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
            });

            var courseCreated = new Course()
            {
                I_Cod_Curso = identityId,
                S_Nome = course.S_Nome,
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
            });

            var courseUpdated = new Course()
            {
                I_Cod_Curso = idCourse,
                S_Nome = course.S_Nome,
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