import {Strategy} from 'passport-local';
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {User} from '@project/types';
import {AuthenticationService} from '../authentication.service';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalAccessStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthenticationService
  ) {
    super({usernameField: USERNAME_FIELD_NAME});
  }

  public async validate(email: string, password: string): Promise<User> {
    return this.authService.verifyUser({email, password});
  }
}
