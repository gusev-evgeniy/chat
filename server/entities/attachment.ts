import { Entity, Column, OneToOne } from 'typeorm';

import Base from '.';
import Message from './message';

@Entity()
export default class Attachment extends Base {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  size: number;

  @Column({ nullable: true, type: 'bytea' })
  content: Buffer; 

  @Column({ nullable: true })
  type: string; 

  @OneToOne(() => Message)
  message: Message;
}
