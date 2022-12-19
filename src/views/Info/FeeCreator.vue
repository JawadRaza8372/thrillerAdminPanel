<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Fee Creator</h6>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div>
        <card
          class="no-border-card"
          body-classes="px-0 pb-1"
          footer-classes="pb-2"
        >
          <template slot="header"> </template>
          <div>
            <div
              class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
              <div class="row">
                <div class="col-md-2">
                  <base-input label="Class">
                    <multiselect
                      placeholder="Select class"
                      v-model="cmbClass.value"
                      :options="cmbClass.data"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :hide-selected="false"
                      :preserve-search="true"
                      label="name"
                      track-by="name"
                      :preselect-first="true"
                      @select="loadSec"
                      id="cmbClass"
                    >
                    </multiselect>
                  </base-input>
                </div>
                <div class="col-md-2">
                  <base-input label="Section">
                    <multiselect
                      placeholder="Select Section"
                      v-model="cmbSection.value"
                      :options="cmbSection.data"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :hide-selected="false"
                      :preserve-search="true"
                      :disabled="allCls"
                      label="name"
                      track-by="name"
                      :preselect-first="true"
                      id="cmbSection"
                    >
                    </multiselect>
                  </base-input>
                </div>
                <div class="col-md-2">
                  <base-input label="Faculty">
                    <multiselect
                      placeholder="Select faculty"
                      v-model="cmbFaculty.value"
                      :options="cmbFaculty.data"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :hide-selected="false"
                      :preserve-search="true"
                      label="name"
                      track-by="name"
                      :preselect-first="true"
                      @select="UpdateValue"
                      id="cmbFaculty"
                    >
                    </multiselect>
                  </base-input>
                </div>
                <div class="col-md-2">
                  <base-input label="Fee Type">
                    <multiselect
                      placeholder="Select fee type"
                      v-model="cmbFeeType.value"
                      :options="cmbFeeType.data"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :hide-selected="false"
                      :preserve-search="true"
                      label="name"
                      track-by="name"
                      :preselect-first="true"
                      @select="UpdateValue"
                      id="cmbFeeType"
                    >
                    </multiselect>
                  </base-input>
                </div>
                <div class="col-md-2">
                  <base-input label="Session">
                    <multiselect
                      placeholder="Select session"
                      v-model="cmbSession.value"
                      :options="cmbSession.data"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :hide-selected="false"
                      :preserve-search="true"
                      label="name"
                      track-by="name"
                      :preselect-first="true"
                      @select="UpdateValue"
                      id="cmbSession"
                    >
                    </multiselect>
                  </base-input>
                </div>
                <div class="col-md-2">
                  <base-input label="Pay Mode">
                    <multiselect
                      placeholder="Select pay mode"
                      v-model="cmbPayMode.value"
                      :options="cmbPayMode.data"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :hide-selected="false"
                      :preserve-search="true"
                      label="name"
                      track-by="name"
                      :preselect-first="true"
                      @select="UpdateValue"
                      id="cmbPayMode"
                    >
                    </multiselect>
                  </base-input>
                </div>

                <div class="col-md-2">
                  <base-input label="Month">
                    <multiselect
                      placeholder="Select month"
                      v-model="cmbMonth.value"
                      :options="cmbMonth.data"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :hide-selected="false"
                      :preserve-search="true"
                      label="name"
                      track-by="name"
                      :preselect-first="true"
                      @select="UpdateValue"
                      id="cmbMonth"
                    >
                    </multiselect>
                  </base-input>
                </div>
                <div class="col-md-2">
                  <base-input label="Year">
                    <multiselect
                      placeholder="Select year"
                      v-model="cmbYear.value"
                      :options="cmbYear.data"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :hide-selected="false"
                      :preserve-search="true"
                      label="name"
                      track-by="name"
                      :preselect-first="true"
                      @select="UpdateValue"
                      id="cmbYear"
                    >
                    </multiselect>
                  </base-input>
                </div>

                <div class="col-md-2">
                  <base-input label="Generated On">
                    <flat-picker
                      slot-scope="{ focus, blur }"
                      aria-placeholder="Select Date"
                      @on-open="focus"
                      @on-close="blur"
                      :config="{ allowInput: true }"
                      class="form-control datepicker"
                      v-model="myObj.generatedOn"
                    >
                    </flat-picker>
                  </base-input>
                </div>

                <div class="col-md-2" style="margin-top: 30px">
                  <base-button
                    type="primary"
                    :disabled="saving"
                    @click="CreateFees()"
                    ><i v-bind:class="signF"></i> {{ optionF }}
                  </base-button>
                </div>

                <div class="col-md-2" style="margin-top: 30px">
                  <base-button
                    type="danger"
                    :disabled="removing"
                    @click="RemoveFees()"
                  >
                    <i v-bind:class="signR"></i> {{ optionR }}</base-button
                  >
                </div>
              </div>
            </div>
          </div>
        </card>

        <div class="row">
          <div class="col-xl-6">
            <card>
              <template slot="header">
                <!-- Title -->
                <h5 class="h3 mb-0">Tuition Fee Collection</h5>
              </template>
              <div v-show="!barLoad">
                <div class="loader"></div>
              </div>
              <div class="chart">
                <bar-chart
                  v-model="ordersChart.chartData"
                  :chart-data="ordersChart.chartData"
                  :height="350"
                />
              </div>
            </card>
          </div>

          <div class="col-xl-6">
            <card>
              <template slot="header">
                <!-- Title -->
                <h5 class="h3 mb-0">Current Month</h5>
              </template>
              <div v-show="!pieLoad">
                <div class="loader"></div>
              </div>
              <div class="chart">
                <pie-chart
                  :height="350"
                  :chart-data="pieChart.chartData"
                  :extra-options="pieChart.extraOptions"
                >
                </pie-chart>
              </div>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn, Select, Option } from "element-ui";
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import { BasePagination } from "@/components";
import clientPaginationMixin from "../Tables/PaginatedTables/clientPaginationMixin";
import swal from "sweetalert2";
import axios from "axios";
import qs from "qs";
import Vue from "vue";
import Multiselect from "vue-multiselect";
import moment from "moment";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import PieChart from "@/components/Charts/PieChart";
import { Charts } from "@/components/Charts/config";

