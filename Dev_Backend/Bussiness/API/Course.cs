using static Dev_Backend.Utils.WherePredicate.WherePredicate;

namespace Dev_Backend.Bussiness.API
{
    public class GetCourseFilterPaging
    {
        [ColumnDbName("s_Nome")]
        public string? courseName { get; set; } = null;

        [ColumnDbName("i_Qtd_Limite_Semestres")]
        public string? semesterLimitQtdeExact { get; set; } = null;

        [ColumnDbName("i_Qtd_Limite_Semestres")]
        public int? semesterLimitQtdeDe { get; set; } = null;

        [ColumnDbName("i_Qtd_Limite_Semestres")]
        public int? semesterLimitQtdeAte { get; set; } = null;
        
        public string? fieldOrderLabel { get; set; } = null;    
         
        public bool? isDesc { get; set; } = null;
    }
}