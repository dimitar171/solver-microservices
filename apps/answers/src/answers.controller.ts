import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Controller()
export class AnswersController {
  constructor(private answersService: AnswersService) {}

  @EventPattern('answer_created')
  createAnswers(answer: CreateAnswerDto) {
    return this.answersService.createAnswers(answer);
  }
  @MessagePattern({ cmd: 'get-all-answers' })
  getAllAnswers(data: any) {
    return this.answersService.getAllAnswers(data.id);
  }
}
