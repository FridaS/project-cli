const Home = () => import('@components/home.vue');
const Login = () => import('@components/login.vue');
const Registry = () => import('@components/registry.vue');
const ResetPassword = () => import('@components/resetPassword.vue');

const fullRouter = [{
  path: '/',
  name: 'home',
  component: Home,
}, {
  path: '/login',
  name: 'login',
  component: Login,
}, {
  path: '/registry',
  name: 'registry',
  component: Registry,
}, {
  path: '/resetPassword',
  name: 'resetPassword',
  component: ResetPassword,
}];

export default fullRouter;
