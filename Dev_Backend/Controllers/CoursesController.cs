using Dev_Backend.Data;
using Dev_Backend.Data.Models;
using Dev_Backend.Data.Models.Courses;
using Dev_Backend.Data.Models.GenericPagings;
using Dev_Backend.Data.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace my_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ApiExplorerSettings(GroupName = "Course")]
    public class CourseController : ControllerBase
    {
        private readonly DbContext _dbContext;

        public CourseController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <remarks>
        /// semesterLimitQtdeType: exact para filtrar o semestre exato ou interval para filtrar um intervalo de semestres.
        ///
        /// semesterLimitQtdeDe: caso o semesterLimitQtdeType for exact, passar o valor somente nesse campo
        ///
        /// caso o semesterLimitQtdeType for interval, passar o valor de intervalo nos campos semesterLimitQtdeDe e semesterLimitQtdeAte.
        ///
        /// fieldOrderLabel: digitar o nome do campo que queremos ordenar.
        ///
        /// isDesc: se deixarmos como true o campo, o fieldOrderLabel será ordem decrescente caso contrário crescente.
        /// </remarks>
        /// <param name="semesterLimitQtdeType">digite exact ou interval</param>
        /// <param name="fieldOrderLabel">nome do campo</param>
        /// <returns>A string status</returns>

        [HttpGet]
        public async Task<ActionResult<GenericPaging<Course>>> GetCourses(
            [FromQuery] string? courseName = null,
            [FromQuery] string? semesterLimitQtdeType = null,
            [FromQuery] int? semesterLimitQtdeDe = null,
            [FromQuery] int? semesterLimitQtdeAte = null,
            [FromQuery] string? fieldOrderLabel = null,
            [FromQuery] bool? isDesc = null,
            [FromQuery] int currentPageNumber = 0,
            [FromQuery] int pageSize = 10)
        {

            try
            {
                if (String.IsNullOrEmpty(semesterLimitQtdeType) == false)
                {
                    if ((new List<string> { "exact", "interval" }).Any(type => type == semesterLimitQtdeType.Trim().ToLower()) == false)
                    {
                        var response = new ResponseMessage();
                        response.isValid = false;
                        response.errorMessage = $"semesterLimitQtdeType aceita somente dois nomes exact ou interval.";
                        response.message = $"semesterLimitQtdeType aceita somente dois nomes exact ou interval.";
                        return BadRequest(response);
                    }
                }

                var courseRepository = new CourseRepository(_dbContext);

                var courses = await courseRepository.GetCourses(
                    courseName,
                    semesterLimitQtdeType,
                    semesterLimitQtdeDe,
                    semesterLimitQtdeAte,
                    fieldOrderLabel,
                    isDesc,
                    currentPageNumber,
                    pageSize
                    );

                return Ok(courses);
            }
            catch (Exception e)
            {
                var response = new ResponseMessage();

                response.isValid = false;
                response.errorMessage = $"{e.Message}";
                response.message = $"{e.Message}";
                response.stackTrace = e.StackTrace;

                return BadRequest(response);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var res = new ResponseMessage()
            {
                isValid = false,
                message = $"Id - ({id}) do curso não foi encontrado!",
                errorMessage = $"Id - ({id}) do curso não foi encontrado!"
            };

            try
            {
                var courseRepository = new CourseRepository(_dbContext);

                var courseFound = await courseRepository.GetCourse(id);

                if (courseFound == null)
                {
                    return NotFound(res);
                }

                return Ok(courseFound);
            }
            catch (Exception e)
            {
                var response = new ResponseMessage();

                response.isValid = false;
                response.errorMessage = $"{e.Message}";
                response.message = $"{e.Message}";
                response.stackTrace = e.StackTrace;

                return BadRequest(response);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ResponseMessage>> CreateCourse([FromBody] PostCourse course)
        {
            var res = new ResponseMessage()
            {
                isValid = true,
                message = $"Curso - {course.S_Nome} adicionado com sucesso",
                requestBody = course
            };

            try
            {
                var courseRepository = new CourseRepository(_dbContext);

                var courseCreated = await courseRepository.CreateCourse(course);
                res.responseBody = courseCreated;

                return Ok(res);
            }
            catch (Exception e)
            {
                var response = new ResponseMessage();

                response.isValid = false;
                response.errorMessage = $"{e.Message}";
                response.message = $"{e.Message}";
                response.stackTrace = e.StackTrace;

                return BadRequest(response);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ResponseMessage>> UpdateCourse(int id, [FromBody] PostCourse course)
        {
            var res = new ResponseMessage()
            {
                isValid = true,
                message = $"Curso - {course.S_Nome} alterado com sucesso",
                requestBody = course
            };

            try
            {
                var courseRepository = new CourseRepository(_dbContext);

                var courseFound = await courseRepository.GetCourse(id);

                if (courseFound == null)
                {
                    res.isValid = false;
                    res.message = $"Id - ({id}) do curso não foi encontrado!";
                    res.errorMessage = $"Id - ({id}) do curso não foi encontrado!";
                    return NotFound(res);
                }

                var courseUpdated = await courseRepository.UpdateCourse(id, course);
                res.responseBody = courseUpdated;

                return Ok(res);
            }
            catch (Exception e)
            {
                var response = new ResponseMessage();

                response.isValid = res.isValid;
                response.errorMessage = $"{e.Message}";
                response.message = $"{e.Message}";
                response.requestBody = res.requestBody;
                response.stackTrace = e.StackTrace;

                return BadRequest(response);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ResponseMessage>> DeleteCourse(int id)
        {
            var res = new ResponseMessage()
            {
                isValid = true,
                message = $"Curso removido com sucesso",
            };

            try
            {
                var courseRepository = new CourseRepository(_dbContext);

                var courseFound = await courseRepository.GetCourse(id);

                if (courseFound == null)
                {
                    res.isValid = false;
                    res.message = $"Id - ({id}) do curso não foi encontrado!";
                    res.errorMessage = $"Id - ({id}) do curso não foi encontrado!";
                    return NotFound(res);
                }

                await courseRepository.DeleteCourse(id);

                return Ok(res);
            }
            catch (Exception e)
            {
                var response = new ResponseMessage();

                response.isValid = false;
                response.errorMessage = $"{e.Message}";
                response.message = $"{e.Message}";
                response.stackTrace = e.StackTrace;

                return BadRequest(response);
            }
        }
    }
}