import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { Addresses } from "./addresses.entity";
import { Categories } from "./categories.entity";
import { Schedules } from "./schedules.entity";

@Entity()
export class Properties {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  sold: boolean;

  @Column()
  value: number;

  @Column()
  size: number;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date;

  @OneToOne((type) => Addresses, {
    eager: true,
  })
  @JoinColumn()
  address: Addresses;

  @OneToMany((type) => Schedules, (schedules) => schedules.property, {
    eager: true,
  })
  schedules: Schedules[];

  @ManyToOne((type) => Categories, (categories) => categories.properties)
  category: Categories;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
