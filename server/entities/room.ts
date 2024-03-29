import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';

import Base from '.';
import Message from './message';
import Participant from './participants';
import User from './user';

@Entity()
export default class Room extends Base {
  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  background: string;

  @Column({ default: 0 })
  messagesCount: number;

  @Column({ default: 'private', enum: ['private', 'group'] })
  type: string;

  @JoinColumn()
  @OneToMany(() => Participant, participant => participant.room, { 
    onDelete: 'CASCADE'
  })
  participants: Participant[];

  @JoinColumn()
  @ManyToOne(() => User, user => user.rooms)
  author: User;

  @JoinColumn()
  @OneToMany(() => Message, message => message.room, { 
    onDelete: 'CASCADE'
  })
  messages: Message[];

  @JoinColumn()
  @OneToOne(() => Message)
  lastMessage: Message;
}
