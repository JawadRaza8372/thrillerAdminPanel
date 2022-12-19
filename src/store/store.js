import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "vuex", // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
});

export default new Vuex.Store({
  strict: false,
  plugins: [vuexLocalStorage.plugin],
  state: {
    // userData: {
    //   userID: 4,
    //   username: "",
    //   password: "",
    //   rememberMe: false,
    //   isLoggedIn: false,
    //   userType: 0,
    // },
    myUser: {
      userId: 0,
      email: "",
      password: "",
      role: false,
      
    },
    campusID: 0,
    // domain: "https://heaven.appick.io",
    domain: "https://api.thrillerme.com",
    local: "http://localhost:3011",
    mail: "https://mail-dot-graphic-jet-323418.el.r.appspot.com",
    upload: "https://upload.appick.io",
    quiqup: "https://api-ae.quiqup.com/order_label/",
    // quiqup: "https://api.staging.quiqup.com/order_label/",
    db: "okaaik",
    sID: 0,
    tID: 2,
    cID: 1,
    uID: 4,
    clientID: 0,
    userType: 0,
    localID: 0,
    register: false,
    timout: 4000,
    menu: [],
    campusOptions: [],
    selectedCampus: "",
    campusLoaded: false,
    isLoggedIn: false,
    isVetter: true,
    cmbClass: {},
    cmbSec: {},
    cmdFac: {},
    cmbSession: {},
    cmbMonth: {},
    cmbYear: {},
    cmbPaymode: {},

    usersData: {},
  },
  getters: {
    status: (state) => state.status,
  },
  mutations: {
    updateQuiqup(state, status) {
      Vue.set(state, "quiqup", status);
    },
    isVetter(state, status) {
      Vue.set(state, "isVetter", status);
    },
    isLoggedIn(state, status) {
      Vue.set(state, "isLoggedIn", status);
    },
    updateUsersData(state, status) {
      Vue.set(state, "usersData", status);
    },
    updateMyUsersData(state, status) {
      Vue.set(state, "myUser", status);
    },
    updateStatus(state, status) {
      Vue.set(state, "status", status);
    },
    selectedCampus(state, value) {
      Vue.set(state, "selectedCampus", value);
    },
    cID(state, value) {
      Vue.set(state, "cID", value);
    },
    campusLoaded(state, value) {
      Vue.set(state, "campusLoaded", value);
    },
    register(state, value) {
      Vue.set(state, "register", value);
    },
    sID(state, value) {
      Vue.set(state, "sID", value);
    },
    domain(state, value) {
      Vue.set(state, "domain", value);
    },
    uID(state, value) {
      Vue.set(state, "uID", value);
    },
    clientID(state, value) {
      Vue.set(state, "clientID", value);
    },
    userType(state, value) {
      Vue.set(state, "userType", value);
    },
    localID(state, value) {
      Vue.set(state, "localID", value);
    },
    tID(state, value) {
      Vue.set(state, "tID", value);
    },
    db(state, value) {
      Vue.set(state, "db", value);
    },

    cmbClass(state, value) {
      Vue.set(state, "cmbClass", value);
    },
    cmbSec(state, value) {
      Vue.set(state, "cmbSec", value);
    },
    cmbFac(state, value) {
      Vue.set(state, "cmbFac", value);
    },
    cmbSession(state, value) {
      Vue.set(state, "cmbSession", value);
    },
    cmbMonth(state, value) {
      Vue.set(state, "cmbMonth", value);
    },
    cmbYear(state, value) {
      Vue.set(state, "cmbYear", value);
    },
    cmbPaymode(state, value) {
      Vue.set(state, "cmbPaymode", value);
    },
  },
});
