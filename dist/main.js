"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const app_create_1 = require("./app.create");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, app_create_1.appCreate)(app);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map