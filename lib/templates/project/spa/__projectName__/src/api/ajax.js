import axios from 'axios';
import Cookies from 'js-cookie';
import { Message } from 'element-ui';
import { getUrlParams, typeOf } from '@/utils/util';

axios.defaults.timeout = 50000;
// 请求失败重试次数
axios.defaults.retry = 1;
axios.defaults.retryDelay = 1000;

const pending = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken = axios.CancelToken;
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
axios.interceptors.request.use(
  (config) => {
    removePending(config); // 在下一ajax发送前执行一下取消操作

    const paramsStr = JSON.stringify(config.params) || JSON.stringify(config.data);
    config.cancelToken = new CancelToken((c) => {
      pending.push({ u: `${config.url}&${config.method}&${paramsStr}`, f: c });
    });
    config.headers['x-csrf-token'] = Cookies.get('csrfToken');

    return config;
  },
  error => Promise.reject(error),
);

const STATUS_TIPS_TEXT_MAP = {
  500: '服务器错误，请稍后再试',
  504: '请求超时',
};

const loginUrl = '/#/login?redirect=';

const handleUnauthorized = () => {
  const redirect = getUrlParams(location.href, 'redirect');
  if (redirect) {
    return null;
  }
  const currentUrl = encodeURIComponent(location.href);
  const toUrl = redirect ? currentUrl : loginUrl + currentUrl;
  location.replace(toUrl);
};

// http response 拦截器
axios.interceptors.response.use(
  (response = {}) => {
    const data = response.data;
    if ((response.config.params && response.config.params.originData) || (response.config.data && (typeOf(response.config.data) === 'string' || typeOf(response.config.data) === 'array') && response.config.data.indexOf('originData') > -1)) {
      return data;
    }

    if (data.code < 0) {
      data.msg && Message.error(data.msg);

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
      Message.error('没有权限');
      location.replace('/403');
      return Promise.reject({
        code: 403,
        msg: '没有权限',
      });
    }
    // 服务器超时
    if (data.code == 500 || data.code == 504) {
      Message.error(STATUS_TIPS_TEXT_MAP[data.code] || '服务器链接错误');
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
      } else if (status == 403) {
        return Promise.reject({
          code: 403,
          msg: '没有权限',
        });
      } else {
        Message.error(STATUS_TIPS_TEXT_MAP[status] || '请求失败');
      }
    }
    return Promise.reject(error);
  },
);

export default axios;
