using Dev_Backend.Data.Models.PaginationResponses;

namespace Dev_Backend.Data.Models.GenericPagings
{
    public class GenericPaging<T> where T : class
    {
        public List<T> Result { get; set; }
        public PaginationResponse Paging { get; set; }

        public GenericPaging(List<T> result, int totalCount, int currentPageNumber, int pageSize)
        {
            Result = result;
            Paging = new PaginationResponse(totalCount, currentPageNumber, pageSize);
        }
    }
}