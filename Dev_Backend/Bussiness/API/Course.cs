using Dev_Backend.Utils.WherePredicate;

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

        // public DateTime? testDateExact { get; set; } = null;

        // public DateTime? testDateDe { get; set; } = null;

        // public DateTime? testDateAte { get; set; } = null;

        public bool isAdvancedSearch { get; set; } = false;
        public string? termsInput { get; set; } = null;
        
        public string? fieldOrderLabel { get; set; } = null;    
         
        public bool? isDesc { get; set; } = null;
    }
}