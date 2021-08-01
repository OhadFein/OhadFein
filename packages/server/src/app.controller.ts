import { MainInfoDto } from '@danskill/contract';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { User, UserDocument } from './users/schemas/user.schema';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AppService } from './app.service';
import { RequestUser } from './common/decorators/request-user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @UseInterceptors(new TransformInterceptor(MainInfoDto))
  async findOne(@RequestUser() reqUser: UserDocument): Promise<MainInfoDto> {
    return this.appService.getMainInfo(reqUser);
  }
}
