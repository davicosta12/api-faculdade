using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dev_Backend.Utils
{
    public static class GeneralUtils
    {
        public static string GetSpecificUser(this string perfil)
        {
            string label = "";
            switch (perfil.ToUpper().Trim())
            {
                case "A":
                    label = "Aluno";
                    break;
                case "P":
                    label = "Professor";
                    break;
                case "S":
                    label = "Secretario";
                    break;
                default: break;
            }

            return label;
        }
    }
}