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
            title="Total Traffic"
            type="gradient-red"
            sub-title="Total user's visits"
            icon="fas fa-user-tag"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 3.48%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6 cursor">
          <stats-card
            title="Sales"
            type="gradient-orange"
            sub-title="Total sales"
            icon="ni ni-chart-pie-35"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 12.18%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6 cursor">
          <stats-card
            title="Order"
            type="gradient-green"
            sub-title="Total orders"
            icon="ni ni-money-coins"
          >
            <template slot="footer">
              <span class="text-danger mr-2"
                ><i class="fa fa-arrow-down"></i> 5.72%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6 cursor">
          <stats-card
            title="Leaderboard"
            type="gradient-info"
            sub-title="Ranked # 03"
            icon="ni ni-chart-bar-32"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i
              ></span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
      </div>

      <!--Lists-->
      <div class="row">
        <div class="col-xl-4">
          <card>
            <h5 class="h3 mb-0" slot="header">New Orders</h5>

            <user-list></user-list>
          </card>
        </div>

        <div class="col-xl-4">
          <card>
            <h5 class="h3 mb-0" slot="header">To do list</h5>

            <task-list></task-list>
          </card>
        </div>

        <div class="col-xl-4">
          <card gradient="default" no-body="">
            <div class="card-body">
              <div class="mb-2">
                <sup class="text-white">AED</sup>
                <span class="h2 text-white"> 13,300</span>
                <div class="text-light mt-2 text-sm">Your current balance</div>
                <div>
                  <span class="text-success font-weight-600">+ 15%</span>
                  <span class="text-light"> (AED 2250)</span>
                </div>
              </div>
              <button class="btn btn-sm btn-block btn-neutral">
                Request Payout
              </button>
            </div>

            <div class="card-body">
              <div class="row">
                <div class="col">
                  <small class="text-light">Orders: 60%</small>
                  <base-progress
                    :value="60"
                    size="xs"
                    progress-classes="my-2"
                    type="success"
                  />
                </div>
                <div class="col">
                  <small class="text-light">Sales: 40%</small>
                  <base-progress
                    :value="40"
                    size="xs"
                    progress-classes="my-2"
                    type="warning"
                  />
                </div>
              </div>
            </div>
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
import UserList from "./UserList";
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
    UserList,
    ProgressTrackList,
  },
  created()
  {
console.log("Hi Osama From created");
  },
  data() {
    return {
      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40],
        ],
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: "Performance",
              data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
            },
          ],
          labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      redBarChart: {
        chartData: {
          labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Sales",
              data: [25, 20, 30, 22, 17, 29],
            },
          ],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
    };
  },
  methods: {
    initBigChart(index) {
    
console.log("Hi Osama From mounted");

      let chartData = {
        datasets: [
          {
            label: "Performance",
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      };
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
  },
  mounted() {
  this.Authenticator();
   this.initBigChart(0);
  },
};
</script>
<style>
.cursor {
  cursor: pointer;
}
</style>
