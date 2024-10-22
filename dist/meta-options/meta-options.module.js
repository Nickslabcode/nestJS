"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaOptionsModule = void 0;
const common_1 = require("@nestjs/common");
const meta_options_controller_1 = require("./meta-options.controller");
const meta_option_entity_1 = require("./meta-option.entity");
const typeorm_1 = require("@nestjs/typeorm");
const meta_options_service_1 = require("./providers/meta-options.service");
let MetaOptionsModule = class MetaOptionsModule {
};
exports.MetaOptionsModule = MetaOptionsModule;
exports.MetaOptionsModule = MetaOptionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [meta_options_controller_1.MetaOptionsController],
        providers: [meta_options_service_1.MetaOptionsService],
        imports: [typeorm_1.TypeOrmModule.forFeature([meta_option_entity_1.MetaOption])],
    })
], MetaOptionsModule);
//# sourceMappingURL=meta-options.module.js.map