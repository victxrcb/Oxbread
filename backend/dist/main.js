"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:5173', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '../uploads'), { prefix: '/uploads' });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const port = process.env.PORT ?? 3001;
    await app.listen(port);
    console.log(`OxBread Backend rodando na porta ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map