import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { Users } from './user/entities/user.entity';
import { Article } from './article/entities/article.entity';
import { ArticleModule } from './article/article.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { createClient } from 'redis';
import { LoginGuard } from './login.guard';
import { UnauthorizedExceptionFilter } from './utils/unauthorized-exception.filter';
import configuration from './configuration';
const entities = [Users, Article];
interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

// nest_blog
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration], //加载配置文件

      // 校验的是yaml格式的配置文件
      validationSchema: Joi.object({
        //   http: Joi.object({
        //     port: Joi.number().default(3000).required(),
        //   }).required(),
        db: Joi.object({
          // host: Joi.string(),
          // port: Joi.string().default('3306'),
          username: Joi.string().required(),
          // password: Joi.string().required(),
          // database: Joi.string().required(),
        }),
        //   // DATABASE_HOST: Joi.string().required(),
        //   // DATABASE_PORT: Joi.number().required(),
        //   // DATABASE_USERNAME: Joi.string().required(),
        //   // DATABASE_PASSWORD: Joi.string().required(),
        //   // DATABASE_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log(configService.get<DatabaseConfig>('db'), 'myql');
        return {
          type: 'mysql',
          host: configService.get<DatabaseConfig>('db').host,
          port: configService.get<DatabaseConfig>('db').port,
          username: configService.get<DatabaseConfig>('db').username,
          password: configService.get<DatabaseConfig>('db').password,
          database: configService.get<DatabaseConfig>('db').database,
          entities: [...entities],
          synchronize: true,
        };
      },
      //    ({
      //   type: 'mysql',
      //   host: configService.get<DatabaseConfig>('db').host,
      //   port: configService.get<DatabaseConfig>('db').port,
      //   username: configService.get<DatabaseConfig>('db').username,
      //   password: configService.get<DatabaseConfig>('db').password,
      //   database: configService.get<DatabaseConfig>('db').database,
      //   entities: [...entities],
      //   synchronize: true,
      // }),
    }),
    JwtModule.register({
      global: true,
      secret: 'guang',
      signOptions: { expiresIn: '30m' },
    }),
    UserModule,
    ArticleModule,
    TypeOrmModule.forFeature([Users]),
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'redis',
            // host:'localhost',
            port: 6379,
          },
        });
        await client.connect();
        return client;
      },
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
