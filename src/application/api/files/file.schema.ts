import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class File {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  uri: string;

  @Field()
  size: number;

  // noinspection DuplicatedCode
  public constructor(_id: string, name: string, uri: string, size: number) {
    this._id = _id;
    this.name = name;
    this.uri = uri;
    this.size = size;
  }
}
