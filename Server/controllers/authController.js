import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    if (!SECRET_KEY) {
      console.error('SECRET_KEY environment variable is not set');
      process.exit(1);
    }

    if (user.isAdmin) {
      const adminToken = jwt.sign({ username: user.name, isAdmin: true }, SECRET_KEY, { expiresIn: '1h' });
      res.cookie('token', adminToken, { httpOnly: true, secure: true, sameSite: 'strict' });
      res.status(200).json({ message: "Admin Login successful", token: adminToken, username: user.name, points: user.points, isAdmin: true });
    } else {
      const token = jwt.sign({ username: user.name }, SECRET_KEY, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
      res.status(200).json({ message: "Login successful", token, username: user.name, email: user.email, points: user.points, Login: true });
    }
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const file = req.files && req.files.file;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    let imageUrl = "/images/default-profile.png";

    if (file) {
      const options = {
        folder: "profile_images",
        quality: 90,
        resource_type: "auto",
      };
      const response = await cloudinary.uploader.upload(file.tempFilePath, options);
      imageUrl = response.secure_url;
    }

    const isAdminUser = name === 'admin';

    const newUser = new User({
      name,
      email,
      password,
      image: imageUrl,
      points: 100,
      isAdmin: isAdminUser ? true : false,
      membership_id: 0,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error during registration', error);
    res.status(500).json({ error: "Internal server error" });
  }
};
