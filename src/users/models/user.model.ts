import { Injectable } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { SubscriptionInput } from '../inputs/subscription.input';

@ObjectType()
@Entity()
export class User {
  @Field()
  @ObjectIdColumn()
  _id: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  isSuspended: boolean;

  constructor(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
  ) {
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.isSuspended = false;
  }
}
