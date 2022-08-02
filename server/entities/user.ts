import { Entity, Column, BeforeInsert } from "typeorm"
import bcrypt from 'bcrypt';

import Base from "."

@Entity()
export class User extends Base {
    @Column()
    name: string

    @Column()
    password: string

    @Column()
    photo?: string

    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 6);
     }
}