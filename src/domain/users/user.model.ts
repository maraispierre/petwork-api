import * as bcrypt from 'bcrypt';
import { globalConstants } from '../../constant';
import { RegisterInput } from '../../application/api/users/inputs/register.input';
import { ProfileInput } from '../../application/api/users/inputs/profile.input';
import { File } from '../files/file.model';

export class User {
  _id: string | undefined;

  email: string;

  password: string;

  firstname: string;

  lastname: string;

  avatar: File | undefined;

  isSuspended: boolean;

  // noinspection DuplicatedCode
  public constructor(
    _id: string | undefined,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    avatar: File | undefined = undefined,
  ) {
    this._id = _id;
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.isSuspended = false;
    this.avatar = avatar;
  }

  public static async subscribe(subscription: RegisterInput) {
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

  public updateAvatar(avatar: File): void {
    this.avatar = avatar;
  }
}
