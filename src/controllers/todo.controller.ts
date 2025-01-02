import BaseController from '../framework/base.controller';
import TodoService from '../services/todo.service';
import { TodoModel } from '../models/todo.model';

class TodoController extends BaseController {
  constructor() {
    super(TodoModel, TodoService);
  }
}

export default new TodoController();
