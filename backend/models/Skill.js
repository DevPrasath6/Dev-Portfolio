import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required']
  },
  level: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'other'],
    default: 'other'
  },
  icon: {
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

export default mongoose.model('Skill', skillSchema);