import DoughnutChart from "@/components/Charts/DoughnutChart";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import StatsCard from "@/components/Cards/StatsCard";
import * as chartConfigs from "@/components/Charts/config";

function randomScalingFactor() {
  return Math.round(Math.random() * 100);
}

export default {
  mixins: [clientPaginationMixin],
  components: {
    DoughnutChart,
    LineChart,
    BarChart,

    StatsCard,
    PieChart,

    flatPicker,
    Multiselect,
    BasePagination,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  created() {
    this.FillDropdowns();

    this.$store.commit("cmbSec", {});
    if (this.$store.state.cmbClass.id !== undefined)
      this.cmbClass.value = this.$store.state.cmbClass;

    if (this.$store.state.cmbSec.id !== undefined)
      this.cmbSection.value = this.$store.state.cmbSec;

    if (this.$store.state.cmbFac.id !== undefined)
      this.cmbFaculty.value = this.$store.state.cmbFac;

    if (this.$store.state.cmbSession.id !== undefined)
      this.cmbSession.value = this.$store.state.cmbSession;

    if (this.$store.state.cmbMonth.id !== undefined)
      this.cmbMonth.value = this.$store.state.cmbMonth;

    if (this.$store.state.cmbYear.id !== undefined)
      this.cmbYear.value = this.$store.state.cmbYear;

    if (this.$store.state.cmbPaymode.id !== undefined)
      this.cmbPayMode.value = this.$store.state.cmbPaymode;
  },
  data() {
    return {
      cmbMonth: {
        value: { id: 1, name: "Jan" },
        data: [
          { id: 1, name: "Jan" },
          { id: 2, name: "Feb" },
          { id: 3, name: "Mar" },
          { id: 4, name: "Apr" },
          { id: 5, name: "May" },
          { id: 6, name: "Jun" },
          { id: 7, name: "Jul" },
          { id: 8, name: "Aug" },
          { id: 9, name: "Sep" },
          { id: 10, name: "Oct" },
          { id: 11, name: "Nov" },
          { id: 12, name: "Dec" },
        ],
      },

      cmbYear: {
        value: { id: 2, name: 2020 },
        data: [
          { id: 0, name: 2018 },
          { id: 1, name: 2019 },
          { id: 2, name: 2020 },
          { id: 3, name: 2021 },
          { id: 4, name: 2022 },
          { id: 5, name: 2023 },
          { id: 6, name: 2024 },
          { id: 7, name: 2025 },
          { id: 8, name: 2026 },
          { id: 9, name: 2027 },
          { id: 10, name: 2028 },
          { id: 11, name: 2029 },
          { id: 11, name: 2030 },
        ],
      },

      ordersChart: {
        chartData: {
          datasets: [
            {
              data: [],
              label: "T/F Collection",
            },
          ],
          labels: [],
        },
      },
      pieChart: {
        chartData: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [
                Charts.colors.theme["warning"],
                Charts.colors.theme["success"],
              ],
              label: ["Dataset 1", "Dataset 2"],
            },
          ],
        },
        extraOptions: {
          responsive: true,
          legend: {
            position: "bottom",
            display: true,
          },
          animation: {
            animateScale: true,
            animateRotate: true,
          },
        },
      },

      cmbClass: {
        value: { id: 0, name: "All" },
        data: [{ id: 0, name: "All" }],
      },
      cmbSection: {
        value: { id: 0, name: "All" },
        data: [{ id: 0, name: "All" }],
      },
      cmbFaculty: {
        value: { id: 0, name: "All" },
        data: [{ id: 0, name: "All" }],
      },
      cmbFeeType: {
        value: null,
        data: [],
      },
      cmbSession: {
        value: null,
        data: [],
      },
      cmbPayMode: {
        value: { id: 1, name: "Monthly" },
        data: [
          { id: 1, name: "Monthly" },
          { id: 2, name: "Bi-monthly" },
          { id: 3, name: "Quaterly" },
          { id: 4, name: "Bi-Annually" },
          { id: 5, name: "Annually" },
        ],
      },

      myObj: {
        clsID: null,
        sec: null,
        faculty: null,
        feeType: null,
        session: null,
        payMode: null,
        month: null,
        year: null,
        generatedOn: null,
      },
      allCls: true,
      selectedRows: [],
      modals: {
        showModal: false,
      },
      optionF: "Create Fees",
      name: "",
      prefixname: "",
      prefixError: false,
      nameError: false,
      signF: "",
      saving: false,
      pieLoad: null,
      barLoad: null,
      removing: false,
      optionR: "Remove Fees",
      signR: "",
    };
  },
  methods: {
    LoadCharts() {
      //Load Collection Charts
      this.barLoad = false;
      var url =
        this.$store.state.domain +
        "/FeeCreator?_db=" +
        this.$store.state.db +
        "&cID=" +
        this.$store.state.cID;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log("Error on getting Chart Data: ", response.data);
          } else {
            var i = 0;
            //console.log.log(response.data.data);
            this.ordersChart.chartData = {
              labels: [],
              datasets: [
                {
                  data: [],
                  label: "T/F Collection",
                },
              ],
            };
            response.data.data.forEach((element) => {
              this.ordersChart.chartData.labels.push(element.month);
              this.ordersChart.chartData.datasets[0].data.push(
                element.collection
              );
              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log("Server Error on getting Class: ", error);
        })
        .finally(() => {
          this.barLoad = true;
        });

      //Load Current Chart
      this.pieLoad = false;
      var url =
        this.$store.state.domain +
        "/FeeCreator/CurrentChart?_db=" +
        this.$store.state.db +
        "&cID=" +
        this.$store.state.cID;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log("Error on getting Chart Data: ", response.data);
          } else {
            this.pieChart.chartData = {
              labels: [],
              datasets: [
                {
                  data: [],
                  backgroundColor: [
                    Charts.colors.theme["success"],
                    Charts.colors.theme["warning"],
                  ],
                  label: ["Dataset 1", "Dataset 2"],
                },
              ],
            };

            this.pieChart.chartData.labels.push(
              "Received : " + response.data.data
            );
            this.pieChart.chartData.labels.push(
              "Balance : " + response.data.message
            );
            this.pieChart.chartData.datasets[0].data.push(response.data.data);
            this.pieChart.chartData.datasets[0].data.push(
              response.data.message
            );

            this.pieChart.extraOptions = {
              responsive: true,
              legend: {
                position: "bottom",
                display: true,
              },
              animation: {
                animateScale: true,
                animateRotate: true,
              },
            };
          }
        })
        .catch(function (error) {
          //console.log.log("Server Error on getting Class: ", error);
        })
        .finally(() => {
          this.pieLoad = true;
        });
    },
    FillDropdowns() {
      this.LoadCharts();

      //Classes
      var url =
        this.$store.state.domain +
        "/ClassandSectionInfo?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log("Error on getting Class: ", response.data);
          } else {
            response.data.data.forEach((element) => {
              this.cmbClass.data.push({ id: element.id, name: element.Class });
            });
          }
        })
        .catch(function (error) {
          //console.log.log("Server Error on getting Class: ", error);
        });

      //Faculty
      var url =
        this.$store.state.domain +
        "/Faculty?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log("Error on getting Faculty: ", response.data);
          } else {
            var i = 0;

            response.data.data.forEach((element) => {
              this.cmbFaculty.data.push({
                id: element.id,
                name: element.faculty,
              });
            });
          }
        })
        .catch(function (error) {
          //console.log.log("Server Error on getting Faculty: ", error);
        });

      //FeeType
      var url =
        this.$store.state.domain +
        "/FeeType?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log("Error on getting Fees Type: ", response.data);
          } else {
            var i = 0;
            response.data.data.forEach((element) => {
              this.cmbFeeType.data.push({
                id: element.id,
                name: element.FeeType,
              });
              if (i === 0) {
                this.cmbFeeType.value = {
                  id: element.id,
                  name: element.FeeType,
                };
              }
              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log("Server Error on getting Fees type: ", error);
        });

      //Session
      var url =
        this.$store.state.domain +
        "/Session?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log("Error on getting Session: ", response.data);
          } else {
            var i = 0;
            response.data.data.forEach((element) => {
              this.cmbSession.data.push({
                id: element.id,
                name: element.session,
              });
              if (i === 0) {
                this.cmbSession.value = {
                  id: element.id,
                  name: element.session,
                };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log("Server Error on getting Session: ", error);
        });
    },

    loadSec(option, id) {
      if (cmbClass.value === { id: 0, name: "All" }) {
        this.allCls = true;
      } else {
        this.allCls = false;

        this.cmbSection.data = [{ id: 0, name: "All" }];

        var url =
          this.$store.state.domain +
          "/Fill/Sections?cID=" +
          this.$store.state.cID +
          "&_db=" +
          this.$store.state.db +
          "&clsID=" +
          option.id;
        axios
          .get(url)
          .then((response) => {
            if (response.data.status === "error") {
              //console.log.log("Error on getting sec: ", response.data);
            } else {
              var i = 0;

              response.data.data.forEach((element) => {
                this.cmbSection.data.push({
                  id: element.id,
                  name: element.sec,
                });
                //console.log.log(element.sec);

                i++;
              });
              //console.log.log(this.cmbSection.data);
            }
          })
          .catch(function (error) {
            //console.log.log("Server Error on getting sec: ", error);
          });
      }
    },

    UpdateValue(option, id) {
      if (id === "cmbSection") {
        this.cmbSection.value = { id: option.id, name: option.name };
        //this.myObj.sec =  this.cmbSection.value.id;
      } else if (id === "cmbFaculty") {
        this.cmbFaculty.value = { id: option.id, name: option.name };
        //this.myObj.faculty =  this.cmbFaculty.value.id;
      } else if (id === "cmbFeeType") {
        this.cmbFeeType.value = { id: option.id, name: option.name };
        //this.myObj.feeType =  this.cmbFeeType.value.id;
      } else if (id === "cmbSession") {
        this.cmbSession.value = { id: option.id, name: option.name };
        //this.myObj.session =  this.cmbSession.value.id;
      } else if (id === "cmbPayMode") {
        this.cmbPayMode.value = { id: option.id, name: option.name };
        //this.myObj.payMode =  this.cmbPayMode.value.name;
      }
    },

    CreateFees() {
      this.fields = "";

      if (this.cmbClass.value === null || this.cmbClass.value.id === null) {
        this.fields += "Class.<br />";
      } else {
        this.myObj.clsID = this.cmbClass.value.id;
      }
      if (
        this.cmbSection.value === null ||
        this.cmbSection.value.name === null
      ) {
        this.fields += "Section.<br />";
      } else {
        this.myObj.sec = this.cmbSection.value.name;
      }
      if (this.cmbFaculty.value === null || this.cmbFaculty.value.id === null) {
        this.fields += "Faculty.<br />";
      } else {
        this.myObj.faculty = this.cmbFaculty.value.id;
      }
      if (this.cmbFeeType.value === null || this.cmbFeeType.value.id === null) {
        this.fields += "Fee Type.<br />";
      } else {
        this.myObj.feeType = this.cmbFeeType.value.id;
      }
      if (this.cmbSession.value === null || this.cmbSession.value.id === null) {
        this.fields += "Session.<br />";
      } else {
        this.myObj.session = this.cmbSession.value.id;
      }
      if (
        this.cmbPayMode.value === null ||
        this.cmbPayMode.value.name === null
      ) {
        this.fields += "Pay Mode.<br />";
      } else {
        this.myObj.payMode = this.cmbPayMode.value.name;
      }
      if (this.cmbMonth.value === null || this.cmbMonth.value.name === null) {
        this.fields += "Month.<br />";
      } else {
        this.myObj.month = this.cmbMonth.value.name;
      }
      if (this.cmbYear.value === null || this.cmbYear.value.name === null) {
        this.fields += "Year.<br />";
      } else {
        this.myObj.year = this.cmbYear.value.name;
      }
      if (this.myObj.generatedOn === null) {
        this.fields += "Generated.<br />";
      }
      if (this.fields.length > 0) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Please define following field:<br />" + this.fields,
          type: "danger",
          icon: "fa fa-ban",
          timeout: this.$store.state.timeout,
        });
      } else {
        this.$store.commit("cmbClass", this.cmbClass.value);
        this.$store.commit("cmbSec", this.cmbSection.value);
        this.$store.commit("cmbFac", this.cmbFaculty.value);
        this.$store.commit("cmbSession", this.cmbSession.value);
        this.$store.commit("cmbMonth", this.cmbMonth.value);
        this.$store.commit("cmbYear", this.cmbYear.value);
        this.$store.commit("cmbPaymode", this.cmbPayMode.value);
        //this.UpdateVars();

        this.signF = "fas fa-circle-notch fa-spin";
        this.optionF = "Creating...";
        this.saving = true;
        this.removing = true;
        //Create
        var url =
          this.$store.state.domain +
          "/FeeCreator/CreateFees?_db=" +
          this.$store.state.db +
          "&cID=" +
          this.$store.state.cID +
          "&clsID=" +
          this.myObj.clsID +
          "&sec=" +
          this.myObj.sec +
          "&faculty=" +
          this.myObj.faculty +
          "&feeType=" +
          this.myObj.feeType +
          "&session=" +
          this.myObj.session +
          "&payMode=" +
          this.myObj.payMode +
          "&month=" +
          this.myObj.month +
          "&year=" +
          this.myObj.year +
          "&generated=" +
          this.myObj.generatedOn +
          "&uID=" +
          this.$store.state.uID;
        axios
          .post(url, qs.stringify(this.myObj))
          .then((response) => {
            if (response.data.status === "error") {
              //console.log.log("Error", response.data);
              this.$notify({
                verticalAlign: "top",
                horizontalAlign: "right",
                message: "Request Error! <br />" + response.data.data,
                type: "danger",
                icon: "fa fa-ban",
                timeout: this.$store.state.timeout,
              });
              this.LoadCharts();
            } else {
              this.$notify({
                verticalAlign: "top",
                horizontalAlign: "right",
                message: "Fees Created! <br /> " + response.data.data,
                type: "success",
                icon: "fa fa-check",
                timeout: this.$store.state.timeout,
              });
            }
          })
          .catch(function (error) {
            //console.log.log(error);
            this.$notify({
              verticalAlign: "top",
              horizontalAlign: "right",
              message:
                "Request Error! <br />Request cannot be processed at the moment.",
              type: "danger",
              icon: "fa fa-ban",
              timeout: this.$store.state.timeout,
            });
          })
          .finally(() => {
            this.signF = "";
            this.optionF = "Create Fees";
            this.saving = false;
            this.removing = false;
          });
      }
    },

    RemoveFees() {
      this.fields = "";

      if (this.cmbClass.value === null || this.cmbClass.value.id === null) {
        this.fields += "Class.<br />";
      } else {
        this.myObj.clsID = this.cmbClass.value.id;
      }
      if (
        this.cmbSection.value === null ||
        this.cmbSection.value.name === null
      ) {
        this.fields += "Section.<br />";
      } else {
        this.myObj.sec = this.cmbSection.value.name;
      }
      if (this.cmbFaculty.value === null || this.cmbFaculty.value.id === null) {
        this.fields += "Faculty.<br />";
      } else {
        this.myObj.faculty = this.cmbFaculty.value.id;
      }
      if (this.cmbFeeType.value === null || this.cmbFeeType.value.id === null) {
        this.fields += "Fee Type.<br />";
      } else {
        this.myObj.feeType = this.cmbFeeType.value.id;
      }
      if (this.cmbSession.value === null || this.cmbSession.value.id === null) {
        this.fields += "Session.<br />";
      } else {
        this.myObj.session = this.cmbSession.value.id;
      }
      if (
        this.cmbPayMode.value === null ||
        this.cmbPayMode.value.name === null
      ) {
        this.fields += "Pay Mode.<br />";
      } else {
        this.myObj.payMode = this.cmbPayMode.value.name;
      }
      if (this.cmbMonth.value === null || this.cmbMonth.value.name === null) {
        this.fields += "Month.<br />";
      } else {
        this.myObj.month = this.cmbMonth.value.name;
      }
      if (this.cmbYear.value === null || this.cmbYear.value.name === null) {
        this.fields += "Year.<br />";
      } else {
        this.myObj.year = this.cmbYear.value.name;
      }
      if (this.myObj.generatedOn === null) {
        this.fields += "Generated.<br />";
      }
      if (this.fields.length > 0) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Please define following field:<br />" + this.fields,
          type: "danger",
          icon: "fa fa-ban",
          timeout: this.$store.state.timeout,
        });
      } else {
        //Remove
        this.signR = "fas fa-circle-notch fa-spin";
        this.optionR = "Removing...";
        this.saving = true;
        this.removing = true;
        var url =
          this.$store.state.domain +
          "/FeeCreator/RemoveFee?_db=" +
          this.$store.state.db +
          "&cID=" +
          this.$store.state.cID +
          "&clsID=" +
          this.myObj.clsID +
          "&sec=" +
          this.myObj.sec +
          "&faculty=" +
          this.myObj.faculty +
          "&feeType=" +
          this.myObj.feeType +
          "&session=" +
          this.myObj.session +
          "&payMode=" +
          this.myObj.payMode +
          "&month=" +
          this.myObj.month +
          "&year=" +
          this.myObj.year +
          "&generated=" +
          this.myObj.generatedOn +
          "&uID=" +
          this.$store.state.uID;
        axios
          .post(url, qs.stringify(this.myObj))
          .then((response) => {
            if (response.data.status === "error") {
              //console.log.log("Error", response.data);
              this.$notify({
                verticalAlign: "top",
                horizontalAlign: "right",
                message: "Request Error! <br />" + response.data.data,
                type: "danger",
                icon: "fa fa-ban",
                timeout: this.$store.state.timeout,
              });
              this.LoadCharts();
            } else {
              this.$notify({
                verticalAlign: "top",
                horizontalAlign: "right",
                message: "Fees Removed! <br /> " + response.data.data,
                type: "success",
                icon: "fa fa-check",
                timeout: this.$store.state.timeout,
              });
            }
          })
          .catch(function (error) {
            //console.log.log(error);
            this.$notify({
              verticalAlign: "top",
              horizontalAlign: "right",
              message:
                "Request Error! <br />Request cannot be processed at the moment.",
              type: "danger",
              icon: "fa fa-ban",
              timeout: this.$store.state.timeout,
            });
          })
          .finally(() => {
            this.signR = "";
            this.optionR = "Remove Fees";
            this.saving = false;
            this.removing = false;
          });
      }
    },
  },
  computed: {
    getData() {
      return this.$store.state.gridData;
    },
  },
};
</script>

<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
