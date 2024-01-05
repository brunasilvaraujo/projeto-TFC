import { Request, Router, Response, NextFunction } from 'express';
import LoginController from '../controller/LoginController';
import validate from '../middlewares/loginValidation';
import LoginService from '../service/LoginService';
import LoginModel from '../models/LoginModel';

const router = Router();

const loginController = new LoginController(new LoginService(new LoginModel()));

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) =>
    validate.login(req, res, next),
  (req: Request, res: Response) => loginController.login(req, res),
);

export default router;
