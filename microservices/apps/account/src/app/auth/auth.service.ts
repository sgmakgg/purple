import { Injectable } from '@nestjs/common';
import { RegisterDto } from './auth.controller';
import { UserRepository } from '../user/repositories/user.repository';
import { UserEntity } from '../user/entities/user.entity';
import { UserRole } from '@microservices/interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    ) {}

  async register({ email, password, displayName }: RegisterDto) {
    const oldUser = this.userRepository.findUser(email);
    if (oldUser) {
      throw new Error('User already exists');
    }

    const newUserEntity = await new UserEntity({
      displayName,
      email,
      role: UserRole.Student,
      passwordHash: '',
    })
    .setPassword(password);
    const  newUser = await this.userRepository.createUser(newUserEntity);
    return {email: newUser.email}
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findUser(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const userEntity = new UserEntity(user);
    const isValidPassword = await userEntity.validatePassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }
    return {id: user._id};
  }

  async login(id: string) {
    return {access_token: await this.jwtService.signAsync({id})};
  }
}
