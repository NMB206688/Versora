'use server';
/**
 * @fileOverview An AI assistant that helps instructors generate learning objectives, rubric criteria, and engaging prompts for assignments.
 *
 * - createAssignmentRubric - A function that handles the assignment and rubric creation process.
 * - AiAssignmentRubricCreatorInput - The input type for the createAssignmentRubric function.
 * - AiAssignmentRubricCreatorOutput - The return type for the createAssignmentRubric function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiAssignmentRubricCreatorInputSchema = z.object({
  assignmentTopic: z.string().describe('The main subject or topic of the assignment.'),
  assignmentType: z
    .string()
    .describe('The type of assignment (e.g., essay, research paper, group project, presentation).'),
  gradeLevel:
    z.string().describe('The target grade level or educational stage (e.g., college freshman, high school senior, graduate student).'),
  desiredLengthOrDuration:
    z.string().describe('The expected length or duration of the assignment (e.g., "500-750 words", "10-minute presentation", "2-week project").'),
  additionalContext:
    z.string().optional().describe('Any additional specific requirements, constraints, or context for the assignment.'),
});
export type AiAssignmentRubricCreatorInput = z.infer<typeof AiAssignmentRubricCreatorInputSchema>;

const AiAssignmentRubricCreatorOutputSchema = z.object({
  learningObjectives: z
    .array(z.string())
    .describe('A list of specific, measurable, achievable, relevant, and time-bound learning objectives for the assignment.'),
  rubricCriteria: z
    .array(
      z.object({
        name: z.string().describe('The name of the rubric criterion (e.g., "Content & Analysis", "Organization", "Clarity").'),
        description:
          z.string().describe('A detailed description of what constitutes excellence or proficiency for this criterion.'),
        weight: z.number().optional().describe('The percentage weight of this criterion in the overall grade.'),
      })
    )
    .describe('A list of detailed rubric criteria with descriptions.'),
  assignmentPrompt: z.string().describe('The full, engaging text of the assignment prompt for students.'),
});
export type AiAssignmentRubricCreatorOutput = z.infer<typeof AiAssignmentRubricCreatorOutputSchema>;

export async function createAssignmentRubric(
  input: AiAssignmentRubricCreatorInput
): Promise<AiAssignmentRubricCreatorOutput> {
  return aiAssignmentRubricCreatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiAssignmentRubricCreatorPrompt',
  input: {schema: AiAssignmentRubricCreatorInputSchema},
  output: {schema: AiAssignmentRubricCreatorOutputSchema},
  prompt: `You are an expert educational AI assistant specializing in curriculum design and assignment creation for {{{{gradeLevel}}}} students. Your goal is to help instructors design high-quality coursework efficiently.

Based on the following assignment details, generate clear learning objectives, detailed rubric criteria with descriptions, and an engaging assignment prompt.

Assignment Topic: {{{{assignmentTopic}}}}
Assignment Type: {{{{assignmentType}}}}
Target Grade Level: {{{{gradeLevel}}}}
Desired Length/Duration: {{{{desiredLengthOrDuration}}}}
{{#if additionalContext}}Additional Context: {{{{additionalContext}}}}{{/if}}

Please ensure the generated content is specific, actionable, and encourages deep learning. The rubric criteria should be detailed enough to guide both students and graders.`,
});

const aiAssignmentRubricCreatorFlow = ai.defineFlow(
  {
    name: 'aiAssignmentRubricCreatorFlow',
    inputSchema: AiAssignmentRubricCreatorInputSchema,
    outputSchema: AiAssignmentRubricCreatorOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
