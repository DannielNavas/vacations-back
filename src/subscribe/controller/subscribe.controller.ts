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
  subscribe(@Body() payload: CreateSubscribeDto) {
    return this.subscribeService.create(payload);
  }
}
