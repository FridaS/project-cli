import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import vueCompositionApi, { createApp, h } from '@vue/composition-api';
import 'element-ui/lib/theme-chalk/index.css';
import '@{{{moduleName}}}/assets/css/index.scss';

Vue.config.productionTip = false;

Vue.config.productionTip = false;

Vue.use(ElementUI).use(vueCompositionApi);

const app = createApp({
  router,
  render: () => h(App),
});

app.mount('#app');
