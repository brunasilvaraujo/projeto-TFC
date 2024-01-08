import { Request, Router, Response, NextFunction } from 'express';
import LoginController from '../controller/LoginController';
import validate from '../middlewares/loginValidation';
import LoginService from '../service/LoginService';
import LoginModel from '../models/LoginModel';
import TokenValidation from '../middlewares/tokenValidade';

const router = Router();

const loginController = new LoginController(new LoginService(new LoginModel()));

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) =>
    validate.login(req, res, next),
  (req: Request, res: Response) => loginController.login(req, res),
);

router.get(
  '/role',
  (req: Request, res: Response, next: NextFunction) =>
    TokenValidation.tokenValidate(req, res, next),
  (req: Request, res: Response) =>
    loginController.loginRole(req, res),
);

export default router;
