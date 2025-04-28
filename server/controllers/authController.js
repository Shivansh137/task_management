import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for empty inputs
    if (!email || !password) return res.status(409).json({ message: "All fields are required" });

    // check if email already registered
    const duplicate = await User.findOne({ email }).lean().exec();
    if (duplicate) return res.status(409).json({ message: "Email already exists" });

    // hash the password before storing in the database
    const hashed_password = await bcrypt.hash(password, 10);

    // create a new user and save it in the database
    const user = new User();
    user.email = email;
    user.password = hashed_password;
    await user.save();

    // generate jwt tokens
    const accessToken = jwt.sign({ id: user._id, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
    const refreshToken = jwt.sign({ id: user._id, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    // send jwt tokens to the client
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
    res.status(201).json({ accessToken });
  }
  catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for empty inputs
    if (!email || !password) return res.status(409).json({ message: 'All fields are required' });

    // check if the email exists
    const user = await User.findOne({ email }).lean().exec();
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid credentials" });

    // Generate Access Tokens
    console.log(user);

    const accessToken = jwt.sign({ id: user._id, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
    const refreshToken = jwt.sign({ id: user._id, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    // Send Access Tokens
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
    res.json({ accessToken });
  }
  catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const refresh = async (req, res) => {
  const cookies = req.cookies;

  // check if cookie "jwt" exists in req.cookies
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  // verify the jwt refresh token stored in cookie
  jwt.verify(cookies.jwt, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    // check if user with the email decoded from token exists 
    const user = await User.findOne({ email: decoded.email }).exec();
    // clear cookie if user not found
    if (!user) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
      return res.status(500).json({ message: "Internal server error" });
    }
    // generate a new access token and send
    const accessToken = jwt.sign({ id: user._id, email: decoded.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
    res.json({ accessToken });
  })
};

export const logout = async (req, res) => {
  const cookies = req.cookies;

  // check if "jwt" cookie is present
  if (!cookies?.jwt) return res.status(203).json({ message: "Cookie not found" });

  // clear the cookie
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
  res.status(200).json({ message: 'Logged Out' })
};