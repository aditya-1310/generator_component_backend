// backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './router/generateRouter.js';



connectDB(); // Connect to MongoDB


const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors()); // Allows our React app to make requests to this server
app.use(express.json()); // Allows server to accept JSON in request bodies

dotenv.config(); // Load environment variables from .env file


// The single endpoint we need for now



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});