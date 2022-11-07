import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';

@Controller()
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}
  @EventPattern('question_created')
  createQuestions(question: CreateQuestionDto) {
    return this.questionsService.createQuestions(question);
  }
  @MessagePattern({ cmd: 'get-all-questions' })
  getAllQuestions() {
    return this.questionsService.getAllQuestions();
  }
}
