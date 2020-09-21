import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(/* istanbul ignore next */ type => Int)
  id: number;

  @Field({ nullable: true })
  email?: string;
}
