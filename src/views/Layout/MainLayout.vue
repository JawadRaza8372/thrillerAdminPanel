<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot-scope="props" slot="links">
        <!-- <sidebar-item v-for="item in menu" :key="item._id"  v-bind="fa_icon"  :link="{
                  name: item._name,
                  icon: fa_icons[item._id]               }">
          <sidebar-item v-for="sub in item.Forms" :key="sub.id" :link="{ name: sub.formName, path: '/' + sub.url }"/>         


        </sidebar-item> -->
      </template>

      <template slot="links-after">
        <ul class="navbar-nav mb-md-3">
          <li v-if="!this.isVetter" class="nav-item">
            <a class="nav-link" href="#/fusion/dashboard">
              <i class="fas fa-home"></i>
              <span class="nav-link-text">Dashboard</span>
            </a>
          </li>
          <li v-if="!this.isVetter" class="nav-item">
            <a class="nav-link" href="#/fusion/sellers">
              <i class="fas fa-user"></i>
              <span class="nav-link-text">Sellers</span>
            </a>
          </li>
          <li v-if="!this.isVetter" class="nav-item">
            <a class="nav-link" href="#/fusion/buyer">
              <i class="fas fa-user"></i>
              <span class="nav-link-text">Buyers</span>
            </a>
          </li>
          <li v-if="!this.isVetter" class="nav-item">
            <a class="nav-link" href="#/fusion/vetter">
              <i class="fas fa-user"></i>
              <span class="nav-link-text">Vetters</span>
            </a>
          </li>
          <li v-if="!this.isVetter" class="nav-item">
            <a class="nav-link" href="#/fusion/payouts">
              <i class="fas fa-user"></i>
              <span class="nav-link-text">Payouts</span>
            </a>
          </li>
          <li v-if="!this.isVetter" class="nav-item">
            <a class="nav-link" href="#/fusion/collections">
              <i class="fas fa-user"></i>
              <span class="nav-link-text">Collections</span>
            </a>
          </li>
          <!-- <li v-if="!this.isVetter" class="nav-item">
            <a class="nav-link" href="#/fusion/collectionsnew">
              <i class="fas fa-user"></i>
              <span class="nav-link-text">Collectionsnew</span>
            </a>
          </li> -->
          <li v-if="!this.isVetter" class="nav-item">
            <a class="nav-link" href="#/fusion/productss">
              <i class="fas fa-chart-bar"></i>
              <span class="nav-link-text">Products</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/fusion/orders">
              <i class="fas fa-chart-bar"></i>
              <span class="nav-link-text">Orders</span>
            </a>
          </li>
          <li v-if="!this.isVetter" class="nav-item">
            <a class="nav-link" href="#/fusion/exports">
              <i class="ni ni-collection"></i>
              <span class="nav-link-text">Reports</span>
            </a>
          </li>
          <li v-if="!this.isVetter" class="nav-item">
            <a class="nav-link" href="#/fusion/settings">
              <i class="fas fa-cog"></i>
              <span class="nav-link-text">Settings</span>
            </a>
          </li>
          <li v-if="!this.isVetter" class="nav-item">
            <a class="nav-link" href="#/fusion/styles">
              <i class="ni ni-image"></i>
              <span class="nav-link-text">Styles</span>
            </a>
          </li>
        </ul>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    FadeTransition,
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("scrollbar-inner");
      }
    },
  },
  data() {
    return {
      menu: this.$store.state.menu,
      isVetter: this.$store.state.isVetter,

      fa_icons: [
        "",
        "fas fa-home",
        "fas fa-dollar-sign",
        "fas fa-tools",
        "fas fa-tools",
        "far fa-file-alt",
        "fas fa-sms",
        "fas fa-user-circle",
        "fas fa-graduation-cap",
        "fas fa-graduation-cap",
        "fas fa-book",
        "fas fa-question-circle",
        "far fa-chart-bar",
        "fas fa-balance-scale",
      ],
    };
  },
  mounted() {
    this.initScrollbar();
  },
};
</script>
<style lang="scss"></style>
