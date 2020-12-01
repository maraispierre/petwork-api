import { Column, Entity, JoinColumn, ObjectIdColumn, OneToOne } from 'typeorm';
import { File } from '../files/files.entity';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string | undefined;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @OneToOne(() => File)
  @JoinColumn()
  avatar: File;

  @Column()
  isSuspended: boolean;

  // noinspection DuplicatedCode
  public constructor(
    _id: string | undefined,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
  ) {
    this._id = _id;
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.isSuspended = false;
  }
}
