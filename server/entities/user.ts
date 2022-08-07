import { Entity, Column, BeforeInsert, JoinColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import bcrypt from 'bcrypt';

import Base from '.';
import Message from './message';
import Participant from './participants';

@Entity()
export default class User extends Base {
  @Column({ unique: true }) //temp
  name: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  photo: string;

  @JoinColumn()
  @OneToMany(() => Message, message => message.author)
  messages: Message[];

  @JoinColumn()
  @OneToMany(() => Participant, participant => participant.userId)
  chat: Participant[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
