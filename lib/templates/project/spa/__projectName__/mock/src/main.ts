import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import VueCompositionAPI, { createApp, h }  from '@vue/composition-api';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.scss';
import '@/assets/css/element-variables.scss';

Vue.config.productionTip = false;

Vue.use(ElementUI).use(VueCompositionAPI);

const app = createApp({
  router,
  store,
  render: () => h(App),
});

app.mount('#app');
