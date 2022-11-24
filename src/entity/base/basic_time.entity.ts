import { Column } from "typeorm";

export abstract class BasicTimeEntity {
  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  delete_at: Date;
}