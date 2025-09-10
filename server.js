require('dotenv').config(); // MUST be at the very top!

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Uses .env value
});


app.post('/generate-story', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a PG-13 cyberpunk detective narrator.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 200,
    });
    res.json({ text: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating story');
  }
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
