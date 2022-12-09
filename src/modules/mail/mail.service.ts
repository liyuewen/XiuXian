import { Injectable } from '@nestjs/common';
import HttpError from 'src/common/error/httpError';
import CharacterDao from 'src/dao/character.dao';
import MailDao from 'src/dao/mail.dao';
import MailEntity from 'src/entity/mail.entity';
import MailThingEntity from 'src/entity/mailThing.entity';
import AssociateThingEntity from 'src/entity/public/associateThing.entity';
import EntityCommon from 'src/common/typeorm/entityCommon';
import Utils from 'src/utils/utils';
import AuthRedis from 'src/common/redis/auth';
import { AuthService } from '../user/auth/auth.service';

export interface MailOptions extends Partial<MailEntity> {
  title: string;
  createdBy: number;
  characterId: number;
  receiverId: number;
  associateThing?: AssociateThingEntity[];
}

@Injectable()
export class MailService {
  constructor(
    private mailDao: MailDao,
    private characterDao: CharacterDao,
    private authService: AuthService,
  ) {}

  /**
   * 先创建邮件，再创建邮件物品
   * 邮件的id作为邮件物品的mailId
   * 通过循环associateThing，创建邮件物品
   * @param options
   */
  async send(options: MailOptions) {
    const character = await this.characterDao.getCharacterById(
      options.characterId,
    );
    if (!Utils.isExists(character)) {
      throw new HttpError('角色不存在');
    }
    // 拒绝接收外部发来的创建者id
    const values = await EntityCommon.verifyEntity(new MailEntity(), options, {
      updateValue: {
        createdBy: options.createdBy,
      },
    });
    const mail = await this.mailDao.createMail(values);
    const associateThing = options.associateThing;
    const mailThing = await this.createMailThing(associateThing, mail);
    return {
      mail,
      mailThing,
    };
  }

  /**
   * 创建邮件物品
   * @param options
   * @param mail
   * @returns
   */
  async createMailThing(options: AssociateThingEntity[], mail: MailEntity) {
    const map = options.map(async (thing) => {
      const mailThing = await EntityCommon.verifyEntity(new MailThingEntity(), {
        mailId: mail.id,
        thing,
      });
      return await this.mailDao.createMailThing(mailThing);
    });
    return await Promise.all(map);
  }

  /**
   * 获取收件人的所有邮件
   * 不传收件人id默认查询自己的
   * @param receiverId 收件人id
   * @param page
   * @param size
   * @returns
   */
  async getMailList(
    receiverId: number,
    page: number,
    size: number,
    token: string,
  ) {
    const isAuth = await this.authService.validateCharacter(token, receiverId);
    if (isAuth) {
      return await this.mailDao.getMailByReceiverId(receiverId, page, size);
    }
    throw new HttpError('收件人不是当前用户');
  }

  async getMailById(mailId: number, token: string) {
    const isAuthMail = await this.authMail(mailId, token);
    if (isAuthMail) {
      const mail = await this.mailDao.getMailById(Number(mailId));
      const mailThing = await this.mailDao.getMailThingByMailId(Number(mailId));
      return {
        ...mail,
        mailThing: mailThing,
      };
    }
    throw new HttpError('邮件不属于当前用户');
  }

  /**
   * 验证邮件是否属于当前用户
   * @param mailId 邮件id
   * @param token token
   * @returns
   */
  async authMail(mailId: number, token: string) {
    const user = await AuthRedis.getToken(token);
    console.log(user);
    
    const character = await this.characterDao.getCharacterByUserId(user.id);
    const mail = await this.mailDao.getMailById(Number(mailId));
    const temp = character.findIndex((item) => item.id === mail.receiverId);
    if (temp !== -1) {
      return true;
    }
    return false;
  }
}
