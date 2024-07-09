import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('auth')
@ApiTags('Authentications')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req: AuthenticatedRequest, @Body() loginDto: LoginDto) {
    const user: User = req.user;
    const payload = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    return { token: this.jwtService.sign(payload) };
  }
}
