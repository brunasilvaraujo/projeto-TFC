import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UsersModel from '../database/models/UsersModel';

export default class LoginModel implements IUserModel {
  private model = UsersModel;

  public async findByEmail(email: string): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    return dbData;
  }
}
