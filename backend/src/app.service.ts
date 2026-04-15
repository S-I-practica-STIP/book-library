import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Server start complete. check thunder client in VS Code! Also frontend started check port 5173';
  }
}
