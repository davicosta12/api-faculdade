using Dev_Backend.Data.Repositories;
using Dev_Backend.Models.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using my_api.Data;
using my_api.Models;

namespace Dev_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly DbContext _dbContext;

        public AuthenticateController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthenticationModel>> Authenticate([FromBody] SignInUser userLogin)
        {
            var res = new ResponseMessage()
            {
                isValid = false,
                message = $"{userLogin.S_CPF} não foi encontrado!",
                errorMessage = $"{userLogin.S_CPF} não foi encontrado!!"
            };

            try
            {
                var authenticationRepository = new AuthenticationRepository(_dbContext);

                var authenticateModel = await authenticationRepository.Authenticate(userLogin);

                if (authenticateModel == null)
                {
                    return NotFound(res);
                }

                return Ok(authenticateModel);
            }
            catch (Exception e)
            {
                var retorno = new ResponseMessage();

                retorno.isValid = false;
                retorno.errorMessage = $"{e.Message}";
                retorno.message = $"{e.Message}";
                retorno.stackTrace = e.StackTrace;

                return BadRequest(retorno);
            }
        }
    }
}
