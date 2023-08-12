import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSubscribeDto } from '../dtos/subscribe.dto';
import { SubscribeService } from '../service/subscribe.service';
import { ETextEmail } from '../service/text.email';

@ApiTags('Subscribe')
@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @ApiOperation({ summary: 'Subscribe to the newsletter' })
  @Post()
  async subscribe(@Body() payload: CreateSubscribeDto) {
    const data = this.subscribeService.create(payload);
    const msg = {
      to: payload.email, // Change to your recipient
      from: 'admin@danniel.dev', // Change to your verified sender
      subject: ETextEmail.subject,
      text: ETextEmail.body,
    };
    const email = await this.subscribeService.send(msg);
    console.log(email);
    return data;
  }
}
