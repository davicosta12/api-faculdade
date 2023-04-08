import GenericPagingResponseDto from "./PagingResponseDto";

export default interface GenericPagingDto<T> {
    result: T[],
    paging: GenericPagingResponseDto,
}
