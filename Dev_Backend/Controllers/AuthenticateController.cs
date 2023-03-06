using Dev_Backend.Data;
using Dev_Backend.Data.Models;
using Dev_Backend.Data.Models.Authentication;
using Dev_Backend.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
                message = $"'{userLogin.S_CPF}' não foi encontrado!",
                errorMessage = $"'{userLogin.S_CPF}' não foi encontrado!!"
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

        [HttpPost]
        [Route("cadastrar")]
        [AllowAnonymous]
        public async Task<ActionResult<SignUpUser>> UserRegister([FromBody] SignUpUser userRegister)
        {
            var res = new ResponseMessage()
            {
                isValid = false,
                message = $"Já existe uma conta com esse CPF '{userRegister.S_CPF}', por favor digite outro CPF.",
                errorMessage = $"Já existe uma conta com esse CPF '{userRegister.S_CPF}', por favor digite outro CPF."
            };

            try
            {
                var authenticationRepository = new AuthenticationRepository(_dbContext);
                var userRepository = new UserRepository(_dbContext);

                var userFound = await userRepository.GetUserByCPF(userRegister.S_CPF);

                if (userFound != null)
                {
                    return BadRequest(res);
                }

                var createUser = await authenticationRepository.UserRegister(userRegister);

                return Ok(createUser);
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
