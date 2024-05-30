import { Injectable, UseInterceptors,Inject } from '@nestjs/common';
import { ResponseInterceptor } from './utils/response.interceotor';
import { Users } from './user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './user/dto/register.dto';
@Injectable()
@UseInterceptors(ResponseInterceptor)
export class AppService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}
  getHello(): any {
    return {
      message: 'Hello World!',
      data: null,
    };
  }

  async register(data: RegisterDto): Promise<any> {
    // 查询是否存在该用户
    const user = await this.usersRepository.findOne({
      where: {
        user_name: data.user_name,
      },
    });
    if (user) {
      return {
        message: '当前用户已注册',
        data: null,
      };
    }
    console.log(data, 'data');
    const newUser = await this.usersRepository.create(data);
    const result = await this.usersRepository.save(newUser);
    console.log(result, 'result');
    return {
      message: '注册成功',
      data: data,
    };
  }

  async login(data: any, res: any): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: {
        user_name: data.user_name,
      },
    });
    console.log(user, 'user');
    if (user) {
      if (user.pass_word === data.pass_word) {
        const token = await this.jwtService.signAsync({
          user: {
            id: user.id,
            user_name: user.user_name,
          },
        });
        res.cookie('user_id', user.id, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });
        res.cookie('user_name', user.user_name, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });
        res.cookie('token', token, {
          maxAge:  7,
          httpOnly: true,
        });
        return {
          code: 200,
          message: '登录成功',
          data: user,
        };
      } else {
        return {
          code: 401,
          message: '密码错误',
        };
      }
    }
    return {
      code: 200,
      message: '用户不存在',
    };
    // console.log(data, 'data', res,'res');
    // return {
    //   message: '登录成功',
    //   data: data,
    // };
  }
}
