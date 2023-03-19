using Dev_Backend.Bussiness.API.GenericPagings;
using Dev_Backend.Data;
using Dev_Backend.Data.Models;
using Dev_Backend.Maqui.Business;
using Dev_Backend.Maqui.Data.Repositories;
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

        [HttpGet("Options")]
        [AllowAnonymous]
        public async Task<ActionResult<GenericPaging<FKOption>>> GetOptionsForFKField(
            string? descriptionColumn,
            string? queryName,
            string? queryParameterName,
            string? queryParameterValue,
            int? firstPageSize = 20
        )
        {
            try
            {
                var queryRepository = new QueryRepository(_dbContext);

                var options = await queryRepository.GetOptionsForFKField(descriptionColumn, queryName, queryParameterName, queryParameterValue, firstPageSize);

                return Ok(options);
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

        [HttpGet("OptionByCod")]
        public async Task<ActionResult<FKOption>> GetOptionByCod(int cod, string? descriptionColumn, string? queryName)
        {
            var res = new ResponseMessage()
            {
                isValid = false,
                message = $"Id - ({cod}) da opção não foi encontrada!",
                errorMessage = $"Id - ({cod}) do opção não foi encontrada!"
            };

            try
            {
                var queryRepository = new QueryRepository(_dbContext);

                var optionFound = await queryRepository.GetOptionByCod(cod, descriptionColumn, queryName);

                if (optionFound == null)
                {
                    return NotFound(res);
                }
                return Ok(optionFound);
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