import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LoginModel from '../models/LoginModel';
import { IUser, Role } from '../Interfaces/users/IUser';

export default class LoginService {
  private secret = process.env.JWT_SECRET || 'secret';

  constructor(
    private loginModel = new LoginModel(),
  ) { }

  public async login(email: string, password: string)
    : Promise<ServiceResponse<{ token: string }>> {
    const userExist = await this.loginModel.findByEmail(email);

    if (!userExist) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    if (!bcrypt.compareSync(password, userExist.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const { email: _email, password: _password, ...data } = userExist;

    const token = jwt.sign({ data }, this.secret, jwtConfig);

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async findRole(email: IUser['email']): Promise<ServiceResponse<Role>> {
    const user = await this.loginModel.findByEmail(email);

    const { role } = user as IUser;

    return { status: 'SUCCESSFUL', data: { role } };
  }
}
