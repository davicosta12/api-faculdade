namespace Dev_Backend.Data.Models.PaginationResponses
{
    public class PaginationResponse
    {
        public int TotalCount { get; set; }
        public int CurrentPageNumber { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public bool HasPreviousPage { get; set; }
        public bool HasNextPage { get; set; }

        public PaginationResponse(int totalCount, int currentPageNumber, int pageSize)
        {
            TotalCount = totalCount;
            CurrentPageNumber = currentPageNumber;
            PageSize = pageSize;
            TotalPages = (int)Math.Ceiling((double)totalCount / (double)pageSize);
            HasPreviousPage = currentPageNumber >= 1;
            HasNextPage = currentPageNumber + 1 < (int)Math.Ceiling((double)totalCount / (double)pageSize);
        }
    }
}