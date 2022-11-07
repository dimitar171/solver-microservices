import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private questionRepo: Repository<Question>,
  ) {}

  async createQuestions(question: CreateQuestionDto) {
    const newQuestion = await this.questionRepo.create(question);
    const exists = await this.questionRepo.findOneBy(question);
    if (exists) {
      throw new ConflictException('Question title already exists');
    }
    try {
      await this.questionRepo.save(newQuestion);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return newQuestion;
  }

  async getAllQuestions() {
    return this.questionRepo.find();
  }
}
