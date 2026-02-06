import { checkBotId } from 'botid/server';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
 
export const POST: RequestHandler = async ({ request }) => {
  const verification = await checkBotId();
 
  if (verification.isBot) {
    throw error(403, 'Access denied');
  }
 
  const data = await processUserRequest(request);
 
  return json({ data });
};
 
async function processUserRequest(request: Request) {
  // Your business logic here
  const body = await request.json();
  // Process the request...
  return { success: true };
}