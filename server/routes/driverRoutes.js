import express from 'express';
import {
  loginDriver,
  getOrders,
  updateOrderStatus,
  registerDriver,
} from '../controllers/driverController.js';

const router = express.Router();

// Default route to check API status
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Driver API is working!' });
});

//Route to register a driver
router.post('/register',registerDriver);
// Route to log in a driver
router.post('/login', loginDriver);

// Route to get all orders for a driver
router.get('/orders', getOrders);

// Route to update the status of a specific order
router.put('/orders/:id', updateOrderStatus);

export default router;
