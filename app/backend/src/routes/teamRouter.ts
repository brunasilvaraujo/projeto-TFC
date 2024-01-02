import { Request, Router, Response } from 'express';
import TeamController from '../controller/TeamController';

const router = Router();

const teamController = new TeamController();

router.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));

export default router;
