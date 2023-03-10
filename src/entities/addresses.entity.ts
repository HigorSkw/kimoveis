import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Addresses {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  district: string;

  @Column()
  zipCode: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @Column()
  state: string;
}
