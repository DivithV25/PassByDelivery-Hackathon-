import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    pickupAddress: {
      type: String,
      required: [true, 'Pickup address is required'],
      trim: true,
    },
    deliveryAddress: {
      type: String,
      required: [true, 'Delivery address is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], // Status options
      default: 'Pending',
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver', // Reference to the Driver model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.model('Order', orderSchema);
