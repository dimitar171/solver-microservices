import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiGatewayController } from './api-gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'QUESTIONS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'questions_queue',
        },
      },
      {
        name: 'ANSWERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'answers_queue',
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
})
export class ApiGatewayModule {}
