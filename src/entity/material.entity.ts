import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/time.entity';
import { PublicThingEntity } from './public/thing.entity';

/**
 * 材料
 */
@Entity('material')
export default class MaterialEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => PublicThingEntity, { prefix: false })
  publicCommodity: PublicThingEntity;
}
