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
exports.MetaOption = void 0;
const post_entity_1 = require("../posts/post.entity");
const typeorm_1 = require("typeorm");
let MetaOption = class MetaOption {
};
exports.MetaOption = MetaOption;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MetaOption.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'json',
        nullable: false,
    }),
    __metadata("design:type", String)
], MetaOption.prototype, "metaValue", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MetaOption.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MetaOption.prototype, "updateDate", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => post_entity_1.Post, (post) => post.metaOptions, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", post_entity_1.Post)
], MetaOption.prototype, "post", void 0);
exports.MetaOption = MetaOption = __decorate([
    (0, typeorm_1.Entity)()
], MetaOption);
//# sourceMappingURL=meta-option.entity.js.map