import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {getRabbitMQOptions} from '@project/helpers';
import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberController } from './email-subscriber.controller';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EmailSubscriberModel.name,
        schema: EmailSubscriberSchema,
      },
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit'),
    ),
    MailModule,
  ],
  controllers: [
    EmailSubscriberController,
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
  ],
})
export class EmailSubscriberModule { }
