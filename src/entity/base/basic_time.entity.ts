import { Column } from "typeorm";

export abstract class BasicTimeEntity {
  @Column()
  created_time: Date;

  @Column()
  updated_time: Date;
}