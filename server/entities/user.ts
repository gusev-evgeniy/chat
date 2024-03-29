import {
  Entity,
  Column,
  BeforeInsert,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import bcrypt from 'bcrypt';

import Base from '.';
import Message from './message';
import Participant from './participants';
import Room from './room';

@Entity()
export default class User extends Base {
  @Column({ unique: true })
  name: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ default: true })
  online: boolean;

  @Column({ nullable: true })
  socketId: string;

  @Column()
  background: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  wasOnline: Date;

  @JoinColumn()
  @OneToMany(() => Message, message => message.author, {
    cascade: true,
  })
  messages: Message[];

  @JoinColumn()
  @OneToMany(() => Room, room => room.author, {
    cascade: true,
  })
  rooms: Room[];

  @JoinColumn()
  @OneToMany(() => Participant, participant => participant.user, {
    cascade: true,
  })
  chat: Participant[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
