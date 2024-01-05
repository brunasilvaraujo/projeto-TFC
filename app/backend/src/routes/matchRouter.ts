import { Request, Router, Response } from 'express';
import MatchController from '../controller/MatchController';

const router = Router();

const matchController = new MatchController();

router.get('/', (req: Request, res: Response) => matchController.findAll(req, res));

export default router;
