const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  level: { type: String, enum: ['Easy', 'Medium', 'Tough'], required: true },
  subtopics: [
    {
      name: { type: String, required: true },
      description: { type: String },
      problems: [
        {
          problemName: { type: String, required: true },
          problemLink: { type: String },
          tutorialLink: { type: String },
          articleLink: { type: String },
          youtubeLink: { type: String },
          level: { type: String, enum: ['Easy', 'Medium', 'Tough'], required: true },
          completed: { type: Boolean, default: false } 
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Topic', topicSchema);