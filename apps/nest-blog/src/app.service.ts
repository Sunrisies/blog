import { Injectable,UseInterceptors  } from '@nestjs/common';
import { ResponseInterceptor } from './utils/response.interceotor';

@Injectable()
@UseInterceptors(ResponseInterceptor)
export class AppService {
  getHello(): any {
    return {
      msg: 'Hello World!',
      data:null
    };
  }
}
