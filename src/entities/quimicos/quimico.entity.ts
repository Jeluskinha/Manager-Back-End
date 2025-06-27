import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Artigo } from "../artigo/artigo.entity";
import {v4 as uuid} from "uuid"
import { Recebimentos } from "./recebimentos.entity";

@Entity()
export class Quimicos {
  @PrimaryGeneratedColumn("uuid")
        readonly id: string

  @Column({length: 50, nullable: false})
  nome:string

  @Column({length: 9, nullable: false})
  codigo:string

  @Column({ nullable: false, type: 'timestamp' })
  createdAt: Date

  @Column({ nullable: false, type: 'timestamp' })
  updatedAt: Date

  @Column({length: 25})
  version: string

  @Column({default: true})
  isActive: boolean

  @OneToMany(() => Recebimentos, Recebido => Recebido.quimico , { eager: true })
  recebimentos: Recebimentos[]

  constructor(){
    if(!this.id) {
      this.id = uuid()
    }
  }
}