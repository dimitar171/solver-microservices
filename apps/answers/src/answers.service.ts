import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './answer.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer) private answerRepo: Repository<Answer>,
  ) {}

  async createAnswers(answer: CreateAnswerDto) {
    const newAnswer = await this.answerRepo.create(answer);
    const exists = await this.answerRepo.findOneBy(answer);
    if (exists) {
      throw new ConflictException('Answer title already exists');
    }
    try {
      await this.answerRepo.save(newAnswer);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return newAnswer;
  }

  async getAllAnswers(id: number) {
    const found = await this.answerRepo.find({
      where: { questionId: id },
    });
    return found;
  }
}
