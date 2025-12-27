import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  role: {
    type: String,
    required: [true, 'Role is required']
  },
  company: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: [true, 'Testimonial content is required']
  },
  image: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  featured: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Testimonial', testimonialSchema);
