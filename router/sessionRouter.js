import express from 'express';
import { createSessionController, getAllSessionController, getSessionByIdController } from '../controller/sessionController.js';

const router = express.Router();

router.post('/create',createSessionController);
router.get('/allSession',getAllSessionController);
router.get('/:id', getSessionByIdController);


export default router;