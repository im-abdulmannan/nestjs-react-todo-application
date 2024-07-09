import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
@ApiTags('Todo')
@ApiSecurity('JWT-auth')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(':userId')
  create(
    @Body() createTodoDto: CreateTodoDto,
    @Param('userId') userId: number,
  ) {
    return this.todoService.create(createTodoDto, Number(userId));
  }

  @Get('find-all-not-completed-todo/:userId')
  findAllNotCompletedTodo(@Param('userId') userId: number) {
    return this.todoService.findAllUnCompletedTodo(Number(userId));
  }

  @Get('find-all-completed-todo/:userId')
  findAllCompletedTodo(@Param('userId') userId: number) {
    return this.todoService.findAllCompletedTodo(Number(userId));
  }

  @Patch(':id')
  update(@Param('id') id: number) {
    return this.todoService.update(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoService.remove(Number(id));
  }
}
