import express from 'express';
import generateRouter from './generateRouter.js';
import userRouter from './userRouter.js';
import sessionRouter from './sessionRouter.js';

const router = express.Router();


router.use('/generate',generateRouter);
router.use('/user', userRouter);
router.use('/session',sessionRouter);



export default  router;