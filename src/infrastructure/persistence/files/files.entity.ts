import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class File {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
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
