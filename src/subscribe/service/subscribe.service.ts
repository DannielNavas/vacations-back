import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubscribeDto } from '../dtos/subscribe.dto';
import { Subscribe } from '../entities/subscribe.entitie';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectModel(Subscribe.name)
    private readonly subscribeModel: Model<Subscribe>,
  ) {}

  async create(payload: CreateSubscribeDto) {
    const email = await this.subscribeModel.findOne({ email: payload.email });
    if (email) {
      throw new NotFoundException(`Email ${payload.email} already exists`);
    }
    const newSubscribe = new this.subscribeModel(payload);
    return newSubscribe.save();
  }
}
