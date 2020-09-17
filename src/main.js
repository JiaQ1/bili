import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import http from '../http.js'
import { Toast } from 'vant';
//可以在任意组件使用
Vue.prototype.$http=http;
Vue.prototype.$msg=Toast;
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
