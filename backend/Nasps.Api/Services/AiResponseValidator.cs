using Nasps.Api.Models.Dtos;

namespace Nasps.Api.Services;

public static class AiResponseValidator
{
    private static readonly HashSet<string> Difficulties = new(StringComparer.OrdinalIgnoreCase) { "Beginner", "Intermediate", "Advanced" };
    private static readonly HashSet<string> Priorities = new(StringComparer.OrdinalIgnoreCase) { "High", "Medium", "Low" };

    public static PersonalizedLearningPathDto Validate(PersonalizedLearningPathDto? value)
    {
        if (value is null || string.IsNullOrWhiteSpace(value.Summary) || value.Recommendations is null || value.Recommendations.Count is < 1 or > 6)
            throw new AiInvalidResponseException("The AI provider returned an incomplete learning path.");
        var recommendations = value.Recommendations.Select((item, index) =>
        {
            if (item is null) throw new AiInvalidResponseException("The AI provider returned an empty recommendation.");
            Require(item.Title, "recommendation title"); Require(item.Description, "recommendation description"); Require(item.Reason, "recommendation reason");
            if (!Difficulties.Contains(item.Difficulty)) throw new AiInvalidResponseException("The AI provider returned an invalid difficulty.");
            return item with { Order = index + 1, EstimatedHours = Math.Clamp(item.EstimatedHours, 1, 200), Skills = CleanList(item.Skills, "skills") };
        }).ToList();
        return value with { ProgressPercent = Math.Clamp(value.ProgressPercent, 0, 100), Recommendations = recommendations };
    }

    public static AiGeneratedTaskDto Validate(AiGeneratedTaskDto? value)
    {
        if (value is null) throw new AiInvalidResponseException("The AI provider returned an empty task draft.");
        Require(value.Title, "title"); Require(value.Description, "description"); Require(value.Difficulty, "difficulty"); Require(value.EstimatedDuration, "estimated duration");
        if (!Priorities.Contains(value.Priority)) throw new AiInvalidResponseException("The AI provider returned an invalid priority.");
        if (!Difficulties.Contains(value.Difficulty)) throw new AiInvalidResponseException("The AI provider returned an invalid difficulty.");
        return value with { Instructions = CleanList(value.Instructions, "instructions"), LearningObjectives = CleanList(value.LearningObjectives, "learning objectives"), ExpectedSkills = CleanList(value.ExpectedSkills, "expected skills"), AcceptanceCriteria = CleanList(value.AcceptanceCriteria, "acceptance criteria") };
    }

    public static TraineeInsightsDto Validate(TraineeInsightsDto? value)
    {
        if (value is null) throw new AiInvalidResponseException("The AI provider returned empty trainee insights.");
        Require(value.Summary, "summary"); Require(value.ProgressAssessment, "progress assessment");
        return value with { Strengths = CleanList(value.Strengths, "strengths", true), AreasForImprovement = CleanList(value.AreasForImprovement, "areas for improvement", true), Recommendations = CleanList(value.Recommendations, "recommendations"), NextSteps = CleanList(value.NextSteps, "next steps"), AttentionIndicators = CleanList(value.AttentionIndicators, "attention indicators", true) };
    }

    private static IReadOnlyList<string> CleanList(IReadOnlyList<string>? values, string field, bool allowEmpty = false)
    {
        var cleaned = values?.Where(item => !string.IsNullOrWhiteSpace(item)).Select(item => item.Trim()).Take(8).ToList() ?? [];
        if (!allowEmpty && cleaned.Count == 0) throw new AiInvalidResponseException($"The AI provider omitted {field}.");
        return cleaned;
    }

    private static void Require(string? value, string field)
    {
        if (string.IsNullOrWhiteSpace(value)) throw new AiInvalidResponseException($"The AI provider omitted {field}.");
    }
}
