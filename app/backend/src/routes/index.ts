import { Router } from 'express';
import teamRouter from './teamRouter';
import matchRouter from './matchRouter';
import loginRouter from './loginRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);

export default router;
