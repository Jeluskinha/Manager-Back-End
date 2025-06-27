import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Quimicos } from "./quimico.entity";

@Entity()
export class Recebimentos {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50, nullable: false })
  produto: string;

  @Column({length: 9, nullable: false})
  codigo:string

  @Column({ nullable: false })
  pesoBruto: number;

  @Column({ nullable: false })
  pesoLiquido: number;

  @Column({ length: 25, nullable: false })
  recipiente: string;

  @Column({ nullable: false })
  quantidade: number;

  @Column({ nullable: false })
  fornecedor: string;

  @Column({ nullable: false, type: 'timestamp' })
  data: Date;

  @ManyToOne(() => Quimicos, (quimico) => quimico.recebimentos)
  quimico: Quimicos;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

