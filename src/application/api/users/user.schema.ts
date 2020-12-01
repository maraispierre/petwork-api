import { Field, ID, ObjectType } from '@nestjs/graphql';
import { File } from '../files/file.schema';

@ObjectType()
export class User {
  @Field(/* istanbul ignore next */ () => ID)
  _id: string | undefined;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field(/* istanbul ignore next */ () => File)
  avatar: File;

  @Field()
  isSuspended: boolean;

  // noinspection DuplicatedCode
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
}
