import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('todos')
export class Todo {
  @ApiProperty({ description: 'ID único da tarefa', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Título da tarefa', example: 'Estudar NestJS' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ 
    description: 'Descrição da tarefa', 
    example: 'Estudar módulos e controllers',
    required: false 
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ description: 'Status de conclusão', example: false })
  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @ApiProperty({ description: 'Data de criação', example: '2024-01-01T00:00:00.000Z' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização', example: '2024-01-01T00:00:00.000Z' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}