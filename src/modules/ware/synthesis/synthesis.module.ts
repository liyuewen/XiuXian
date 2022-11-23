import { Module } from '@nestjs/common';
import SynthesisDao from 'src/dao/synthesis.dao';
import { SynthesisController } from './synthesis.controller';
import { SynthesisService } from './synthesis.service';

@Module({
  controllers: [SynthesisController],
  providers: [SynthesisService, SynthesisDao]
})
export class SynthesisModule {}
