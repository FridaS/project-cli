"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const element_ui_1 = require("element-ui");
const util_1 = require("@/utils/util");
axios_1.default.defaults.timeout = 50000;
// 请求失败重试次数
axios_1.default.defaults.retry = 1;
axios_1.default.defaults.retryDelay = 1000;
const pending = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken = axios_1.default.CancelToken;
const removePending = (config) => {
    const paramsStr = JSON.stringify(config.params);
    for (const p in pending) {
        if (pending[p].u === `${config.url}&${config.method}&${paramsStr}`) { // 当当前请求在数组中存在时执行函数体
            pending[p].f(); // 执行取消操作
            pending.splice(p, 1); // 把这条记录从数组中移除
        }
    }
};
// http request 拦截器
axios_1.default.interceptors.request.use((config) => {
    removePending(config); // 在下一ajax发送前执行一下取消操作
    const paramsStr = JSON.stringify(config.params) || JSON.stringify(config.data);
    config.cancelToken = new CancelToken((c) => {
        pending.push({ u: `${config.url}&${config.method}&${paramsStr}`, f: c });
    });
    config.headers['x-csrf-token'] = js_cookie_1.default.get('csrfToken');
    return config;
}, error => Promise.reject(error));
const STATUS_TIPS_TEXT_MAP = {
    500: '服务器错误，请稍后再试',
    504: '请求超时',
};
const loginUrl = '/#/login?redirect=';
const handleUnauthorized = () => {
    const redirect = (0, util_1.getUrlParams)(location.href, 'redirect');
    if (redirect) {
        return null;
    }
    const currentUrl = encodeURIComponent(location.href);
    const toUrl = redirect ? currentUrl : loginUrl + currentUrl;
    location.replace(toUrl);
};
// http response 拦截器
axios_1.default.interceptors.response.use((response = {}) => {
    const data = response.data;
    if ((response.config.params && response.config.params.originData) || (response.config.data && ((0, util_1.typeOf)(response.config.data) === 'string' || (0, util_1.typeOf)(response.config.data) === 'array') && response.config.data.indexOf('originData') > -1))
        return data;
    if (data.code < 0) {
        data.msg && element_ui_1.Message.error(data.msg);
        return Promise.reject({
            code: data.code,
            msg: data.msg,
            data: data.data,
        });
    }
    if (data.code == 401) {
        handleUnauthorized();
        return null;
    }
    if (data.code == 403) {
        element_ui_1.Message.error('没有权限');
        location.replace('/403');
        return Promise.reject({
            code: 403,
            msg: '没有权限',
        });
    }
    // 服务器超时
    if (data.code == 500 || data.code == 504) {
        element_ui_1.Message.error(STATUS_TIPS_TEXT_MAP[data.code] || '服务器链接错误');
        return Promise.reject({
            code: data.code,
            msg: data.msg,
        });
    }
    return data.data;
}, (error) => {
    if (error.response) {
        const status = error.response.status;
        if (status == 401) {
            handleUnauthorized();
        }
        else if (status == 403) {
            return Promise.reject({
                code: 403,
                msg: '没有权限',
            });
        }
        else {
            element_ui_1.Message.error(STATUS_TIPS_TEXT_MAP[status] || '请求失败');
        }
    }
    return Promise.reject(error);
});
exports.default = axios_1.default;
