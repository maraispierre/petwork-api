import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class File {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  location: string;

  @Field()
  size: number;

  // noinspection DuplicatedCode
  public constructor(
    _id: string,
    name: string,
    location: string,
    size: number,
  ) {
    this._id = _id;
    this.name = name;
    this.location = location;
    this.size = size;
  }
}
