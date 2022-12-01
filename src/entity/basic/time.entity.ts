import { IsEmpty } from 'class-validator';
import { Column, Index } from 'typeorm';

export class BasicTimeEntity {
  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    default: null,
    name: 'updated_at',
  })
  updatedAt: Date;

  @Index('idx_app_list_deleted_at', { synchronize: false })
  @Column({
    default: null,
    name: 'deleted_at',
    unique: true,
  })
  @IsEmpty()
  deletedAt: Date;
}
