import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

@Injectable()
export class ZapiService {
  private readonly logger = new Logger(ZapiService.name)
  private readonly baseUrl: string
  private readonly clientToken: string
  private readonly restaurantPhone: string

  constructor(private config: ConfigService) {
    const instanceId = config.getOrThrow('ZAPI_INSTANCE_ID')
    const token = config.getOrThrow('ZAPI_TOKEN')
    this.clientToken = config.getOrThrow('ZAPI_CLIENT_TOKEN')
    this.restaurantPhone = config.getOrThrow('RESTAURANT_PHONE')
    this.baseUrl = `https://api.z-api.io/instances/${instanceId}/token/${token}`
  }

  async sendText(message: string): Promise<void> {
    try {
      await axios.post(
        `${this.baseUrl}/send-text`,
        { phone: this.restaurantPhone, message },
        { headers: { 'Client-Token': this.clientToken } },
      )
    } catch (err) {
      this.logger.error('Z-API error', err?.response?.data ?? err.message)
      throw new InternalServerErrorException('Falha ao enviar mensagem via WhatsApp')
    }
  }
}
