import { Router } from 'express';
import teamRouter from './teamRouter';

const router = Router();

router.use('/teams', teamRouter);

export default router;
