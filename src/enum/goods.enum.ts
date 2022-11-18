export enum GoodsTypeEnum {
  /**
   * 装备
   */
  equipment = 1,
  /**
   * 宝箱
   */
  treasureChest = 2,
}

/**
 * 装备部位
 * 1:武器 arms
 * 2:头盔 helmet
 * 3:衣服 clothes
 * 4:鞋子 shoes
 * 5:项链 necklace
 * 6:戒指 ring
 * 7:护腕 bracelet
 * 8:腰带 belt
 * 9:护符 amulet
 * 20:全部 all
 */
export enum EquipmentPositionEnum {
  arms = 1,
  helmet = 2,
  clothes = 3,
  shoes = 4,
  necklace = 5,
  ring = 6,
  bracelet = 7,
  belt = 8,
  amulet = 9,
  all = 20,
}

/**
 * fb 法宝
 * kj 科技
 * lh 灵魂
 */
export enum EquipmentTypeEnum {
  fb = 1,
  kj = 2,
  lh = 3,
}

/**
 * mbgj 自身面板攻击(攻击可能在战斗中因为特效提升所以注意区分)
 * jsgj 结算攻击
 * zjxl 自身面板血量
 * dfxl 敌方血量
 */
export enum DamageTypeEnum {
  mbgj = 1,
  jsgj = 2,
  zjxl = 3,
  dfxl = 4,
}
