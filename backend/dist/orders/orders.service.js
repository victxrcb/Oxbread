"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const zapi_service_1 = require("../zapi/zapi.service");
let OrdersService = class OrdersService {
    constructor(zapi) {
        this.zapi = zapi;
    }
    async create(dto) {
        const message = this.buildMessage(dto);
        await this.zapi.sendText(message);
        return { ok: true };
    }
    buildMessage(dto) {
        const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const fee = dto.deliveryType === 'delivery' ? 5 : 0;
        const subtotal = dto.items.reduce((s, i) => s + i.price * i.qty, 0);
        const total = subtotal + fee;
        const paymentLabel = {
            pix: 'Pix',
            card: 'Cartão (MercadoPago)',
            cash: 'Dinheiro',
        };
        const itemLines = dto.items
            .map(i => {
            const obsNote = i.obs?.trim() ? `\n     ↳ ${i.obs.trim()}` : '';
            return `  ${i.qty}× ${i.name} — ${fmt(i.price * i.qty)}${obsNote}`;
        })
            .join('\n');
        const deliveryLine = dto.deliveryType === 'delivery'
            ? `🚗 *Entrega:* ${dto.address}\n   Taxa: ${fmt(fee)}`
            : '🏪 *Retirada no local*';
        const changeLine = dto.payment === 'cash' && dto.change
            ? `\n   Troco para: ${dto.change}`
            : '';
        return (`🍔 *NOVO PEDIDO — OxBread Burger*\n\n` +
            `👤 *Cliente:* ${dto.name}\n` +
            `📱 *Telefone:* ${dto.phone}\n` +
            `${deliveryLine}\n\n` +
            `🛒 *Itens:*\n${itemLines}\n\n` +
            `💳 *Pagamento:* ${paymentLabel[dto.payment]}${changeLine}\n\n` +
            `💰 *Total: ${fmt(total)}*`);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [zapi_service_1.ZapiService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map