import express from 'express';
import generateResponse from '../controller/generateController.js';

const app = express();



const router = express.Router();
router.post('/',generateResponse);


export default router