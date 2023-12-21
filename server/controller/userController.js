const User = require('../config/userModel');
const generateToken = require('../config/generateToken');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send('Enter all the details');
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id, newUser.name, newUser.email),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('hii', email, password);
  const user = await User.findOne({ email });
  if (!user) {
    res.status(500).json({ message: 'user not found' });
  }
  if (user && user.matchPassword(password)) {
    res.status(201).json({
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }
  res.status(500);
};

module.exports = { registerUser, loginUser };
