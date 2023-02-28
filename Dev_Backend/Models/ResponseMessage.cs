namespace my_api.Models
{
  public class ResponseMessage
  {
    public string? message { get; set; }
    public string? errorMessage { get; set; }
    public string? stackTrace { get; set; }
    public dynamic? requestBody { get; set; }
    public dynamic? responseBody { get; set; }
    public bool isValid { get; set; }
  }
}