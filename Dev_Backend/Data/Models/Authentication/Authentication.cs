using System.ComponentModel.DataAnnotations;
using Dev_Backend.Data.Models.Users;

namespace Dev_Backend.Data.Models.Authentication
{
    public class AuthenticationModel
    {
        public User user { get; set; }
        public string token { get; set; }
    }

    public class SignInUser
    {
        [Required]
        public string S_CPF { get; set; }
        [Required]
        public string S_Senha { get; set; }
    }

    public class SignUpUser
    {
        [Required]
        public string C_Perfil { get; set; }

        public string S_Nome { get; set; }

        [Required]
        public string S_CPF { get; set; }

        public string S_RA { get; set; }
        
        public string C_Sexo { get; set; }

        public string S_Nome_Mae { get; set; }

        public bool B_E_Ativo { get; set; }

        public string S_Email { get; set; }

        [Required]
        public string S_Senha { get; set; }
        
        public bool B_Tem_Senha_Temporaria { get; set; }
    }

    public class UserConfirmPassword
    {
        [Required]
        public string password { get; set; }
        [Required]
        public string confirmPassword { get; set; }
    }
}