import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Recebimento } from "./recebimento.entity";
import { Estoque } from "./estoque.entity";

@Entity()
export class Quimico {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({length: 50, nullable: false})
  produto:string

  @Column({length: 9, nullable: false})
  codigo:string

  @Column({ nullable: false, type: 'timestamp' })
  criado_em: Date;

  @Column({ nullable: false, type: 'timestamp' })
  atualizado_em: Date;

  @Column({length: 50, nullable: false})
  atualizado_por: string

  @Column({ length: 25 })
  versao: string;

  @Column({ default: true })
  status: boolean;

  @OneToOne(() => Estoque, (estoque) => estoque.quimico)
  estoque: Estoque;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    if (!this.criado_em) {
      this.criado_em = new Date();
    }
    if (!this.atualizado_em) {
      this.atualizado_em = new Date();
    }
    if (!this.atualizado_por) {
      this.atualizado_por = 'AdminUser'
    }
  }
}