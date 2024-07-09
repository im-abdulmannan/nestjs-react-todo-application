import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constant';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Get()
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN))
  findAll(@Req() req: any) {
    console.log(req.user);
    return this.userService.findAll();
  }

  @ApiSecurity('JWT-auth')
  @Delete(':id')
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN))
  remove(@Param('id') id: string, @Req() req: any) {
    console.log(req.user);
    return this.userService.remove(+id);
  }
}
