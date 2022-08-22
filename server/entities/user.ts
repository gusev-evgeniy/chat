import { Entity, Column, BeforeInsert, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import bcrypt from 'bcrypt';

import Base from '.';
import Message from './message';
import Participant from './participants';
import Room from './room';

@Entity()
export default class User extends Base {
  @Column({ unique: true }) //temp
  name: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ default: false })
  online: boolean;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  wasOnline: Date;

  @JoinColumn()
  @OneToMany(() => Message, message => message.author, {
    onDelete: 'CASCADE'
  })
  messages: Message[];

  @JoinColumn()
  @OneToMany(() => Room, room => room.author, { 
    onDelete: 'CASCADE'
  })
  rooms: Room[];

  @JoinColumn()
  @OneToMany(() => Participant, participant => participant.user, { 
    onDelete: 'CASCADE'
  })
  chat: Participant[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
