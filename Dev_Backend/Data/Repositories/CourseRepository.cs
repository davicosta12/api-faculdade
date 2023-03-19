using Dev_Backend.Bussiness.API;
using Dev_Backend.Bussiness.API.GenericPagings;
using Dev_Backend.Data.Models.Courses;
using Dev_Backend.Extensions;
using Dev_Backend.Utils.WherePredicate;

namespace Dev_Backend.Data.Repositories
{
    public class CourseRepository : RepositoryBase<DbContext>
    {
        public CourseRepository(DbContext dbContext) : base(dbContext)
        {

        }

        public async Task<GenericPaging<Course>> GetCourses(GetCourseFilterPaging filterParams, int? currentPageNumber, int? pageSize)
        {
            string where = "";
            if (filterParams.isAdvancedSearch)
            {
                where = CoursesWherePredicate.GetCoursesFilterWhere(filterParams);
            }
            else
            {
                where = Maqui.FilterByTerms.GetWhereOfTerms(filterParams.termsInput, new [] { "c.s_Nome", "c.i_Qtd_Limite_Semestres" });
            }
            string orderBy = "";

            if (String.IsNullOrEmpty(filterParams.fieldOrderLabel) == false && filterParams.isDesc != null)
            {
                orderBy = filterParams.isDesc == false ? $"ORDER BY c.{filterParams.fieldOrderLabel} ASC" : $"ORDER BY c.{filterParams.fieldOrderLabel} DESC";
            }

            int maxPageSize = 50;

            pageSize = pageSize < maxPageSize ? pageSize : maxPageSize;
            var skip = currentPageNumber * pageSize;
            var take = pageSize;

            string sql = @$"SELECT COUNT(DISTINCT(c.i_Cod_Curso)) FROM Curso c WHERE 1=1 {where};
                            
                            SELECT * FROM Curso c 
                            WHERE 1=1 {where}
                            {orderBy} 
                            LIMIT @_skip, @_take";
            
            var sqlParams = new Dictionary<string, object?>
            {
                ["@courseName"] = filterParams.courseName,
                ["@semesterLimitQtdeExact"] = filterParams.semesterLimitQtdeExact,
                ["@semesterLimitQtdeDe"] = filterParams.semesterLimitQtdeDe,
                ["@semesterLimitQtdeAte"] = filterParams.semesterLimitQtdeAte,
                ["@_skip"] = skip,
                ["@_take"] = take
            };
            if (!filterParams.isAdvancedSearch)
            {
                Maqui.FilterByTerms.AddTerms(sqlParams, filterParams.termsInput);
            }
            var reader = await QueryMultipleAsync(sql, sqlParams.AsExpandoObject());

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