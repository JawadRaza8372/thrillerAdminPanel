<template>
  <div>
    <base-header class="pb-6"> </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">
      <div class="row">
        <card
          class="no-border-card"
          body-classes="px-0 pb-1"
          footer-classes="pb-2"
          style="margin-left: 320px"
        >
          <div class="col-xl-12 row justify-content-md-center">
            <img
              src="https://appick.io/u/okaaik/msgs.jpg"
              style="border-radius: 20px; width: 50vw; margin-left: 50px"
            />
          </div>
        </card>
      </div>
      <!-- End charts-->
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
    this.initBigChart(0);
  },
};
</script>
<style>
.cursor {
  cursor: pointer;
}
</style>
