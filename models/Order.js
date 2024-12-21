import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  pickupLocation: String,
  dropLocation: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
