import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

import Base from '.';
import Attachment from './attachment';
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

  // @Column({ nullable: false, default: 0 })
  // serialNum: number;
  
  @Column({ default: false })
  isSystem: boolean;

  @JoinColumn()
  @ManyToOne(() => User, user => user.messages)
  author: User;

  @JoinColumn()
  @ManyToOne(() => Room, room => room.messages)
  room: Room;

  @JoinColumn()
  @OneToOne(() => Attachment, attach => attach.message)
  attachment: Attachment;

  @Column({ nullable: false })
  roomId: string;
}
