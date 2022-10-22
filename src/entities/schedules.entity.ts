import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";
import { Properties } from "./properties.entity";

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  date: Date;

  @Column()
  hour: Date;

  @ManyToOne((type) => Properties, (propertie) => propertie.schedules)
  property: Properties;

  @ManyToOne((type) => User, (user) => user.schedules)
  user: User;
}
