import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Artigo } from "../artigo/artigo.entity";
import {v4 as uuid} from "uuid"

@Entity()
export class Etapa {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column({length: 2, nullable: false})
  numero:string

  @Column({length: 7, nullable: false})
  duracao:string

  @Column({length: 9, nullable: false})
  velocidade: string

  @Column({length: 50})
  diretriz: string

  @ManyToOne(() => Artigo)
  artigo: Artigo

  constructor(){
    if(!this.id) {
      this.id = uuid()
      // throw new AppError("CONFLITO - Id de etapa não informado", 409)
    }
  }
}