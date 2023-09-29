import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/service/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get user users' })
  @Post('create')
  async getOneUser(@Body() payload: CreateUserDto) {
    const result = await this.usersService.createUser(payload);
    return result;
  }
}
