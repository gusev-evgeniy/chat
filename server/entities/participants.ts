import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import Base from '.';

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
}
