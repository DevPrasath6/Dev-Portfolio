import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Your Name'
  },
  title: {
    type: String,
    required: true,
    default: 'Full Stack Developer'
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: ''
  },
  resumeUrl: {
    type: String,
    default: ''
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Hero', heroSchema);
