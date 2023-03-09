export default interface GenericPagingResponseDto {
    totalCount: number,
    currentPageNumber: number,
    totalPages: number,
    pageSize: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}