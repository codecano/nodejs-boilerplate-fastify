import BaseService from '../framework/base.service';
import { TodoModel } from '../models/todo.model';

class TodoService extends BaseService {
  constructor() { super(TodoModel); }
}

export default new TodoService();