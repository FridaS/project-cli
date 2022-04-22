"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const vue_router_1 = __importDefault(require("vue-router"));
const fullRouter_1 = __importDefault(require("./fullRouter"));
vue_1.default.use(vue_router_1.default);
// 解决vue-router 3.0版本以上通过push、replace方法重复导航报错的问题
const originalPush = vue_router_1.default.prototype.push;
vue_router_1.default.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
const originalReplace = vue_router_1.default.prototype.replace;
vue_router_1.default.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
const router = new vue_router_1.default({
    mode: 'hash',
    routes: fullRouter_1.default,
});
exports.default = router;
