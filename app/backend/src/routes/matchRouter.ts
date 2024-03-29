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

router.patch(
  '/:id',
  (req: Request, res: Response, next: NextFunction) =>
    TokenValidation.tokenValidateMatch(req, res, next),
  (req: Request, res: Response) =>
    matchController.updateMatchers(req, res),
);

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) =>
    TokenValidation.tokenValidateMatch(req, res, next),
  TokenValidation.validateNewMatchers,
  (req: Request, res: Response) =>
    matchController.createMatchers(req, res),
);

export default router;
