import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ProfileInput {
  @Field()
  _id: string;
  @Field()
  firstname: string;
  @Field()
  lastname: string;

  constructor(_id: string, firstname: string, lastname: string) {
    this._id = _id;
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
