import { RepositoryType } from '../../@types/Repositories';
import { UserDetailsType, UserListType } from '../../@types/User';
import { HttpService } from './HttpService';

export default class UserService extends HttpService {
  async getUsersList(since?: string): Promise<UserListType> {
    return this.get(since ? `/users?since=${since}` : '/users');
  }

  async getUserDetails(username: string): Promise<{ user: UserDetailsType }> {
    return this.get(`/users/${username}/details`);
  }

  async getUserRepos(username: string): Promise<{ repos: RepositoryType[] }> {
    return this.get(`/users/${username}/repos`);
  }
}
