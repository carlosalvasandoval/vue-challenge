import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
export const EventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
