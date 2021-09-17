const Home = () => import('@pages/home')

let fullRouter = [{
    path: '/',
    name: 'home',
    component: Home
}]

export default fullRouter