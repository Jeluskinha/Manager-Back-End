import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Recebimento } from "./recebimento.entity";
import { Quimico } from "./quimico.entity";

@Entity()
export class Estoque {
  @PrimaryGeneratedColumn("uuid")
        readonly id: string

  @Column({length: 50, nullable: false}) // herdado de QUIMICO
  produto:string

  @Column({length: 9, nullable: false}) // herdado de QUIMICO
  codigo:string

  // saldo do estoque: soma do peso_liquido dos recebimentos (incrementado/ajustado pelos services de Recebimentos)
  @Column({ type: 'integer', nullable: false, default: 0 })
  peso_liquido: number

  @Column({ type: 'timestamp', nullable: false })
  atualizado_em: Date

  @Column({length: 50, nullable: false})
  atualizado_por: string
  
  @OneToOne(() => Quimico, (quimico) => quimico.estoque)
  @JoinColumn() // ← FK agora fica aqui, na tabela Estoque
  quimico: Quimico;

  @OneToMany(() => Recebimento, recebimento => recebimento.estoque , { eager: true })
  recebimentos: Recebimento[]

  constructor(){
    if(!this.id) {
      this.id = uuid()
    }
    if (this.peso_liquido === undefined) {
      this.peso_liquido = 0
    }
    //  if (!this.atualizado_por) {
    //   this.atualizado_por = 'AdminUser'
    // }
  }
}