import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  tech: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    required: true,
    enum: ['Completed', 'In Progress', 'Planning', 'On Hold']
  },
  link: {
    type: String,
    trim: true
  },
  hostedLink: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Project', projectSchema);
