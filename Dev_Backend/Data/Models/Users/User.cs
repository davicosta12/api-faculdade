using System.ComponentModel.DataAnnotations;
using Dev_Backend.Data.Models.Authentication;

namespace Dev_Backend.Data.Models.Users
{
    public class User
    {
        public int I_Cod_Usuario { get; set; }
        public string C_Perfil { get; set; }
        public string S_Nome { get; set; }
        public string S_CPF { get; set; } 
        public string S_RA { get; set; }
        public string C_Sexo { get; set; }
        public string S_Nome_Mae { get; set; }
        public bool B_E_Ativo { get; set; }
        public string S_Email { get; set; }
        public string  S_Senha { get; set; }
        public bool B_Tem_Senha_Temporaria { get; set; }
    }

    public class PostUser
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

        public UserConfirmPassword userConfirmPassword { get; set; } = new UserConfirmPassword();
        
        public bool B_Tem_Senha_Temporaria { get; set; }
    }
}