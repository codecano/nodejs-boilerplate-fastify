
import BaseService from '../framework/base.service';
import { UserModel } from '../models/user.model';

class UserService extends BaseService {
  constructor() { super(UserModel); }
}

export default new UserService();