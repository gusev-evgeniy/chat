import { Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Base from '.';

import Message from './message';
import Room from './room';
import User from './user';

@Entity()
export default class Participant extends Base {

  @JoinColumn()
  @ManyToOne(() => User, user => user.chat)
  user: User;

  @JoinColumn()
  @ManyToOne(() => Room, room => room.participants)
  room: Room;

  @JoinColumn()
  @OneToOne(() => Message)
  lastMessage: Message;
}
