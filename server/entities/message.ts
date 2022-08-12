import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import Base from '.';
import Room from './room';
import User from './user';

@Entity()
export default class Message extends Base {
  @Column({ nullable: true })
  text: string;

  @Column({ default: false })
  readed: boolean;

  @JoinColumn()
  @ManyToOne(() => User, user => user.messages)
  author: User;

  @Column({ nullable: false })
  roomId: string;

  @JoinColumn()
  @ManyToOne(() => Room, room => room.messages)
  room: Room;
}