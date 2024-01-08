import { JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken';

export default class jwtLogin {
  private static secret: Secret = process.env.JWT_SECRET || 'secret';
  private static jwtConfig: SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  static sign(payload: JwtPayload): string {
    return sign({ ...payload }, this.secret, this.jwtConfig);
  }

  static verify(token: string): JwtPayload | string {
    try {
      return verify(token, this.secret) as JwtPayload;
    } catch (error) {
      return 'Token must be a valid token';
    }
  }
}
