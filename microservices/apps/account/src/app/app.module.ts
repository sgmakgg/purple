import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {RMQModule} from "nestjs-rmq";
import {getRMQConfig} from "./configs/rmq.config";

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: './envs/.account.env'}),
    RMQModule.forRootAsync(getRMQConfig()),
    AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/microservices')],
})
export class AppModule {}
