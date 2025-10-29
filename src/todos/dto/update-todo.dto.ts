import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiPropertyOptional({ description: 'Título da tarefa', example: 'Estudar NestJS atualizado' })
  title?: string;

  @ApiPropertyOptional({ description: 'Descrição da tarefa', example: 'Descrição atualizada' })
  description?: string;

  @ApiPropertyOptional({ description: 'Status de conclusão', example: true })
  completed?: boolean;
}