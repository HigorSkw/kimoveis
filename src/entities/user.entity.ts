import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Schedules } from "./schedules.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  isAdm: boolean;

  @Column()
  isActive: boolean;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date;

  @OneToMany((type) => Schedules, (schedule) => schedule.user, {
    eager: true,
  })
  schedules: Schedules[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
