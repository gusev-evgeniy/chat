import { Entity, Column, BeforeInsert } from "typeorm"
import bcrypt from 'bcrypt';

import Base from "."

@Entity()
export default class User extends Base {
    @Column({ unique: true }) //temp
    name: string

    @Column({ nullable: true }) //temp. unique
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    photo: string

    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 6);
     }
}