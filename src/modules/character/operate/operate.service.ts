import { Injectable } from '@nestjs/common';
import MailDao from 'src/dao/mail.dao';

@Injectable()
export class OperateService {
  constructor(private mailDao: MailDao) {}

  /**
   * 提取邮件的附件
   */
  async extractMailAtt() {}
  
}
