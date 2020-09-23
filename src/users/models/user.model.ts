import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field()
  @ObjectIdColumn()
  _id: string;

  @Field({ nullable: true })
  @Column()
  email?: string;
}
