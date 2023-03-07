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
                message = $"{userLogin.S_CPF} não foi encontrado!",
                errorMessage = $"{userLogin.S_CPF} não foi encontrado!"
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

                if (userFound == null)
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

        [HttpPut]
        [Route("novaSenha/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<ResponseMessage>> UserNewPassword(int id, [FromBody] UserNewPassword userNewPassword)
        {
            var res = new ResponseMessage()
            {
                isValid = true,
                message = $"A senha foi alterada com sucesso.",
                errorMessage = $"A senha foi alterada com sucesso",
                requestBody = userNewPassword
            };

            if (userNewPassword.password == null || userNewPassword.newPassword == null)
            {
                res.isValid = false;
                res.message = $"A senha e a nova senha são obrigatória.";
                res.errorMessage = $"A senha e a nova senha são obrigatória.";
                return BadRequest(res);
            }

            if (String.Equals(userNewPassword.password, userNewPassword.newPassword) == false)
            {
                res.isValid = false;
                res.message = $"A senha não é igual a nova senha.";
                res.errorMessage = $"A senha não é igual a nova senha.";
                return BadRequest(res);
            }

            if (userNewPassword.password.Length < 8 || userNewPassword.newPassword.Length < 8)
            {
                res.isValid = false;
                res.message = $"A senha deve conter no mínimo 8 caracteres";
                res.errorMessage = $"A senha deve conter no mínimo 8 caracteres";
                return BadRequest(res);
            }

            try
            {
                var authenticationRepository = new AuthenticationRepository(_dbContext);
                var userRepository = new UserRepository(_dbContext);

                var userFound = await userRepository.GetUserById(id);

                if (userFound == null)
                {
                    res.isValid = false;
                    res.message = $"O usuário não existe.";
                    res.errorMessage = $"O usuário não existe.";
                    return BadRequest(res);
                }

                var updateUser = await authenticationRepository.UserNewPassword(id, userNewPassword);
                res.responseBody = updateUser;

                return Ok(res);
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
