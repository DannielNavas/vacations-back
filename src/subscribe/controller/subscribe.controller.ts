import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSubscribeDto } from '../dtos/subscribe.dto';
import { SubscribeService } from '../service/subscribe.service';

@ApiTags('Subscribe')
@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @ApiOperation({ summary: 'Subscribe to the newsletter' })
  @Post()
  async subscribe(@Body() payload: CreateSubscribeDto) {
    const data = this.subscribeService.create(payload);
    const email = this.subscribeService.sendMail(payload.email);
    console.log(email);
    return data;
  }
}
