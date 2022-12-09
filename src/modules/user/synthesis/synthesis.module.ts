import { Module } from '@nestjs/common';
import { SynthesisController } from './synthesis.controller';
import { SynthesisService } from './synthesis.service';

@Module({
  controllers: [SynthesisController],
  providers: [SynthesisService]
})
export class SynthesisModule {}
