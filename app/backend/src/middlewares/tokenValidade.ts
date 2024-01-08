import { Request, Response, NextFunction } from 'express';
import jwtLogin from '../utils/jwtLogin';

function newToken(authorization: string) {
  return authorization.split(' ')[1];
}

export default class TokenValidation {
  static async tokenValidate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const token = newToken(authorization);

    const validate = jwtLogin.verify(token);

    if (validate === 'Token must be a valid token') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  }
}
