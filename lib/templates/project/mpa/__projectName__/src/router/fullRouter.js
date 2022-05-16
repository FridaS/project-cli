const Home = () => import('@components/home');
const Login = () => import('@components/login');
const Registry = () => import('@components/registry');
const ResetPassword = () => import('@components/resetPassword');

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
