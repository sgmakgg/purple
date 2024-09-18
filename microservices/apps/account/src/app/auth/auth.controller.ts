import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AccountLoginCommand, AccountRegisterCommand} from "@microservices/contracts";
import {RMQRoute} from "nestjs-rmq";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @RMQRoute(AccountRegisterCommand.topic)
  async register(@Body() dto: AccountRegisterCommand.Request): Promise<AccountRegisterCommand.Response> {
    return this.authService.register(dto);
  }

  @RMQRoute(AccountLoginCommand.topic)
  async login(@Body() { email, password }: AccountLoginCommand.Request): Promise<AccountLoginCommand.Response> {
    const { id } = await this.authService.validateUser(email, password);
    return this.authService.login(id);
  }
}

