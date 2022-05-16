import Vue from 'vue';
import Router, { RawLocation, Route } from 'vue-router';
import FullRouter from './fullRouter';

Vue.use(Router);

type PromiseStyleRouterMethod = (location: RawLocation) => Promise<Route>

// 解决vue-router 3.0版本以上通过push、replace方法重复导航报错的问题
const originalPush = Router.prototype.push as PromiseStyleRouterMethod;
Router.prototype.push = async function push(location: RawLocation) {
  try {
    return await originalPush.call(this, location);
  } catch (err) {
    return err as any;
  }
};
const originalReplace = Router.prototype.replace as PromiseStyleRouterMethod;
Router.prototype.replace = async function replace(location: RawLocation) {
  try {
    return await originalReplace.call(this, location);
  } catch (err) {
    return err as any;
  }
};

const router = new Router({
  mode: 'hash',
  routes: FullRouter,
});

export default router;
