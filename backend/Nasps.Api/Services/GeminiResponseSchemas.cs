using Nasps.Api.Models.Dtos;

namespace Nasps.Api.Services;

internal static class GeminiResponseSchemas
{
    // JSON schemas match the existing frontend DTOs and validation rules.
    internal static object For<T>()
    {
        if (typeof(T) == typeof(PersonalizedLearningPathDto))
            return Object(
                ("summary", Text()), ("progressPercent", Integer(0, 100)),
                ("recommendations", Array(Object(
                    ("order", Integer(1, 6)), ("title", Text()), ("description", Text()),
                    ("reason", Text()), ("skills", Strings()), ("difficulty", Difficulty()),
                    ("estimatedHours", Integer(1, 200))), 3, 6)));
        if (typeof(T) == typeof(AiGeneratedTaskDto))
            return Object(
                ("title", Text()), ("description", Text()), ("instructions", Strings()),
                ("priority", Choice("High", "Medium", "Low")), ("difficulty", Difficulty()),
                ("estimatedDuration", Text()), ("learningObjectives", Strings()),
                ("expectedSkills", Strings()), ("acceptanceCriteria", Strings()));
        if (typeof(T) == typeof(TraineeInsightsDto))
            return Object(
                ("summary", Text()), ("progressAssessment", Text()), ("strengths", Strings(0)),
                ("areasForImprovement", Strings(0)), ("recommendations", Strings()),
                ("nextSteps", Strings()), ("attentionIndicators", Strings(0)));
        throw new AiNotConfiguredException("No Gemini response schema exists for this feature.");
    }

    private static object Text() => new { type = "string" };
    private static object Integer(int min, int max) => new { type = "integer", minimum = min, maximum = max };
    private static object Choice(params string[] values) => new { type = "string", @enum = values };
    private static object Difficulty() => Choice("Beginner", "Intermediate", "Advanced");
    private static object Strings(int min = 1) => Array(Text(), min, 8);
    private static object Array(object item, int min, int max) => new { type = "array", items = item, minItems = min, maxItems = max };
    private static object Object(params (string Name, object Schema)[] properties) => new
    {
        type = "object",
        properties = properties.ToDictionary(property => property.Name, property => property.Schema),
        required = properties.Select(property => property.Name).ToArray(),
        additionalProperties = false,
    };
}
