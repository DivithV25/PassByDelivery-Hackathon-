import Driver from '../models/driverModel.js';
import Order from '../models/orderModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Use bcrypt for password hashing and comparison

// @desc    Log in driver
// @route   POST /api/driver/login
// @access  Public
export const loginDriver = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find driver by email
    const driver = await Driver.findOne({ email });
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, driver.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: driver._id, email: driver.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// @desc    Get all drivers
// @route   GET /api/driver
// @access  Public
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch drivers', error: error.message });
  }
};

// @desc    Create a new driver
// @route   POST /api/driver
// @access  Public
export const createDriver = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDriver = await Driver.create({ name, email, phone, password: hashedPassword });
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create driver', error: error.message });
  }
};

// @desc    Get a single driver by ID
// @route   GET /api/driver/:id
// @access  Public
export const getDriverById = async (req, res) => {
  const { id } = req.params;

  try {
    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID format or driver not found', error: error.message });
  }
};

// @desc    Update a driver
// @route   PUT /api/driver/:id
// @access  Public
export const updateDriver = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password } = req.body;

  try {
    const updates = { name, email, phone };
    if (password) {
      updates.password = await bcrypt.hash(password, 10); // Hash the new password if provided
    }

    const updatedDriver = await Driver.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update driver', error: error.message });
  }
};

// @desc    Delete a driver
// @route   DELETE /api/driver/:id
// @access  Public
export const deleteDriver = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDriver = await Driver.findByIdAndDelete(id);

    if (!deletedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete driver', error: error.message });
  }
};

// @desc    Get orders for a specific driver
// @route   GET /api/driver/orders
// @access  Private
export const getOrders = async (req, res) => {
  const driverId = req.user?.id; // Assuming driver ID is stored in the authenticated user object

  try {
    const orders = await Order.find({ driver: driverId }); // Query orders assigned to the driver
    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this driver.' });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders.', error: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/driver/orders/:id
// @access  Private
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update order status', error: error.message });
  }
};

// @desc    Register a new driver
// @route   POST /api/driver/register
// @access  Public
export const registerDriver = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) {
      return res.status(400).json({ message: 'Driver already exists' });
    }

    const driver = await Driver.create({
      name,
      email,
      phone,
      password,
    });

    res.status(201).json({
      _id: driver._id,
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register driver', error: error.message });
  }
};
