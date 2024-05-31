import {
  Injectable,
  UseInterceptors,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ResponseInterceptor } from './utils/response.interceotor';
import { Users } from './user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Code,
  CustomRepositoryCannotInheritRepositoryError,
  Repository,
} from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RedisClientType } from 'redis';
import { RegisterDto } from './user/dto/register.dto';
@Injectable()
@UseInterceptors(ResponseInterceptor)
export class AppService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;
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
    const value = await this.redisClient.keys('*');
    const tokens = await this.redisClient.get('token');
    console.log(value, 'redis', tokens);
    console.log(data, 'data');
    const user = await this.usersRepository.findOne({
      where: {
        user_name: data.user_name,
      },
    });

    if (user) {
      if (user.pass_word === data.pass_word) {
        // const token = await this.jwtService.signAsync({
        //   user: {
        //     id: user.id,
        //     user_name: user.user_name,
        //   },
        // });
        const access_token = await this.jwtService.signAsync(
          {
            id: user.id,
            username: user.user_name,
          },
          {
            expiresIn: '30s',
          },
        );

        const refresh_token = await this.jwtService.signAsync(
          {
            id: user.id,
          },
          {
            expiresIn: '7d',
          },
        );
        console.log(access_token, 'user');

        res.cookie('refresh_token', refresh_token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });
        res.cookie('access_token', access_token, {
          maxAge: 1000 * 30,
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
  async refreshToken(request: any, res: any): Promise<any> {
    try {
      const data = this.jwtService.verify(request.cookies.refresh_token);
      const user = await this.usersRepository.findOne({
        where: {
          id: data.id,
        },
      });
      console.log(user, 'user');
      const access_token = this.jwtService.sign(
        {
          userId: user.id,
          username: user.user_name,
        },
        {
          expiresIn: '30s',
        },
      );

      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn: '7d',
        },
      );
      res.cookie('refresh_token', refresh_token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      res.cookie('access_token', access_token, {
        maxAge: 1000 * 30,
        httpOnly: true,
      });
      return {
        code: 200,
        message: '刷新成功',
      };
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
    // const decoded = await this.jwtService.decode(refresh_token);
  }
}
