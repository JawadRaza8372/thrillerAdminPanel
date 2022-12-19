import Vue from "vue";
import DashboardPlugin from "./plugins/dashboard-plugin";
import App from "./App.vue";
import store from "./store/store";
import VueRouter from "vue-router";
import VueGrid from "@liqueflies/vue-flex-grid";

// router setup
import router from "./routes/router";
import JsonExcel from "vue-json-excel";
import "./registerServiceWorker";
// plugin setup
Vue.use(DashboardPlugin);
Vue.use(VueRouter);
Vue.use(VueGrid);
Vue.component("downloadExcel", JsonExcel);
/* eslint-disable no-new */
new Vue({
  store: store,
  el: "#app",
  render: (h) => h(App),
  router,
});

<style></style>;
