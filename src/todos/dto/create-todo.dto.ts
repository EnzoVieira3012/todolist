import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Estudar NestJS',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada da tarefa',
    example: 'Estudar módulos, controllers e services do NestJS',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Status de conclusão da tarefa',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}