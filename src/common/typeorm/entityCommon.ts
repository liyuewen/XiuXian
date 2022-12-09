import { validate } from 'class-validator';
import Utils from '../../utils/utils';

interface VerifyEntityOptions<T> {
  groups?: string[];
  updateValue?: T;
}

export default class EntityCommon {
  /**
   * 用于返回当前实体的验证错误第一条错误信息
   * 会排除掉实体中的id字段
   * @param entity 当前数据对象的实体类
   * @param values 当前数据对象, 会排除一些关键字段
   * @param options 配置对象
   * @returns 当前绑定过数据的实体类
   */
  static async verifyEntity<T extends Object>(
    entity: T,
    values: Partial<Pick<T, keyof T>>,
    options: VerifyEntityOptions<Partial<Pick<T, keyof T>>> = {
      groups: [],
    },
  ) {
    let validateModel = entity;
    const groups = ['id', 'createdAt', 'updatedAt', 'deleteAt', 'createdBy'];
    if (Utils.isArray(options.groups)) {
      groups.concat(options.groups);
    }
    validateModel = this.setEntity(validateModel, values, groups);
    validateModel = this.setEntity(validateModel, options.updateValue);
    const val = await validate(validateModel);
    if (val.length > 0) {
      let validation = val[0];
      let errors = Object.values(validation.constraints);
      throw errors[0];
    }
    return validateModel;
  }

  private static setEntity<T extends Object>(
    entity: T,
    values: Partial<Pick<T, keyof T>>,
    groups: string[] = [],
  ) {
    const tempEntity = entity;
    if (Utils.isObject(values)) {
      for (const key in values) {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
          if (groups.indexOf(key) !== -1) {
            continue;
          }
          const value = values[key];
          tempEntity[key] = value;
        }
      }
    }
    return tempEntity;
  }
}
