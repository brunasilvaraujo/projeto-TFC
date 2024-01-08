import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStausHTTP';
import LoginService from '../service/LoginService';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const { status, data } = await this.loginService.login(email, password);

    if (status === 'UNAUTHORIZED') {
      return res.status(401).json(data);
    }
    return res.status(200).json(data);
  }

  public async loginRole(req: Request, res: Response) {
    const { email } = req.body;

    const { status, data } = await this.loginService.findRole(email);

    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }
}
