import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtToken {
  @Field()
  access_token: string;
}
