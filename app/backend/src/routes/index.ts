import { Router } from 'express';
import teamRouter from './teamRouter';
import matchRouter from './matchRouter';
import loginRouter from './loginRouter';
import leaderboardRouter from './leaderboardRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
