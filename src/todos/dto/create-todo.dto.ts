import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Título',
    example: 'Estudar NestJS',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Descrição',
    example: 'Estudar módulos, controllers e services do NestJS',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Status',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}