using Dev_Backend.Bussiness.API.GenericPagings;
using Dev_Backend.Data;
using Dev_Backend.Data.Models;
using Dev_Backend.Data.Repositories;
using Dev_Backend.Maqui.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace my_api.Maqui.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ApiExplorerSettings(GroupName = "Maqui")]
    public class MaquiController : ControllerBase
    {
        private readonly DbContext _dbContext;

        public MaquiController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <remarks>
        /// </remarks>
        /// <param name="descriptionColumn">Coluna_Label na Maqui</param>
        /// <param name="queryName">Nome da query após X</param>
        /// <param name="queryParameterName">Nome do parâmetro da query após @</param>
        /// <param name="queryParameterValue">Valor do parâmetro</param>
        /// <param name="firstPageSize">Tamanho da primeira página</param>
        /// <returns>Primeira página do resultado de uma query</returns>

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<GenericPaging<FKOption>>> GetOptionsForFKField(
            string? descriptionColumn,
            string? queryName,
            string? queryParameterName,
            string? queryParameterValue,
            int? firstPageSize = 5
        )
        {
            try
            {
                var courseRepository = new CourseRepository(_dbContext);

                // var courses = await courseRepository.GetCourses(filterParams, currentPageNumber, pageSize);

                return Ok();
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