import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LoginModel from '../models/LoginModel';

export default class LoginService {
  private secret = process.env.JWT_SECRET || 'Flamengo';

  constructor(
    private loginModel = new LoginModel(),
  ) { }

  public async login(email: string, password: string)
    : Promise<ServiceResponse<{ token: string }>> {
    const newLogin = await this.loginModel.findByEmail(email);

    if (!newLogin) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    if (!bcrypt.compareSync(password, newLogin.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const { email: e, password: p, ...data } = newLogin;

    const token = jwt.sign({ data }, this.secret, jwtConfig);

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
