import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  /**
   * The user's email address. Used for login.
   * It is required, must be unique, and is stored in lowercase.
   */
  username:{
        type: String,
        required: true,
        unique:true,
        minLength:5
    },

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

userSchema.pre('save',function modifyPassword(next){// it is recommended to user normal fn in this call back bacause this keyword will behave diffrently in case of arrow function
    // incoming user object
    const user = this;

    const SALT = bcrypt.genSaltSync(9);// salt in here is like it is going to hash 9 times which will make stroger


    // hash the password
    const hasshedPassword = bcrypt.hashSync(user.password,SALT);
    // now replace the original password 

    user.password = hasshedPassword;

    next();

    
})

const User = mongoose.model('User', userSchema);

export default User;