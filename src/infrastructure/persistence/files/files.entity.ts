import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class File {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  uri: string;

  @Column()
  size: number;

  // noinspection DuplicatedCode
  public constructor(_id: string, name: string, uri: string, size: number) {
    this._id = _id;
    this.name = name;
    this.uri = uri;
    this.size = size;
  }
}
