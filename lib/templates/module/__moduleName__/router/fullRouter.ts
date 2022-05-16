const Home = () => import('@{{{moduleName}}}/pages/home.vue');
const Test = () => import('@{{{moduleName}}}/pages/test.vue');
const Test2 = () => import('@{{{moduleName}}}/pages/test2,vue');

const fullRouter = [{
  path: '/',
  name: 'home',
  redirect: '/a-test',
  component: Home,
  children: [{
    path: '/a-test',
    name: 'aTest',
    component: Test,
  }, {
    path: '/b-test',
    name: 'bTest',
    component: Test2,
  }],
}];

export default fullRouter;
