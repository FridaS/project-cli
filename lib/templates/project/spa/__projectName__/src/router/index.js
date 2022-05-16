import Vue from 'vue';
import Router from 'vue-router';
import FullRouter from './fullRouter';

Vue.use(Router);

// 解决vue-router 3.0版本以上通过push、replace方法重复导航报错的问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

const router = new Router({
  mode: 'hash',
  routes: FullRouter,
});

export default router;
