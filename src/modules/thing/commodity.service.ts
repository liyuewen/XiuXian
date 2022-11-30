import { Injectable } from '@nestjs/common';
import EquipmentDao from 'src/dao/equipment.dao';
import MaterialDao from 'src/dao/material.dao';
import { CommodityTypeEnum } from 'src/enum/commodity.enum';

@Injectable()
export class CommodityService {
  constructor(
    private materialDao: MaterialDao,
    private equipmentDao: EquipmentDao,
  ) {}

  /**
   * 获取当前物品的最大数量
   * @param commodity_id
   * @param commodity_type
   * @returns
   */
  async getCommodityMaxQuantity(
    commodity_id: number,
    commodity_type: CommodityTypeEnum,
  ) {
    if (commodity_type === CommodityTypeEnum.material) {
      const material = await this.materialDao.getMaterialById(commodity_id);
      return material.publicCommodity.maxQuantity;
    } else if (commodity_type === CommodityTypeEnum.equipment) {
      const equipment = await this.equipmentDao.getEquipmentById(commodity_id);
      return equipment.publicCommodity.maxQuantity
    }
  }
}
