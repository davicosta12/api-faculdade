using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api_faculdade.Bussiness.API;
using Dev_Backend.Bussiness.API.GenericPagings;
using Dev_Backend.Data;
using Dev_Backend.Data.Models;
using Dev_Backend.Data.Models.Authentication;
using Dev_Backend.Data.Models.Users;
using Dev_Backend.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Dev_Backend.Utils;
using Dev_Backend.Data.Models.Configurations;

namespace api_faculdade.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [ApiExplorerSettings(GroupName = "Configuration")]
    public class ConfigurationController : ControllerBase
    {
        private readonly DbContext _dbContext;

        public ConfigurationController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<Configuration>> GetConfiguration()
        {
            var res = new ResponseMessage()
            {
                isValid = false,
                message = "Configuração não foi encontrada!",
                errorMessage = "Configuração não foi encontrada!"
            };

            try
            {
                var configurationRepository = new ConfigurationRepository(_dbContext);

                var configurationFound = await configurationRepository.GetConfiguration();

                if (configurationFound == null)
                {
                    return NotFound(res);
                }

                return Ok(configurationFound);
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

        [AllowAnonymous]
        [HttpPut()]
        public async Task<ActionResult<ResponseMessage>> UpdateConfiguration([FromBody] PutConfiguration nextConfiguration)
        {
            var res = new ResponseMessage()
            {
                isValid = true,
                message = "Configuração alterada com sucesso",
            };

            try
            {
                var configurationRepository = new ConfigurationRepository(_dbContext);

                await configurationRepository.UpdateConfiguration(nextConfiguration);

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
    }
}