
import BaseController from '../framework/base.controller';
import UserService from '../services/user.service';
import { UserModel } from '../models/user.model';

class UserController extends BaseController {
  constructor() {
    super(UserModel, UserService);
  }
}

export default new UserController();