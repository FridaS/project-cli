import axios, { AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';
import Cookies from 'js-cookie';
import { Message } from 'element-ui';
import { getUrlParams, typeOf } from '@/utils/util';

axios.defaults.timeout = 50000;
// 请求失败重试次数
// axios.defaults.retry = 1;
// axios.defaults.retryDelay = 1000;

// 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const pending : { u: string, f: Canceler }[] = []; 
const CancelToken = axios.CancelToken;
const removePending = (config: AxiosRequestConfig) => {
  const paramsStr = JSON.stringify(config.params);
  for (const p in pending) {
    // 当当前请求在数组中存在时执行函数体
    if (pending[p].u === `${config.url}&${config.method}&${paramsStr}`) { 
      pending[p].f(); // 执行取消操作
      pending.splice(Number(p), 1); // 把这条记录从数组中移除
    }
  }
};

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    removePending(config); // 在下一ajax发送前执行一下取消操作

    const paramsStr = JSON.stringify(config.params) 
      || JSON.stringify(config.data);
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
} as const;

// http response 拦截器
axios.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const data = response.data;
    if (
      response.config.params?.originData
      || (
        response.config.data 
        && (
          typeOf(response.config.data) === 'string' 
          || typeOf(response.config.data) === 'array'
        ) 
        && response.config.data.indexOf('originData') > -1
      )
    ) {
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
    if (Number(data.code) === 401) {
      handleUnauthorized();
      return null;
    }
    if (Number(data.code) === 403) {
      Message.error('没有权限');
      location.replace('/403');
      return Promise.reject({
        code: 403,
        msg: '没有权限',
      });
    }
    // 服务器超时
    if (Number(data.code) === 500 || Number(data.code) === 504) {
      Message.error(STATUS_TIPS_TEXT_MAP[data.code as 500 | 504]);
      return Promise.reject({
        code: data.code,
        msg: data.msg,
      });
    }

    return data.data;
  }, (error) => {
    if (error.response) {
      const status = error.response.status;
      if (Number(status) === 401) {
        handleUnauthorized();
      } else if (Number(status) === 403) {
        return Promise.reject({
          code: 403,
          msg: '没有权限',
        });
      } else {
        Message.error(STATUS_TIPS_TEXT_MAP[status as 500 | 504] || '请求失败');
      }
    }
    return Promise.reject(error);
  },
);

export default axios;

const loginUrl = '/#/login?redirect=';
function handleUnauthorized() {
  const redirect = getUrlParams(location.href, 'redirect');
  if (redirect) {
    return null;
  }
  const currentUrl = encodeURIComponent(location.href);
  const toUrl = redirect ? currentUrl : loginUrl + currentUrl;
  location.replace(toUrl);
}
