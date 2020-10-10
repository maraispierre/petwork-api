import * as bcrypt from 'bcrypt';
import { globalConstants } from '../../constant';
import { SubscriptionInput } from '../../application/api/users/inputs/subscription.input';
import { ProfileInput } from '../../application/api/users/inputs/profile.input';

export class User {
  _id: string | undefined;

  email: string;

  password: string;

  firstname: string;

  lastname: string;

  isSuspended: boolean;

  public constructor(
    _id: string | undefined,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
  ) {
    this._id = _id;
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.isSuspended = false;
  }

  public static async subscribe(subscription: SubscriptionInput) {
    const hashedPassword = await bcrypt.hash(
      subscription.password,
      globalConstants.bcryptSaltRounds,
    );

    return new User(
      undefined,
      subscription.email,
      hashedPassword,
      subscription.firstname,
      subscription.lastname,
    );
  }

  public updateProfile(profile: ProfileInput): void {
    this.firstname = profile.firstname;
    this.lastname = profile.lastname;
  }

  public suspend(): User {
    this.isSuspended = true;
    return this;
  }

  public updatePassword(password: string): void {
    this.password = bcrypt.hashSync(password, globalConstants.bcryptSaltRounds);
  }
}
