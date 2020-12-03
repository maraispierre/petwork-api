import { Column, Entity } from 'typeorm';

@Entity()
export class File {
  @Column()
  name: string;

  @Column()
  location: string;

  // noinspection DuplicatedCode
  public constructor(name: string, location: string) {
    this.name = name;
    this.location = location;
  }
}
