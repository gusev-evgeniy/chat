import { Entity, Column, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import bcrypt from 'bcrypt';

import Base from '.';

@Entity()
export default class User extends Base {
  @Column({ unique: true }) //temp
  name: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  photo: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
