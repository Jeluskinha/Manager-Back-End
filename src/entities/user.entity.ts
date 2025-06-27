import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from "uuid"

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column({length: 60})
  name:string

  @Column({length: 60, unique: true})
  email:string

  @Column({default: true})
  isActive: boolean

  @Column()
  accessLevel: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt:Date  

  constructor(){
    if(!this.id) {
      this.id = uuid()
    }
  }
}