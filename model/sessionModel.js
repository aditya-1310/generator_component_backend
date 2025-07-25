import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  /**
   * A direct reference to the User document that owns this session.
   * This links the session to its creator.
   */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  /**
   * A user-editable name for the session workspace.
   */
  sessionName: {
    type: String,
    default: 'Untitled Session',
    trim: true,
  },

  /**
   * An array that stores the entire conversation history for this session.
   * `role` can be either 'user' or 'ai'.
   */
  chatHistory: [
    {
      role: {
        type: String,
        enum: ['user', 'ai'],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    }
  ],

  /**
   * An array of component objects. Each object represents a distinct,
   * generated piece of code within this session.
   */
  components: [
    {
      componentName: {
        type: String,
        required: true,
        default: 'Untitled Component'
      },
      jsx: {
        type: String,
        default: '<div>Empty Component</div>'
      },
      css: {
        type: String,
        default: ''
      }
    }
  ]
}, { 
  /**
   * Automatically adds `createdAt` and `updatedAt` (last modified) fields.
   */
  timestamps: true 
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
