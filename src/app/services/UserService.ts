import { UserListType } from '../../@types/User';
import { HttpService } from './HttpService';

export default class UserService extends HttpService {
  async getUsersList(): Promise<UserListType> {
    return this.get('/users');
  }
}
