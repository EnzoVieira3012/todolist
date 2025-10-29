import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiQuery,
  ApiBody 
} from '@nestjs/swagger';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiQuery({ 
    name: 'completed', 
    required: false, 
    description: 'Filtrar por status de conclusão',
    type: Boolean 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de tarefas retornada com sucesso',
    type: [Todo]
  })
  async findAll(@Query('completed') completed?: string): Promise<Todo[]> {
    if (completed !== undefined) {
      const isCompleted = completed === 'true';
      return await this.todosService.findByStatus(isCompleted);
    }
    return await this.todosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tarefa por ID' })
  @ApiParam({ name: 'id', description: 'ID da tarefa', type: Number })
  @ApiResponse({ status: 200, description: 'Tarefa encontrada', type: Todo })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return await this.todosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova tarefa' })
  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Tarefa criada com sucesso',
    type: Todo 
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todosService.create(createTodoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma tarefa' })
  @ApiParam({ name: 'id', description: 'ID da tarefa', type: Number })
  @ApiBody({ type: UpdateTodoDto })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada', type: Todo })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return await this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma tarefa' })
  @ApiParam({ name: 'id', description: 'ID da tarefa', type: Number })
  @ApiResponse({ status: 204, description: 'Tarefa excluída com sucesso' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.todosService.remove(id);
  }
}