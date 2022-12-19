<template>
  <div>
    <base-header class="pb-6"> </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-xl-8">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 text-white mb-0">Sales value</h5>
              </div>
              <div class="col">
                <ul class="nav nav-pills justify-content-end">
                  <li class="nav-item mr-2 mr-md-0">
                    <a
                      class="nav-link py-2 px-3"
                      href="#"
                      :class="{ active: bigLineChart.activeIndex === 0 }"
                      @click.prevent="initBigChart(0)"
                    >
                      <span class="d-none d-md-block">Month</span>
                      <span class="d-md-none">M</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link py-2 px-3"
                      href="#"
                      :class="{ active: bigLineChart.activeIndex === 1 }"
                      @click.prevent="initBigChart(1)"
                    >
                      <span class="d-none d-md-block">Week</span>
                      <span class="d-md-none">W</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <line-chart
              :height="350"
              ref="bigChart"
              :chart-data="bigLineChart.chartData"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </card>
        </div>

        <div class="col-xl-4">
          <card header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h5 class="h3 mb-0">Total orders</h5>
              </div>
            </div>

            <bar-chart
              :height="350"
              ref="barChart"
              :chart-data="redBarChart.chartData"
            >
            </bar-chart>
          </card>
        </div>
      </div>
      <!-- End charts-->

      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-md-6 cursor">
          <stats-card
            title="Total Revenue"
            type="gradient-green"
            sub-title=""
            icon="ni ni-chart-pie-35"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6 cursor">
          <stats-card
            title="Total Orders"
            type="gradient-green"
            sub-title=""
            icon="ni ni-money-coins"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6 cursor">
          <stats-card
            title="Pending Orders"
            type="gradient-green"
            sub-title=""
            icon="fas fa-user-tag"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6 cursor">
          <stats-card
            title="Total Profit"
            type="gradient-green"
            sub-title=""
            icon="ni ni-chart-bar-32"
          >
          </stats-card>
        </div>
      </div>

      <!--Lists-->
      <div class="row">
        <div class="col-xl-4">
          <card>
            <h5 class="h3 mb-0" slot="header">Recent Vendors</h5>

            <vendors-list></vendors-list>
          </card>
        </div>
        <div class="col-xl-4">
          <card>
            <h5 class="h3 mb-0" slot="header">Top Customers</h5>

            <top-vendors></top-vendors>
          </card>
        </div>
        <div class="col-xl-4">
          <card>
            <h5 class="h3 mb-0" slot="header">Top Vendors</h5>

            <top-vendors></top-vendors>
          </card>
        </div>
      </div>
      <!--End lists-->
    </div>
  </div>
</template>
<script>
// Charts
import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";

// Components
import BaseProgress from "@/components/BaseProgress";
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";

// Lists
import ActivityFeed from "./ActivityFeed";
import TaskList from "./TaskList";
import VendorsList from "./VendorsList";
import TopVendors from "./TopVendors";
import ProgressTrackList from "./ProgressTrackList";

// Tables
import LightTable from "./LightTable";
import SocialTrafficTable from "./SocialTrafficTable";
import PageVisitsTable from "./PageVisitsTable";

export default {
  components: {
    ActivityFeed,
    LineChart,
    BarChart,
    BaseProgress,
    RouteBreadCrumb,
    StatsCard,
    TaskList,
    PageVisitsTable,
    SocialTrafficTable,
    LightTable,
    VendorsList,
    ProgressTrackList,
    TopVendors,
  },
  created()
  {
     this.Authenticator();
  //this.$router.push("/login");
 
  },
  data() {
    return {
      bigLineChart: {
        allData: [
          [],
          [],
        ],
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: "Performance",
              data: [],
            },
          ],
          labels: [],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      redBarChart: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "Sales",
              data: [],
            },
          ],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
    };
  },
  methods: {
    Authenticator()
    {

     //console.log(this.$store.state.myUser.email , this.$store.state.myUser.password ); 
    if(this.$store.state.myUser.email == null || this.$store.state.myUser.password == null  ||  this.$store.state.myUser.email == "" || 
    this.$store.state.myUser.password == "" ) 
    {
     console.log("Hi If");
       this.$store.state.myUser.email = "";
       this.$store.state.myUser.password = "";  

      return  this.$router.push("/login");
    }
  
    },
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            label: "Performance",
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: [],
      };
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
  },
  mounted() {
     if(this.$store.state.myUser.email == null || this.$store.state.myUser.password == null  ||  this.$store.state.myUser.email == "" || 
    this.$store.state.myUser.password == "" ) 
    {
     console.log("Hi If");
       this.$store.state.myUser.email = "";
       this.$store.state.myUser.password = "";  

      return  this.$router.push("/login");
    }
  
 //this.router.push({ path: '/login' });
  //this.$router.push("/login");
 //console.log(this.$store.state.myUser);

    //  /console.log("Hi Osama From mounted");
    this.initBigChart(0);
  },
};
</script>
<style>
.cursor {
  cursor: pointer;
}
</style>
