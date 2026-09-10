namespace Nasps.Api.Services;

public sealed class AiProviderOptions
{
    public const string SectionName = "Ai";
    // Existing OpenAI-compatible installations keep their original behavior.
    public string Provider { get; set; } = "OpenAI";
    public string BaseUrl { get; set; } = "https://api.openai.com/v1/";
    public string ApiKey { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public int TimeoutSeconds { get; set; } = 30;
}

public class AiServiceException(string message, Exception? innerException = null) : Exception(message, innerException) { }
public sealed class AiNotConfiguredException(string message) : AiServiceException(message) { }
public sealed class AiRateLimitException(string message) : AiServiceException(message) { }
public sealed class AiProviderUnavailableException(string message, Exception? innerException = null) : AiServiceException(message, innerException) { }
public sealed class AiInvalidResponseException(string message, Exception? innerException = null) : AiServiceException(message, innerException) { }
