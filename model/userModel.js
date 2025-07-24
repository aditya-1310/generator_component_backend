const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  /**
   * The user's email address. Used for login.
   * It is required, must be unique, and is stored in lowercase.
   */
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  /**
   * The user's securely hashed password.
   * Never store plain-text passwords.
   */
  password: {
    type: String,
    required: true,
  },
}, { 
  /**
   * Automatically adds `createdAt` and `updatedAt` fields.
   */
  timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;