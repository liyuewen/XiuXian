import Utils from 'src/utils/utils';

export default class Paging {
  /**
   * 用于返回分页数据
   * @param data 当前数据对象
   * @param page 当前页码
   * @param size 每页数据量
   * @param total 总数据量
   * @returns 分页数据
   */
  static getPagingData<T extends Object>(
    data: T[],
    page: number,
    size: number,
    total: number,
  ) {
    const { page: _page, size: _size } = this.filterPagingParams(page, size);
    return {
      data,
      page: _page,
      size: _size,
      total,
    };
  }

  /**
   * 处理分页参数
   * @param page 对应 skip 当前页码 typeorm分页从0开始 所以需要减1
   * @param size 对应 take 每页数据量
   */
  static handlePagingParams(page: number, size: number) {
    const { page: _page, size: _size } = this.filterPagingParams(page, size);
    const skip = (_page - 1) * _size;
    const take = _size;
    return {
      skip,
      take,
    };
  }

  /**
   * 过滤分页参数
   */
  static filterPagingParams(page: any, size: any) {
    let _page = Number(page);
    let _size = Number(size);
    if (!Utils.isNumber(_page) || _page < 1) _page = 1;
    if (!Utils.isNumber(_size) || _size < 1) _size = 10;
    return {
      page: _page,
      size: _size,
    };
  }
}
