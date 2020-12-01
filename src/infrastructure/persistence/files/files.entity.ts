import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class File {
  @ObjectIdColumn()
  _id: string;

  @Column()
  location: string;

  // noinspection DuplicatedCode
  public constructor(_id: string, location: string) {
    this._id = _id;
    this.location = location;
  }
}
