import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import { DecodedToken, Role } from '../Interfaces/users/IUser';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LoginModel from '../models/LoginModel';

export default class LoginService {
  private secret = process.env.JWT_SECRET || 'secret';

  constructor(
    private loginModel = new LoginModel(),
  ) { }

  public async login(email: string, password: string)
    : Promise<ServiceResponse<{ token: string }>> {
    const loginExit = await this.loginModel.findByEmail(email);

    if (!loginExit) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    if (!bcrypt.compareSync(password, loginExit.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const { password: _password, ...data } = loginExit;

    const token = jwt.sign({ data }, this.secret, jwtConfig);

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async findRole(token: DecodedToken): Promise<ServiceResponse<Role>> {
    console.log(token);
    const user = await this.loginModel.findByEmail(token.data.email);

    if (!user) return { status: 'NOT_FOUND', data: { message: 'Not found' } };

    return { status: 'SUCCESSFUL', data: { role: user?.role } };
  }
}
