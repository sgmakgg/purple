import {IUser, UserRole} from "@microservices/interfaces";
import * as bcrypt from 'bcrypt';

export class UserEntity implements IUser{
  _id?: string;
  displayName: string;
  email: string;
  passwordHash: string;
  role: UserRole;

  constructor(data: IUser) {
    this._id = data._id;
    this.displayName = data.displayName;
    this.email = data.email;
    this.role = data.role;
    this.passwordHash = data.passwordHash;
  }

  public async setPassword(password: string){
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(password, salt);
    return this;
  }

  public  validatePassword(password: string){
    return bcrypt.compare(password, this.passwordHash);
  }
}
