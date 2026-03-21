import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
  // Hero Section Stats
  heroYearsExperience: {
    type: String,
    default: '2+'
  },
  heroProjectsDelivered: {
    type: String,
    default: '10'
  },
  heroHappyClients: {
    type: String,
    default: '7'
  },

  // CV Section Stats
  cvYearsExperience: {
    type: String,
    default: '7+'
  },
  cvProjects: {
    type: String,
    default: '100+'
  },
  cvCertifications: {
    type: String,
    default: '15+'
  },
  cvClients: {
    type: String,
    default: '50+'
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Stats', statsSchema);
