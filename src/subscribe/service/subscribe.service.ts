import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resend } from 'resend';
import config from '../../config';
import { CreateSubscribeDto } from '../dtos/subscribe.dto';
import { Subscribe } from '../entities/subscribe.entitie';

@Injectable()
export class SubscribeService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectModel(Subscribe.name)
    private readonly subscribeModel: Model<Subscribe>,
  ) {}

  async sendMail(email: string) {
    const resend = new Resend(this.configService.resendApiKey);
    return await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
    });
  }

  async create(payload: CreateSubscribeDto) {
    const email = await this.subscribeModel.findOne({ email: payload.email });
    if (email) {
      throw new NotFoundException(`Email ${payload.email} already exists`);
    }
    const newSubscribe = new this.subscribeModel(payload);
    return newSubscribe.save();
  }
}
