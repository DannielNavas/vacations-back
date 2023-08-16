import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as client from '@sendgrid/client';
import { ClientRequest } from '@sendgrid/client/src/request';
import * as SendGrid from '@sendgrid/mail';
import { Model } from 'mongoose';
import config from '../../config';
import { CreateSubscribeDto } from '../dtos/subscribe.dto';
import { Subscribe } from '../entities/subscribe.entitie';

@Injectable()
export class SubscribeService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectModel(Subscribe.name)
    private readonly subscribeModel: Model<Subscribe>,
  ) {
    SendGrid.setApiKey(this.configService.sendgridApiKey);
  }

  async warmup(ip: string) {
    const data = {
      ip,
    };

    const request: ClientRequest = {
      url: `/v3/ips/warmup`,
      method: 'POST',
      body: data,
    };

    client
      .request(request)
      .then(([response, body]) => {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(body);
      })
      .catch((error) => {
        console.error(error);
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

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    // avoid this on production. use log instead :)
    console.log(`E-Mail sent to ${mail.to}`);
    return transport;
  }
}
