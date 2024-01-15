import { Request, Response, NextFunction } from 'express';
import jwtLogin from '../utils/jwtLogin';

function newToken(authorization: string) {
  return authorization.split(' ')[1];
}

const validToken = 'Token must be a valid token';

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

    if (validate === validToken) {
      return res.status(401).json({ message: validToken });
    }

    req.body = { token: validate };

    next();
  }

  static async tokenValidateMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const token = newToken(authorization);

    const validate = jwtLogin.verify(token);

    if (validate === validToken) {
      return res.status(401).json({ message: validToken });
    }

    next();
  }

  static async validateNewMatchers(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const matchers = req.body;

    if (!matchers.homeTeamId || !matchers.awayTeamId) {
      return res.status(404).json({
        message: 'There is no team with such id!',
      });
    }

    if (matchers.homeTeamId === matchers.awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    next();
  }
}
