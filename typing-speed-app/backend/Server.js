const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); 

mongoose.connect('mongodb://localhost:27017/typingApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    await initializeCounters();
  })
  .catch(err => console.log('Error connecting to MongoDB:', err));

const paragraphSchema = new mongoose.Schema({
  text: String,
  difficulty: String
});

const Paragraph = mongoose.model('Paragraph', paragraphSchema);

const counterSchema = new mongoose.Schema({
  difficulty: { type: String, unique: true },
  currentIndex: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

const initializeCounters = async () => {
  const difficulties = ['easy', 'medium', 'hard'];
  for (const difficulty of difficulties) {
    const existingCounter = await Counter.findOne({ difficulty });
    if (!existingCounter) {
      await Counter.create({ difficulty });
    }
  }
};

app.get('/paragraphs/all', async (req, res) => {
  try {
    const paragraphs = await Paragraph.find({});
    res.json(paragraphs);
  } catch (error) {
    console.error('Error fetching all paragraphs:', error);
    res.status(500).json({ message: 'Failed to fetch paragraphs' });
  }
});

app.get('/paragraphs', async (req, res) => {
  const { difficulty } = req.query;
  try {
    if (!difficulty) {
      return res.status(400).json({ message: 'Difficulty level is required' });
    }

    const counter = await Counter.findOne({ difficulty });
    if (!counter) {
      return res.status(404).json({ message: 'Counter not found for this difficulty level' });
    }

    const paragraphs = await Paragraph.find({ difficulty });
    if (paragraphs.length === 0) {
      return res.status(404).json({ message: 'No paragraphs found for this difficulty level' });
    }

    const paragraph = paragraphs[counter.currentIndex];
    console.log(`Fetching paragraph for difficulty: ${difficulty}`);
    console.log(`Current Index: ${counter.currentIndex}`);
    console.log(`Fetched Paragraph: ${paragraph.text}`);

    res.json([paragraph]); 

    counter.currentIndex = (counter.currentIndex + 1) % paragraphs.length;
    await counter.save();

    console.log(`Updated Index for difficulty ${difficulty}: ${counter.currentIndex}`);
  } catch (error) {
    console.error('Error fetching paragraphs:', error);
    res.status(500).json({ message: error.message }); 
  }
});

app.post('/paragraphs', async (req, res) => {
  const { text, difficulty } = req.body;
  try {
    const newParagraph = new Paragraph({ text, difficulty });
    await newParagraph.save();
    res.status(201).json(newParagraph); 
  } catch (error) {
    console.error('Error adding paragraph:', error);
    res.status(500).json({ message: error.message }); 
  }
});

app.put('/paragraphs/:id', async (req, res) => {
  const { id } = req.params;
  const { text, difficulty } = req.body;
  try {
    const updatedParagraph = await Paragraph.findByIdAndUpdate(id, { text, difficulty }, { new: true });
    if (!updatedParagraph) {
      return res.status(404).json({ message: 'Paragraph not found' });
    }
    res.json(updatedParagraph);
  } catch (error) {
    console.error('Error updating paragraph:', error);
    res.status(500).json({ message: error.message });
  }
});

app.delete('/paragraphs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedParagraph = await Paragraph.findByIdAndDelete(id);
    if (!deletedParagraph) {
      return res.status(404).json({ message: 'Paragraph not found' });
    }
    res.json({ message: 'Paragraph deleted successfully' });
  } catch (error) {
    console.error('Error deleting paragraph:', error);
    res.status(500).json({ message: error.message }); 
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
