import {IUser, UserRole} from "@microservices/interfaces";
import {compare, genSalt, hash} from "bcryptjs";

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
  }

  public async setPassword(password: string){
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public  validatePassword(password: string){
    return compare(password, this.passwordHash);
  }
}
