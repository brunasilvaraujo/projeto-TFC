import { Request, Router, Response, NextFunction } from 'express';
import MatchController from '../controller/MatchController';
import TokenValidation from '../middlewares/tokenValidade';

const router = Router();

const matchController = new MatchController();

router.get('/', (req: Request, res: Response) => matchController.findAllMatchers(req, res));

router.patch(
  '/:id/finish',
  (req: Request, res: Response, next: NextFunction) =>
    TokenValidation.tokenValidate(req, res, next),
  (req: Request, res: Response) =>
    matchController.finishedMatchers(req, res),
);

export default router;
