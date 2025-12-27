import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: [true, 'Degree is required']
  },
  institution: {
    type: String,
    required: [true, 'Institution is required']
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
  gpa: {
    type: String,
    default: ''
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

export default mongoose.model('Education', educationSchema);
