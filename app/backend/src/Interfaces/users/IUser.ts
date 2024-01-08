export interface ILogin {
  email: string,
  password: string,
}

export interface IUser extends ILogin {
  id: number,
  username: string,
  role: string,
}

export type IResponse = Omit<IUser, 'password'>;

export type Role = Pick<IUser, 'role'>;

export type DecodedToken = {
  data: IResponse;
};
