import { Injectable } from '@nestjs/common'
import { ZapiService } from '../zapi/zapi.service'
import { CreateOrderDto } from './dto/create-order.dto'

@Injectable()
export class OrdersService {
  constructor(private zapi: ZapiService) {}

  async create(dto: CreateOrderDto): Promise<{ ok: boolean }> {
    const message = this.buildMessage(dto)
    await this.zapi.sendText(message)
    return { ok: true }
  }

  private buildMessage(dto: CreateOrderDto): string {
    const fmt = (v: number) =>
      v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    const fee = dto.deliveryType === 'delivery' ? 5 : 0
    const subtotal = dto.items.reduce((s, i) => s + i.price * i.qty, 0)
    const total = subtotal + fee

    const paymentLabel: Record<string, string> = {
      pix: 'Pix',
      card: 'Cartão (MercadoPago)',
      cash: 'Dinheiro',
    }

    const itemLines = dto.items
      .map(i => {
        const obsNote = i.obs?.trim() ? `\n     ↳ ${i.obs.trim()}` : ''
        return `  ${i.qty}× ${i.name} — ${fmt(i.price * i.qty)}${obsNote}`
      })
      .join('\n')

    const deliveryLine =
      dto.deliveryType === 'delivery'
        ? `🚗 *Entrega:* ${dto.address}\n   Taxa: ${fmt(fee)}`
        : '🏪 *Retirada no local*'

    const changeLine =
      dto.payment === 'cash' && dto.change
        ? `\n   Troco para: ${dto.change}`
        : ''

    return (
      `🍔 *NOVO PEDIDO — OxBread Burger*\n\n` +
      `👤 *Cliente:* ${dto.name}\n` +
      `📱 *Telefone:* ${dto.phone}\n` +
      `${deliveryLine}\n\n` +
      `🛒 *Itens:*\n${itemLines}\n\n` +
      `💳 *Pagamento:* ${paymentLabel[dto.payment]}${changeLine}\n\n` +
      `💰 *Total: ${fmt(total)}*`
    )
  }
}
