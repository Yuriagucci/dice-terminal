import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const User = mongoose.model('User', usersSchema); //mongoose will convert it to users
export default User;