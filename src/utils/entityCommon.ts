import { validate } from 'class-validator';

export default class EntityCommon {
  /**
   * 用于返回当前实体的验证错误第一条错误信息
   * 会排除掉实体中的id字段
   * @param model 当前数据对象的实体类
   * @param object 当前数据对象
   * @returns 当前绑定过数据的实体类
   */
  static async verifyEntity<T extends Object>(
    model: T,
    object: Partial<Pick<T, keyof T>>,
  ) {
    const validateModel = model;
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        if (key === 'id') {
          continue;
        }
        validateModel[key] = object[key];
      }
    }
    
    const val = await validate(validateModel);
    if (val.length > 0) {
      let validation = val[0];
      let errors = Object.values(validation.constraints);
      throw errors[0];
    }
    return validateModel;
  }
}
