import { createApp, h } from '@vue/composition-api';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

const app = createApp({
  render: () => h(App),
});

app.mount('#app');
