// backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import apiRouter from './router/apirouter.js';





dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors()); // Allows our React app to make requests to this server
app.use(express.json()); // Allows server to accept JSON in request bodies




// The single endpoint we need for now

app.get('/ping', (req,res)=>{
    return res.json({message: "pong"});
})

app.use('/api', apiRouter);





app.listen(PORT, () => {
    connectDB(); // Connect to MongoDB
    console.log(`Server is running on http://localhost:${PORT}`);
});