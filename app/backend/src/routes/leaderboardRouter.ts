import { Request, Router, Response } from 'express';
import LeaderboardController from '../controller/LeaderboaderController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) =>
    leaderboardController.findAllLeaderboardHome(req, res),
);

export default router;
