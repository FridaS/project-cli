import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.scss';
import '@/assets/css/element-variables.scss';
import vueCompositionApi, { createApp, h } from '@vue/composition-api';

Vue.config.productionTip = false;

Vue.use(ElementUI).use(vueCompositionApi);

const app = createApp({
  router,
  render: () => h(App),
});

app.mount('#app');
