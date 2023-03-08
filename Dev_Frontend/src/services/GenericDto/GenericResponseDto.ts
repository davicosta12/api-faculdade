export interface GenericResponseDto {
    message: string,
    errorMessage: string,
    stackTrace: string,
    requestBody: any,
    responseBody: any,
    isValid: boolean,
}