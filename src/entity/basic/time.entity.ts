import { IsEmpty } from "class-validator";
import { Column } from "typeorm";

export class BasicTimeEntity {
  @Column({
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;

  @Column({
    default: null,
    name: "updated_at",
  })
  updatedAt: Date;

  @Column({
    default: null,
    name: "deleted_at",
  })
  @IsEmpty()
  deleteAt: Date;
}