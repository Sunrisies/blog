import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Article } from './article/entities/article.entity';
import { ArticleModule } from './article/article.module';

const entities = [User, Article] || __dirname + '/**/**.entity{.ts}';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      // host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      entities: [...entities],
      synchronize: true,
    }),
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
