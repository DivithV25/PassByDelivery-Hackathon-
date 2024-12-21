import Driver from '../models/driverModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Utility function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Login Driver Function
const loginDriver = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the driver by email
    const driver = await Driver.findOne({ email });
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Verify the password
    const isPasswordMatch = await bcrypt.compare(password, driver.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a token
    const token = generateToken(driver._id);

    // Send response with driver data and token
    res.status(200).json({
      id: driver._id,
      name: driver.name,
      email: driver.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

export default loginDriver;
