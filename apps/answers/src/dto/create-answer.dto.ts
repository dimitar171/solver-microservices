import { IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  questionId: number;
}
