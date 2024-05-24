import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ResponseInterceptor } from './utils/response.interceotor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
  // 设置全局前缀
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.setGlobalPrefix('api');
  const port = 80;
  await app.listen(port, () => {
    console.log(`服务启动成功，端口:${port}`);
  });
}
bootstrap();
