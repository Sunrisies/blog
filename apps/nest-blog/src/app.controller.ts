import { Controller, Get,Post, Body, ValidationPipe, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './user/dto/register.dto';
import { LoginDto } from './user/dto/login.dto';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Post('/register')
  register(@Body(ValidationPipe) RegisterDto: RegisterDto) {
    return this.appService.register(RegisterDto);
  }

  @Post('/login')
  async queryUser(
    @Body(ValidationPipe) LoginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.appService.login(LoginDto, res);
  }
}
