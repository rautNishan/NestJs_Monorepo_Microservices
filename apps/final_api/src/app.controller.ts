import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('STUDENT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/student')
  async getStudent(): Promise<string> {
    try {
      console.log('This is Get Student');
      return await firstValueFrom(this.client.send({ cmd: 'getHello' }, ''));
    } catch (error) {
      // Handle error here
    }
  }
}
