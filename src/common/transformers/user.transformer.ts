import { BaseTransformer } from './base.transformer';
import { User } from '../../user/entities/user.entity';

export class UserTransformer extends BaseTransformer<User> {
  transform(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  collection(users: User[]) {
    return users.map((user) => this.transform(user));
  }
}
