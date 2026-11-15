import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Estoque } from "./estoque.entity";

@Entity()
export class Recebimento {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({length: 50, nullable: false}) // consultado e pego automaticamente de Estoque
  produto:string

  @Column({ nullable: false })
  peso_bruto: number;

  @Column({ nullable: false })
  peso_liquido: number;

  @Column({ length: 25, nullable: false })// sera outra tabela
  tipo_recipiente: string;

  @Column({ type: "numeric", precision: 5, nullable: false })// sera outra tabela
  quantidade_recipiente: number;

  @Column({ type: "numeric", precision: 5, nullable: false })
  quantidade_pallet: number;

  @Column({ nullable: false, type: 'timestamp', update: false })
  recebido_em: Date;

  @Column({ length: 36, nullable: false, update: false })
  recebido_por: string;

  @Column({ nullable: false, type: 'timestamp' })
  atualizado_em: Date;

  @Column({ length: 36, nullable: false })
  atualizado_por: string;

  @Column({length: 23, nullable: false, update: false}) // ex: L01IN0204OUT0824COD0123 -> por partes L 01 IN 0204 OUT 0824 COD 0123
  lote:string

  @Column({ nullable: false }) // sera outra tabela
  fornecedor: string;

  @ManyToOne(() => Estoque, estoque => estoque.recebimentos)
  estoque: Estoque;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    if (!this.recebido_em) {
      this.recebido_em = new Date();
    }
    if (!this.atualizado_em) {
      this.atualizado_em = new Date();
    }
  }
}