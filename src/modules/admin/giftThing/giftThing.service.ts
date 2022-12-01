import { Injectable } from '@nestjs/common';
import AuthRedis from 'src/common/redis/auth';
import AssociateThingEntity from 'src/entity/public/associateThing.entity';
import { MailOptions, MailService } from 'src/modules/mail/mail.service';
import { Request } from 'express';
import Utils from 'src/utils/utils';

export interface GiftThingOptions extends MailOptions {
  associateThing: AssociateThingEntity[];
}

@Injectable()
export class GiftThingService {
  constructor(private mailService: MailService) {}

  /**
   * 赠送物品
   */
  async send(options: GiftThingOptions, req: Request) {
    const token = Utils.getHeaderToken(req);
    const createdBy = await AuthRedis.getToken(token);
    const result = await this.mailService.send({
      ...options,
      createdBy: createdBy.id,
    });
    return {
      mailId: result.mail.id,
    };
  }
}
