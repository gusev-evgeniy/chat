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

  @Column({ nullable: true })
  authorId: string;

  @Column({ nullable: true })
  media: string;
  
  @Column({ default: false })
  isSystem: boolean;

  @JoinColumn()
  @ManyToOne(() => User, user => user.messages)
  author: User;

  @JoinColumn()
  @ManyToOne(() => Room, room => room.messages)
  room: Room;

  @Column({ nullable: false })
  roomId: string;
}
