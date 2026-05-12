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
var ZapiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZapiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let ZapiService = ZapiService_1 = class ZapiService {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(ZapiService_1.name);
        const instanceId = config.getOrThrow('ZAPI_INSTANCE_ID');
        const token = config.getOrThrow('ZAPI_TOKEN');
        this.clientToken = config.getOrThrow('ZAPI_CLIENT_TOKEN');
        this.restaurantPhone = config.getOrThrow('RESTAURANT_PHONE');
        this.baseUrl = `https://api.z-api.io/instances/${instanceId}/token/${token}`;
    }
    async sendText(message) {
        try {
            await axios_1.default.post(`${this.baseUrl}/send-text`, { phone: this.restaurantPhone, message }, { headers: { 'Client-Token': this.clientToken } });
        }
        catch (err) {
            this.logger.error('Z-API error', err?.response?.data ?? err.message);
            throw new common_1.InternalServerErrorException('Falha ao enviar mensagem via WhatsApp');
        }
    }
};
exports.ZapiService = ZapiService;
exports.ZapiService = ZapiService = ZapiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ZapiService);
//# sourceMappingURL=zapi.service.js.map