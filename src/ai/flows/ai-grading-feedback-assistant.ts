'use server';
/**
 * @fileOverview An AI assistant that pre-analyzes student submissions against an assignment rubric and drafts constructive feedback.
 *
 * - aiGradingFeedbackAssistant - A function that handles the AI grading feedback process.
 * - AiGradingFeedbackAssistantInput - The input type for the aiGradingFeedbackAssistant function.
 * - AiGradingFeedbackAssistantOutput - The return type for the aiGradingFeedbackAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiGradingFeedbackAssistantInputSchema = z.object({
  submissionText: z
    .string()
    .describe('The full text of the student submission.'),
  rubric: z
    .string()
    .describe(
      'The assignment rubric as a string, outlining grading criteria and expectations.'
    ),
  assignmentDescription: z
    .string()
    .describe('A brief description of the assignment for context.'),
});
export type AiGradingFeedbackAssistantInput = z.infer<
  typeof AiGradingFeedbackAssistantInputSchema
>;

const AiGradingFeedbackAssistantOutputSchema = z.object({
  overallFeedback: z
    .string()
    .describe('Comprehensive constructive feedback for the student.'),
  strengths: z
    .string()
    .describe(
      'A summary of the key strengths observed in the student submission.'
    ),
  areasForImprovement: z
    .string()
    .describe(
      'Specific areas where the student can improve, referencing the rubric.'
    ),
  suggestedScore: z
    .number()
    .int()
    .min(0)
    .max(100)
    .describe(
      'A suggested overall numerical score for the submission, out of 100.'
    ),
  rationaleForScore: z
    .string()
    .describe(
      'A brief explanation of why the suggested score was given, referencing the rubric and submission content.'
    ),
});
export type AiGradingFeedbackAssistantOutput = z.infer<
  typeof AiGradingFeedbackAssistantOutputSchema
>;

export async function aiGradingFeedbackAssistant(
  input: AiGradingFeedbackAssistantInput
): Promise<AiGradingFeedbackAssistantOutput> {
  return aiGradingFeedbackAssistantFlow(input);
}

const aiGradingFeedbackAssistantPrompt = ai.definePrompt({
  name: 'aiGradingFeedbackAssistantPrompt',
  input: {schema: AiGradingFeedbackAssistantInputSchema},
  output: {schema: AiGradingFeedbackAssistantOutputSchema},
  prompt: `You are an AI grading assistant designed to help instructors provide efficient, consistent, and constructive feedback to students.
Your task is to analyze a student's submission against a given assignment description and rubric.

Provide comprehensive, constructive feedback, identify strengths, pinpoint areas for improvement, suggest an overall numerical score out of 100, and provide a brief rationale for that score.

Instructions:
1.  Read the "Assignment Description" carefully to understand the context and goals.
2.  Thorou_g_hly review the "Rubric" to understand the grading criteria and expectations.
3.  Analyze the "Student Submission" against both the description and the rubric.
4.  Draft feedback that is encouraging yet clear, identifying specific examples from the submission where possible.
5.  Ensure the suggested score and rationale directly reflect the performance against the rubric.

Assignment Description:
{{{assignmentDescription}}}

Rubric:
{{{rubric}}}

Student Submission:
{{{submissionText}}}`,
});

const aiGradingFeedbackAssistantFlow = ai.defineFlow(
  {
    name: 'aiGradingFeedbackAssistantFlow',
    inputSchema: AiGradingFeedbackAssistantInputSchema,
    outputSchema: AiGradingFeedbackAssistantOutputSchema,
  },
  async input => {
    const {output} = await aiGradingFeedbackAssistantPrompt(input);
    if (!output) {
      throw new Error('Failed to generate AI grading feedback.');
    }
    return output;
  }
);
