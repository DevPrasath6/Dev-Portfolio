import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required']
  },
  company: {
    type: String,
    required: [true, 'Company name is required']
  },
  location: {
    type: String,
    default: ''
  },
  period: {
    type: String,
    required: [true, 'Period is required']
  },
  description: {
    type: String,
    default: ''
  },
  responsibilities: [{
    type: String
  }],
  current: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Experience', experienceSchema);
