import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  firstname: string;
  @Field()
  lastname: string;

  constructor(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
  ) {
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
