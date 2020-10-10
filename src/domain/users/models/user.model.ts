import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { globalConstants } from '../../../constant';
import { SubscriptionInput } from '../../../application/users/inputs/subscription.input';
import { ProfileInput } from '../../../application/users/inputs/profile.input';

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
  @Column({ nullable: false })
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

  static async subscribe(subscription: SubscriptionInput) {
    const hashedPassword = await bcrypt.hash(
      subscription.password,
      globalConstants.bcryptSaltRounds,
    );

    return new User(
      subscription.email,
      hashedPassword,
      subscription.firstname,
      subscription.lastname,
    );
  }

  updateProfile(profile: ProfileInput): void {
    this.firstname = profile.firstname;
    this.lastname = profile.lastname;
  }

  suspend(): void {
    this.isSuspended = true;
  }

  updatePassword(password: string): void {
    this.password = bcrypt.hashSync(password, globalConstants.bcryptSaltRounds);
  }
}
