import { NlpManager } from 'node-nlp';

// Create an instance of NlpManager
const manager = new NlpManager({ languages: ['en'] });

// Train the NLP model
const trainModel = async () => {
  // General Greetings
  manager.addDocument('en', 'hello', 'greeting');
  manager.addDocument('en', 'hi', 'greeting');
  manager.addDocument('en', 'hey', 'greeting');
  manager.addAnswer('en', 'greeting', 'Hello! How can I assist you today?');
  manager.addAnswer('en', 'greeting', 'Hi there! What can I do for you?');
  manager.addAnswer('en', 'greeting', 'Hey! How can I help you?');

  // How are you?
  manager.addDocument('en', 'how are you', 'how_are_you');
  manager.addAnswer('en', 'how_are_you', "I'm just a bot, but I'm doing great! How about you?");
  manager.addAnswer('en', 'how_are_you', "I'm doing fantastic! Let me know if I can help you.");

  // Jokes
  manager.addDocument('en', 'tell me a joke', 'joke');
  manager.addDocument('en', 'make me laugh', 'joke');
  manager.addAnswer('en', 'joke', 'Why did the computer go to art school? Because it wanted to learn how to draw a better interface!');
  manager.addAnswer('en', 'joke', 'Why don’t robots get tired? Because they recharge while they sleep!');
  manager.addAnswer('en', 'joke', 'Why did the sensor refuse to play hide and seek? Because good sensors never lose sight of anything!');
  manager.addAnswer('en', 'joke', 'Why DataSense? Because it made sense! 🤓');

  // Thank you responses
  manager.addDocument('en', 'thank you', 'thanks');
  manager.addDocument('en', 'thanks', 'thanks');
  manager.addAnswer('en', 'thanks', "You're welcome! Let me know if you need anything else.");
  manager.addAnswer('en', 'thanks', "No problem at all! I'm here to help.");

  // Farewell
  manager.addDocument('en', 'bye', 'farewell');
  manager.addDocument('en', 'goodbye', 'farewell');
  manager.addDocument('en', 'see you', 'farewell');
  manager.addAnswer('en', 'farewell', 'Goodbye! Have a great day!');
  manager.addAnswer('en', 'farewell', 'See you later! Take care.');

  // DataSense Questions
  manager.addDocument('en', 'what is DataSense', 'datasense.what');
  manager.addDocument('en', 'tell me about DataSense', 'datasense.what');
  manager.addAnswer('en', 'datasense.what', 'DataSense is a centralized system for managing and monitoring sensor data in real-time.');

  manager.addDocument('en', 'what are the features of DataSense', 'datasense.features');
  manager.addDocument('en', 'what can DataSense do', 'datasense.features');
  manager.addAnswer('en', 'datasense.features', 'Key features include real-time monitoring, graphical data visualization, and threshold-based alerts.');

  manager.addDocument('en', 'who can use DataSense', 'datasense.audience');
  manager.addDocument('en', 'who benefits from DataSense', 'datasense.audience');
  manager.addAnswer('en', 'datasense.audience', 'DataSense is designed for home gardeners, pet owners, researchers, agriculturists, warehouse managers, and homeowners.');

  manager.addDocument('en', 'how does DataSense handle alerts', 'datasense.alerts');
  manager.addDocument('en', 'does DataSense send notifications', 'datasense.alerts');
  manager.addAnswer('en', 'datasense.alerts', 'DataSense sends notifications whenever a threshold set for temperature, humidity, or soil moisture is breached.');

  manager.addDocument('en', 'can I add multiple devices in DataSense', 'datasense.devices');
  manager.addDocument('en', 'how to add devices in DataSense', 'datasense.devices');
  manager.addAnswer('en', 'datasense.devices', 'Yes, you can add and manage multiple devices in DataSense via its user-friendly dashboard.');

  manager.addDocument('en', 'does DataSense have graphs', 'datasense.graphs');
  manager.addDocument('en', 'can I visualize data in DataSense', 'datasense.graphs');
  manager.addAnswer('en', 'datasense.graphs', 'DataSense offers interactive charts such as line, bar, and pie graphs to visualize your sensor data.');

  manager.addDocument('en', 'can I customize DataSense settings', 'datasense.customization');
  manager.addAnswer('en', 'datasense.customization', 'DataSense allows users to customize alert thresholds, device settings, and the types of data visualizations displayed on the dashboard.');

  manager.addDocument('en', 'is DataSense useful for agriculture', 'datasense.agriculture');
  manager.addAnswer('en', 'datasense.agriculture', 'Absolutely! DataSense is beneficial for agriculturists to monitor environmental conditions efficiently.');

  manager.addDocument('en', 'does DataSense work for warehouses', 'datasense.warehouses');
  manager.addAnswer('en', 'datasense.warehouses', 'Yes, DataSense helps warehouse managers track environmental data like temperature and humidity in real-time.');

  await manager.train();
  manager.save();
};

// Train the model on server startup
trainModel();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    try {
      const response = await manager.process('en', message);
      res.status(200).json({ reply: response.answer || "I didn't understand that. Can you rephrase?" });
    } catch (error) {
      console.error('Error processing NLP:', error);
      res.status(500).json({ error: 'Something went wrong with the NLP processing.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
