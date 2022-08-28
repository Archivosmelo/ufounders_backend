import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { LoginUserDto, CreateUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt.payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService

  ) { }

  async create(createUserDto: CreateUserDto) {

    try {

      const { password } = createUserDto

      const user = await this.userRepository.create({
        ...createUserDto,
        password: bcrypt.hashSync(password, 10)
      })

      await this.userRepository.save(user)
      delete user.password

      return {
        user,
        token: this.getJwtToken({ id: user.id })
      }

    } catch (error) {

      this.handleDBErrors(error)

    }
  }

  async login(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true }
    })

    if (!user) {
      throw new UnauthorizedException("Credentials not valid")
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException("Credentials not valid")
    }

    delete user._id // not necessary for localstorage
    delete user.password // not necessary for localstorage
    delete user.roles // not necessary for localstorage

    return {
      user,
      token: this.getJwtToken({ id: user.id })
    }

  }

  private getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload)
    return token;

  }

  private handleDBErrors(error: any): never {
    if (error.code === 11000) {
      throw new BadRequestException("Email already exists")
    }
    throw new InternalServerErrorException("Server error, please contact support.")
  }

}
