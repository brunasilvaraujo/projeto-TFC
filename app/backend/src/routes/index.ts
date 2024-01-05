import { Router } from 'express';
import teamRouter from './teamRouter';
import matchRouter from './matchRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use('/matches', matchRouter);

export default router;
