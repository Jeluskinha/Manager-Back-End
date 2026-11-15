import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import {v4 as uuid} from "uuid"
import { Etapa } from "../formula/etapa.entity";

@Entity()
export class Artigo {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column({length: 15, nullable: false})
  nome:string

  @Column({length: 60, nullable: false})
  espessura:string

  @Column({length: 15, nullable: false})
  cor: string

  @Column({length: 8, nullable: false})
  fmvs: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt:Date 

  @Column({length: 25, nullable: false})
  version:string 

  @Column({default: true})
  isActive: boolean

  @OneToMany(() => Etapa, etapa => etapa.artigo, { eager: true })
  etapa: Etapa[]

  // constructor(){
  //   if(!this.id) {
  //     this.id = uuid()
  //   }
  // }
}