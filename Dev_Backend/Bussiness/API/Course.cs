using Dev_Backend.Utils.WherePredicate;

namespace Dev_Backend.Bussiness.API
{
    public class GetCourseFilterPaging
    {
        [ColumnDbName("s_Sequencial")]
        public string? serial { get; set; } = null;

        [ColumnDbName("s_Nome")]
        public string? name { get; set; } = null;

        [ColumnDbName("f_Valor")]
        public double? priceExact { get; set; } = null;

        [ColumnDbName("f_Valor")]
        public double? priceDe { get; set; } = null;

        [ColumnDbName("f_Valor")]
        public double? priceAte { get; set; } = null;

        public DateTime? nextClassroomStartDateExact { get; set; } = null;

        public DateTime? nextClassroomStartDateDe { get; set; } = null;

        public DateTime? nextClassroomStartDateAte { get; set; } = null;



        public bool isAdvancedSearch { get; set; } = false;
        public string? termsInput { get; set; } = null;
    }
}