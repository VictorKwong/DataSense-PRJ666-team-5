import dialogflow from 'dialogflow';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Initialize Dialogflow session client with the service account key
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: path.join(process.cwd(), 'dialogflow-key.json'), // Ensure this path is correct
  });

  const projectId = 'datasensesupportbot-voso'; // Replace with your Dialogflow project ID
  const sessionId = 'unique-session-id'; // Generate or use a unique session ID
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en', // Adjust language code if needed
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    res.status(200).json({ reply: result.fulfillmentText });
  } catch (error) {
    console.error('Dialogflow API error:', error);
    res.status(500).json({ error: 'Failed to fetch response from Dialogflow' });
  }
}
