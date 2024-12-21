import mongoose from 'mongoose';

const BlockageSchema = new mongoose.Schema({
  location: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.models.Blockage || mongoose.model('Blockage', BlockageSchema);