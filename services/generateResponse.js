import Session from '../model/sessionModel.js';
import callAI from '../utils/aiCaller.js'// a helper to hit OpenAI or any LLM

/**
 * Handles a new user message:
 * - Saves user message
 * - Modifies prompt
 * - Sends it to AI
 * - Saves AI response
 * - Appends JSX/CSS if present
 */
export const handleUserMessage = async ({ sessionId, userPrompt }) => {
  const session = await Session.findById(sessionId);
  if (!session) throw new Error('Session not found');

  // 1. Save user message to chat history
  session.chatHistory.push({
    role: 'user',
    content: userPrompt
  });

  const recentHistory = session.chatHistory.slice(-5).map(msg => {
    return `${msg.role.toUpperCase()}: ${msg.content}`;
  }).join('\n');

  
  // 2. Modify prompt for AI
//   const aiPrompt = `
// You are a helpful UI component generator.
// The user prompt is: "${userPrompt}"

// Your response must follow this JSON format:
// {
//   "content": "Explain or introduce the component.",
//   "component": {
//     "componentName": "YourComponentName",
//     "jsx": "<JSX code here>",
//     "css": "CSS code here or empty string"
//   }
// }
// `;


const aiPrompt = `
You are a helpful UI component generator.

Below is the conversation so far:
${recentHistory}

Now, the user says: "${userPrompt}"

Respond with a JSON following this structure:
{
  "content": "Explain or introduce the component.",
  "component": {
    "componentName": "YourComponentName",
    "jsx": "<JSX code here>",
    "css": "CSS code here or empty string"
  }
}
`;

  // 3. Call the AI
  const aiResponse = await callAI(aiPrompt); // returns a JS object (not stringified JSON)

  // 4. Save AI content to chatHistory
  session.chatHistory.push({
    role: 'ai',
    content: aiResponse.content
  });

  // 5. If AI returned JSX/CSS, store in components
  if (
    aiResponse.component &&
    (aiResponse.component.jsx || aiResponse.component.css)
  ) {
    session.components.push({
      componentName: aiResponse.component.componentName || 'Untitled Component',
      jsx: aiResponse.component.jsx || '<div>Empty Component</div>',
      css: aiResponse.component.css || ''
    });
  }

  // 6. Save session
  await session.save();

  // Return updated session or just the new additions if you prefer
  return {
    message: 'Chat and component saved',
    aiContent: aiResponse.content,
    newComponent: aiResponse.component || null
  };
};
