import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AnswersModule } from './answers.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AnswersModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'answers_queue',
      },
    },
  );
  await app.listen();
}
bootstrap();
