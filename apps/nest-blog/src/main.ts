import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
const cors = require('cors');
import { ResponseInterceptor } from './utils/response.interceotor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: 'http://localhost:9090', // 允许来自这个源的请求
      credentials: true, // 允许携带凭据的请求
    }),
  );
  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
  // 设置全局前缀
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  const port = 80;
  await app.listen(port, () => {
    console.log(`服务启动成功，端口:${port}`);
  });
}
bootstrap();
