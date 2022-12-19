import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import MainLayout from "@/views/Layout/MainLayout.vue";
import AuthLayout from "@/views/Pages/AuthLayout.vue";
// GeneralViews
import NotFound from "@/views/GeneralViews/NotFoundPage.vue";

// Pages
const Main = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard/Main.vue");

const Dash = () =>
  import(
    /* webpackChunkName: "dashboard" */ "@/views/Dashboard/Dashboard-T.vue"
  );

const MainAdmin = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard/MainAdmin.vue");

const Login = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Login.vue");
const Home = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Home.vue");
const Register = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Register.vue");
const Lock = () =>
  import(/* webpackChunkName: "pages" */ "@/views/Pages/Lock.vue");

//myApp
const Clients = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Heaven/Clients.vue");

//myApp
const vetter = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Heaven/Vetters.vue");
//myApp
const payouts = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Heaven/Payouts.vue");
  const styles = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Heaven/Styles.vue");

const buyers = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Heaven/Buyerss.vue");

const orders = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Heaven/Orders.vue");

const settings = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Heaven/Settings.vue");
const exports = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Heaven/Exports.vue");

const collections = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Heaven/Collection.vue");

const collectionsnew = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Heaven/Collection2.vue");

const productss = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Heaven/Productss.vue");

const Sales = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Heaven/Sales.vue");

const Sellers = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Heaven/Sellers.vue");

const Reports = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard/Reports.vue");

const Messages = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard/Messages.vue");

let myMenu = {
  path: "/fusion",
  component: MainLayout,
  name: "fusion",
  redirect: "/fusion/dashboard",
  children: [
    {
      path: "dashboard",
      name: "fusiondashboard",
      component: Dash,
    },
    {
      path: "admin",
      name: "fusiondashboard",
      component: MainAdmin,
    },
    {
      path: "collections",
      name: "collections",
      component: collections,
    },
    {
      path: "collectionsnew",
      name: "collectionsnew",
      component: collectionsnew,
    },
    {
      path: "sellers",
      name: "sellers",
      component: Sellers,
    },
    {
      path: "vetter",
      name: "vetter",
      component: vetter,
    },
    {
      path: "payouts",
      name: "payouts",
      component: payouts,
    },
    {
      path: "buyer",
      name: "buyer",
      component: buyers,
    },
    {
      path: "styles",
      name: "styles",
      component: styles,
    },
    
    {
      path: "productss",
      name: "productss",
      component: productss,
    },
    {
      path: "sales",
      name: "Sales",
      component: Sales,
    },
    {
      path: "orders",
      name: "orders",
      component: orders,
    },
    {
      path: "settings",
      name: "settings",
      component: settings,
    },
    {
      path: "exports",
      name: "exports",
      component: exports,
    },
    {
      path: "reports",
      name: "reports",
      component: Reports,
    },
    {
      path: "messages",
      name: "messages",
      component: Messages,
    },
  ],
};

let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    // {
    //   path: "/home",
    //   name: "Home",
    //   component: Home,
    //   meta: {
    //     noBodyBackground: true,
    //   },
    // },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    // {
    //   path: "/register",
    //   name: "Register",
    //   component: Register,
    // },
    // {
    //   path: "/lock",
    //   name: "Lock",
    //   component: Lock,
    // },
    { path: "*", name: "404", component: NotFound },
  ],
};

const routes = [
  {
    path: "/",
    redirect: "/login",
    name: "Home",
  },
  myMenu,
  authPages,
];

export default routes;
