"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const DATA_PATH = (0, path_1.join)(__dirname, '../../data/products.json');
let ProductsService = class ProductsService {
    read() {
        return JSON.parse((0, fs_1.readFileSync)(DATA_PATH, 'utf-8'));
    }
    write(items) {
        (0, fs_1.writeFileSync)(DATA_PATH, JSON.stringify(items, null, 2), 'utf-8');
    }
    findAll() {
        return this.read();
    }
    create(dto) {
        const items = this.read();
        const id = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
        const item = { id, popular: false, ...dto };
        this.write([...items, item]);
        return item;
    }
    update(id, dto) {
        const items = this.read();
        const idx = items.findIndex(i => i.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException('Produto não encontrado');
        items[idx] = { ...items[idx], ...dto };
        this.write(items);
        return items[idx];
    }
    remove(id) {
        const items = this.read();
        const filtered = items.filter(i => i.id !== id);
        if (filtered.length === items.length)
            throw new common_1.NotFoundException('Produto não encontrado');
        this.write(filtered);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map