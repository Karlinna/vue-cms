import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import http from './util/http'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import VueHead from 'vue-head'



Vue.config.productionTip = false;


Vue.use(VueToast)
Vue.use(http)
Vue.use(VueSidebarMenu)
Vue.use(VueHead)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
