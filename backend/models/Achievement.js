import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Achievement title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  date: {
    type: String,
    required: [true, 'Date is required']
  },
  type: {
    type: String,
    enum: ['award', 'recognition', 'publication', 'other'],
    default: 'other'
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

export default mongoose.model('Achievement', achievementSchema);
