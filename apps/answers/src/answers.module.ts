import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dbAnswers.sqlite',
      entities: [Answer],
      synchronize: true,
    }),
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
