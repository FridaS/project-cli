const Home = () => import('@pages/home');

const fullRouter = [{
  path: '/',
  name: 'home',
  component: Home,
}];

export default fullRouter;
