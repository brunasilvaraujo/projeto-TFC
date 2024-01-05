import { NextFunction, Request, Response } from 'express';

class LoginValidate {
  private regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(.[a-z]+)?$/i;

  email(e: string): boolean {
    return this.regexEmail.test(e);
  }

  public login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

    if (!this.email(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}

const validate = new LoginValidate();

export default validate;
