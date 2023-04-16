using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dev_Backend.Utils.WherePredicate;
using System.ComponentModel.DataAnnotations;

namespace api_faculdade.Bussiness.API
{
    public class GetUserFilterPaging
    {
        [ColumnDbName("C_Perfil")]
        [Required]
        public string perfil { get; set; } = "";

        [ColumnDbName("S_Nome")]
        public string? userName { get; set; } = null;

        [ColumnDbName("S_RA")]
        public string? studantRa { get; set; } = null;

        [ColumnDbName("C_Sexo")]
        public string? gender { get; set; } = null;

        [ColumnDbName("S_Nome_Mae")]
        public string? motherName { get; set; } = null;

        [ColumnDbName("B_E_Ativo")]
        public bool? isActive { get; set; } = null;

        public bool isAdvancedSearch { get; set; } = false;

        public string? termsInput { get; set; } = null;

        public string? fieldOrderLabel { get; set; } = null;

        public bool? isDesc { get; set; } = null;
    }
}