using Dev_Backend.Data;
using Dev_Backend.Data.Models;
using Dev_Backend.Data.Models.Authentication;
using Dev_Backend.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

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
        public async Task<ActionResult<ResponseMessage>> UserRegister([FromBody] SignUpUser userRegister)
        {
            var res = new ResponseMessage()
            {
                isValid = true,
                message = $"Usuário '{userRegister.S_CPF}' criado com sucesso.",
                requestBody = userRegister
            };

            try
            {
                var authenticationRepository = new AuthenticationRepository(_dbContext);
                var userRepository = new UserRepository(_dbContext);

                var userFound = await userRepository.GetUserByCPF(userRegister.S_CPF);

                if (userFound == null)
                {
                    res.isValid = false;
                    res.message = $"Já existe uma conta com esse CPF '{userRegister.S_CPF}', por favor digite outro CPF.";
                    res.errorMessage = $"Já existe uma conta com esse CPF '{userRegister.S_CPF}', por favor digite outro CPF.";
                    return BadRequest(res);
                }

                var createUser = await authenticationRepository.UserRegister(userRegister);
                res.responseBody = createUser;

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

        [HttpPut]
        [Route("{userId}/novaSenha")]
        [SwaggerOperation(
            Summary = "Criar uma nova senha para o usuário",
            Description =
            @"Body: password -> senha; newPassword -> senha de confirmação")]
        [AllowAnonymous]
        public async Task<ActionResult<ResponseMessage>> UserConfirmPassword(int userId, [FromBody] UserConfirmPassword userConfirmPassword)
        {
            var res = new ResponseMessage()
            {
                isValid = true,
                message = $"A senha foi alterada com sucesso.",
                requestBody = userConfirmPassword
            };

            if (userConfirmPassword.password == null || userConfirmPassword.confirmPassword == null)
            {
                res.isValid = false;
                res.message = $"A nova senha é um campo obrigatório.";
                res.errorMessage = $"A nova senha é um campo obrigatório.";
                return BadRequest(res);
            }

            if (String.Equals(userConfirmPassword.password, userConfirmPassword.confirmPassword) == false)
            {
                res.isValid = false;
                res.message = $"As senhas não conferem.";
                res.errorMessage = $"As senhas não conferem.";
                return BadRequest(res);
            }

            if (userConfirmPassword.password.Length < 8 || userConfirmPassword.confirmPassword.Length < 8)
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

                var userFound = await userRepository.GetUserById(userId);

                if (userFound == null)
                {
                    res.isValid = false;
                    res.message = $"O usuário não existe.";
                    res.errorMessage = $"O usuário não existe.";
                    return BadRequest(res);
                }

                var updateUser = await authenticationRepository.UserConfrimPassword(userId, userConfirmPassword);
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
