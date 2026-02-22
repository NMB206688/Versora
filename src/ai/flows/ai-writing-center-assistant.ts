'use server';
/**
 * @fileOverview An AI-powered writing assistant that provides real-time feedback on essays
 * and helps with citations.
 *
 * - aiWritingCenterAssistant - A function that handles the writing assistance process.
 * - AiWritingCenterAssistantInput - The input type for the aiWritingCenterAssistant function.
 * - AiWritingCenterAssistantOutput - The return type for the aiWritingCenterAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiWritingCenterAssistantInputSchema = z.object({
  essayContent: z.string().describe('The full text content of the essay or document.'),
  citationStyle: z
    .string()
    .optional()
    .describe(
      'The desired citation style (e.g., "APA 7th Edition", "MLA 9th Edition", "Chicago 17th Edition").'
    ),
  currentCitations: z
    .string()
    .optional()
    .describe('Any existing in-text citations or bibliography entries to be reviewed.'),
});
export type AiWritingCenterAssistantInput = z.infer<typeof AiWritingCenterAssistantInputSchema>;

const AiWritingCenterAssistantOutputSchema = z.object({
  overallFeedback: z
    .string()
    .describe(
      'General feedback on the essay, covering argumentation, clarity, and overall structure.'
    ),
  structuralFeedback: z
    .string()
    .describe('Specific suggestions for improving the essay\'s organization and flow.'),
  citationSuggestions: z
    .string()
    .describe(
      'Feedback and suggestions for correctly formatting in-text citations and the bibliography according to the specified style.'
    ),
  grammarAndSpellingCorrections: z
    .string()
    .describe('Identified grammar, punctuation, and spelling errors.'),
  actionableSteps: z
    .string()
    .describe(
      'Concrete, actionable steps the student can take to improve their writing based on the feedback.'
    ),
});
export type AiWritingCenterAssistantOutput = z.infer<typeof AiWritingCenterAssistantOutputSchema>;

export async function aiWritingCenterAssistant(
  input: AiWritingCenterAssistantInput
): Promise<AiWritingCenterAssistantOutput> {
  return aiWritingCenterAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiWritingCenterAssistantPrompt',
  input: {schema: AiWritingCenterAssistantInputSchema},
  output: {schema: AiWritingCenterAssistantOutputSchema},
  prompt: `You are an AI-powered writing assistant designed to help students improve their essays and manage citations.
Your goal is to provide constructive, actionable feedback focusing on argumentation, clarity, structure, and proper citation usage.

Analyze the following essay content and provide detailed feedback in the specified categories.

Essay Content:
{{{essayContent}}}

{{#if citationStyle}}
Required Citation Style: {{{citationStyle}}}
{{/if}}

{{#if currentCitations}}
Current Citations (for review):
{{{currentCitations}}}
{{/if}}

Provide feedback focusing on:
1.  **Overall Feedback**: General comments on the strength of the argumentation, clarity of ideas, and overall effectiveness of the essay.
2.  **Structural Feedback**: Suggestions for improving the organization, paragraphing, transitions, and logical flow of the essay.
3.  **Citation Suggestions**: Evaluate the usage of citations within the essay (if 'currentCitations' is provided) and suggest improvements based on 'citationStyle'. If no 'currentCitations' are provided, offer general advice on integrating sources and avoiding plagiarism. If 'citationStyle' is provided, ensure suggestions are aligned with it.
4.  **Grammar and Spelling Corrections**: Point out specific grammar, punctuation, and spelling errors, explaining briefly why they are incorrect.
5.  **Actionable Steps**: List concrete, numbered steps the student can take to revise and improve their essay.
`,
});

const aiWritingCenterAssistantFlow = ai.defineFlow(
  {
    name: 'aiWritingCenterAssistantFlow',
    inputSchema: AiWritingCenterAssistantInputSchema,
    outputSchema: AiWritingCenterAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
