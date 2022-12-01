import { Injectable } from '@nestjs/common';
import SynthesisDao from 'src/dao/synthesis.dao';

@Injectable()
export class SynthesisService {
  constructor(private synthesisDao: SynthesisDao) {}


}
