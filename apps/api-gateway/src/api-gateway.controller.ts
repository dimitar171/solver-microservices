import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { CreateAnswerDto } from './dtos/create-answer.dto';
@Controller('/questions')
export class ApiGatewayController {
  constructor(
    @Inject('QUESTIONS_SERVICE') private clientQuest: ClientProxy,
    @Inject('ANSWERS_SERVICE') private clientAnsw: ClientProxy,
  ) {}

  @Post()
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.clientQuest.emit('question_created', createQuestionDto);
  }

  @Get()
  async getQuestions() {
    return this.clientQuest.send(
      {
        cmd: 'get-all-questions',
      },
      '',
    );
  }

  @Post('/:questionsId/answers')
  async createAnswer(
    @Body() createAnswer: CreateAnswerDto,
    @Param('questionsId', ParseIntPipe) questionsId: number,
  ) {
    createAnswer.questionId = questionsId;
    return this.clientAnsw.emit('answer_created', createAnswer);
  }

  @Get('/:questionsId/answers')
  async getAnswers(@Param('questionsId', ParseIntPipe) questionsId: number) {
    return this.clientAnsw.send(
      {
        cmd: 'get-all-answers',
      },
      { questionsId },
    );
  }
}
