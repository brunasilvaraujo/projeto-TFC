import * as jwt from 'jsonwebtoken';
import UsersModel from '../database/models/UsersModel';

const secretPass = process.env.JWT_SECRET || 'Grêmio';

const newToken = (userInfo: Omit<UsersModel, 'password'>): string => {
  const token = jwt.sign(userInfo, secretPass);
  return token;
};

export default newToken;
