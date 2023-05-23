using Dev_Backend.Bussiness.API;
using Dev_Backend.Bussiness.API.GenericPagings;
using Dev_Backend.Data;
using Dev_Backend.Data.Models;
using Dev_Backend.Data.Models.Courses;
using Dev_Backend.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
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
        /// isAdvancedSearch: se deixarmos como true o campo, considera apenas filtros de campos; como false, considera apenas o termsInput
        ///
        /// termsInput: o que foi digitado no campo de filtro por termos
        ///
        /// fieldOrderLabel: digitar o nome do campo que queremos ordenar.
        ///
        /// isDesc: se deixarmos como true o campo, o fieldOrderLabel será ordem decrescente caso contrário crescente.
        /// </remarks>
        /// <param name="alonePageSize">registros para exibir</param>
        /// <returns>A string status</returns>

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<GetCourse>>> GetCourses(
            [FromQuery] GetCourseFilterPaging filterParams,
            int? alonePageSize = 50
        )
        {
            try
            {
                var courseRepository = new CourseRepository(_dbContext);

                var courses = await courseRepository.GetCourses(filterParams, alonePageSize);

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

                await courseRepository.CreateCourse(course);

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

                await courseRepository.UpdateCourse(id, course);

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