export interface LearningRecommendation {
  order: number;
  title: string;
  description: string;
  reason: string;
  skills: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
}

export interface PersonalizedLearningPath {
  summary: string;
  progressPercent: number;
  recommendations: LearningRecommendation[];
}

export interface AiGeneratedTask {
  title: string;
  description: string;
  instructions: string[];
  priority: 'High' | 'Medium' | 'Low';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDuration: string;
  learningObjectives: string[];
  expectedSkills: string[];
  acceptanceCriteria: string[];
}

export interface TraineeInsights {
  summary: string;
  progressAssessment: string;
  strengths: string[];
  areasForImprovement: string[];
  recommendations: string[];
  nextSteps: string[];
  attentionIndicators: string[];
}
