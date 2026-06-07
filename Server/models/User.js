import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  image: String,
  points: Number,
  isAdmin: Boolean,
  membership_id: Number
});

const User = mongoose.model('User', userSchema);

export default User;
