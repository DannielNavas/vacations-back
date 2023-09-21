import { Body, Controller, Ip, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSubscribeDto } from '../dtos/subscribe.dto';
import { SubscribeService } from '../service/subscribe.service';

@ApiTags('Subscribe')
@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @ApiOperation({ summary: 'Subscribe to the newsletter' })
  @Post()
  async subscribe(@Body() payload: CreateSubscribeDto, @Ip() ip: string) {
    await this.subscribeService.warmup(ip);
    const data = this.subscribeService.create(payload);
    return data;
  }
}
