import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class File {
  @Field()
  name: string;

  @Field()
  location: string;

  // noinspection DuplicatedCode
  public constructor(name: string, location: string) {
    this.name = name;
    this.location = location;
  }
}
