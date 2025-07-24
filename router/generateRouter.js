import express from 'express';
import generateResponse from '../controller/generateController.js';

const app = express();



const router = express.Router();
app.post('/api/generate',generateResponse );


export default router