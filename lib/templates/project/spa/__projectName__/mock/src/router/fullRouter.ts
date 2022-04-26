const Home = () => import('@pages/home.vue');
const TestOne = () => import('@pages/test.vue');
const TestTwo = () => import('@pages/test2.vue');

const fullRouter = [{
  path: '/',
  name: 'home',
  component: Home,
  children: [
    { path: '/a-test', name: 'aTest', component: TestOne },
    { path: '/b-test', name: 'bTest', component: TestTwo },
  ],
}];

export default fullRouter;
