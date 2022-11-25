import { IsEmpty } from "class-validator";
import { Column } from "typeorm";

export class BasicTimeEntity {
  @Column()
  created_at: Date;

  @Column({
    default: null,
  })
  updated_at: Date;

  @Column({
    default: null,
  })
  @IsEmpty()
  delete_at: Date;
}