import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class File {
  @Field(/* istanbul ignore next */ () => ID)
  _id: string;

  @Field()
  location: string;

  // noinspection DuplicatedCode
  public constructor(_id: string, location: string) {
    this._id = _id;
    this.location = location;
  }
}
