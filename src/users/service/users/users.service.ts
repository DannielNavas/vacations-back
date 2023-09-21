import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import config from 'src/config';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/entities/user.entitie';

@Injectable()
export class UsersService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  createUser(payload: CreateUserDto) {
    const newUser = new this.userModel(payload);
    return newUser.save();
  }

  async findOne(payload: CreateUserDto) {
    const user = await this.userModel.findById(payload);
    if (!user) {
      throw new NotFoundException(`User #${payload.displayName} not found`);
    }
    return user;
  }
}
