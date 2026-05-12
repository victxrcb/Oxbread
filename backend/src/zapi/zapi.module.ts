import { Module } from '@nestjs/common'
import { ZapiService } from './zapi.service'

@Module({
  providers: [ZapiService],
  exports: [ZapiService],
})
export class ZapiModule {}
