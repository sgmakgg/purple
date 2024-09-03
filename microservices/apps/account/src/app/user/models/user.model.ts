import {IUser, UserRole} from "@microservices/interfaces";
import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class User extends Document implements IUser{

  @Prop()
  _id: string;

  @Prop()
  displayName?: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true})
  passwordHash: string;

  @Prop({required: true, enum:UserRole, type: String, default: UserRole.Student})
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
