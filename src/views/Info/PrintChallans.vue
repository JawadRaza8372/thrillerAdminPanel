<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Print Challans</h6>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <modal
        :show.sync="customModal"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-lg"
      >
        <card
          type="secondary"
          shadow
          header-classes="bg-white pb-5"
          body-classes="px-lg-5 py-lg-5"
          class="border-0"
        >
          <template>
            <div class="row">
              <div class="col-md-6">
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
              <div class="col-md-6">
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
                    @select="UpdateValue"
                    id="cmbSection"
                  >
                  </multiselect>
                </base-input>
              </div>
            </div>
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
            <base-input label="Print Option">
              <multiselect
                placeholder="Select print option"
                v-model="opt.value"
                :options="opt.data"
                :close-on-select="true"
                :clear-on-select="false"
                :hide-selected="false"
                :preserve-search="true"
                label="name"
                track-by="name"
                :preselect-first="true"
                @select="UpdateValue"
                id="cmbOption"
              >
              </multiselect>
            </base-input>

            <div class="row">
              <div class="col-md-12">
                <base-input label="Month-Year">
                  <multiselect
                    placeholder="Select month and year"
                    v-model="month.value"
                    :options="month.data"
                    :close-on-select="true"
                    :clear-on-select="false"
                    :hide-selected="false"
                    :preserve-search="true"
                    label="name"
                    track-by="name"
                    :multiple="true"
                    :preselect-first="true"
                    @select="UpdateValue"
                    id="cmbMonth"
                  >
                  </multiselect>
                </base-input>
              </div>

              <div class="col-md-12">
                <base-button
                  @click="PrintSelection('PrintAll', 0)"
                  type="primary"
                  class="col"
                  ><i fas fa-print></i>Print</base-button
                >
              </div>
            </div>
          </template>
        </card>
      </modal>

      <modal
        :show.sync="customModal1"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-sm"
      >
        <card
          type="secondary"
          shadow
          header-classes="bg-white pb-5"
          body-classes="px-lg-5 py-lg-5"
          class="border-0"
        >
          <template>
            <base-input label="Issue Date">
              <flat-picker
                slot-scope="{ focus, blur }"
                placeholder="Enter Issue Date"
                @on-open="focus"
                @on-close="blur"
                :config="{ allowInput: true }"
                class="form-control datepicker"
                v-model="myObj.issuedate"
              >
              </flat-picker>
            </base-input>

            <base-input label="Due Date">
              <flat-picker
                slot-scope="{ focus, blur }"
                @on-open="focus"
                placeholder="Enter Due Date"
                @on-close="blur"
                :config="{ allowInput: true }"
                class="form-control datepicker"
                v-model="myObj.duedate"
              >
              </flat-picker>
            </base-input>

            <base-input label="Valid Date">
              <flat-picker
                slot-scope="{ focus, blur }"
                @on-open="focus"
                placeholder="Enter Valid Date"
                @on-close="blur"
                :config="{ allowInput: true }"
                class="form-control datepicker"
                v-model="myObj.validDate"
              >
              </flat-picker>
            </base-input>

            <base-input
              type="number"
              label="Late Fee"
              v-model="myObj.latefee"
            />

            <div>
              <base-button
                @click="SaveSettings()"
                :disabled="savingC"
                type="primary"
                class="col"
                ><i v-bind:class="signC"></i>{{ optionC }}</base-button
              >
            </div>
          </template>
        </card>
      </modal>

      <modal
        :show.sync="customModal2"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-lg"
      >
        <card
          type="secondary"
          shadow
          header-classes="bg-white pb-5"
          body-classes="px-lg-5 py-lg-5"
          class="border-0"
        >
          <template>
            <div class="row">
              <h4 class="col-md-9">{{ customHeading }}</h4>
              <h4 class="col-md-3">{{ duesHeading }}</h4>
            </div>

            <el-table
              :data="tableDataCustom"
              style="cursor: pointer"
              row-key="id"
              header-row-class-name="thead-light"
              @sort-change="sortChange"
              @selection-change="selectionChange"
              @row-click="rowClicked"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                v-for="column in tableColumnsCustom"
                :key="column.label"
                v-bind="column"
              >
              </el-table-column>
            </el-table>

            <div>
              <base-button
                @click="PrintSelection('PrintCustom', 0)"
                :disabled="savingC"
                type="primary"
                class="col mt-3"
                ><i v-bind:class="signC"></i>Print</base-button
              >
            </div>
          </template>
        </card>
      </modal>

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
              <div class="col-md-10">
                <base-button
                  icon
                  type="primary"
                  class="mb-3"
                  @click="customModal = true"
                >
                  <span class="btn-inner--icon"
                    ><i class="fas fa-print"></i
                  ></span>
                  <span class="btn-inner--text">Print</span>
                </base-button>

                <base-button
                  icon
                  type="primary"
                  class="mb-3"
                  @click="customModal1 = true"
                >
                  <span class="btn-inner--icon"
                    ><i class="fas fa-cog"></i
                  ></span>
                  <span class="btn-inner--text">Settings</span>
                </base-button>
              </div>
              <div class="col-md-2" style="margin-top: 10px">
                <b-form-radio-group
                  class="mb-3"
                  size="sm"
                  v-model="selected"
                  :options="options"
                  buttons
                  name="radios-btn-default"
                >
                </b-form-radio-group>
              </div>

              <el-select
                hidden
                class="select-primary pagination-select"
                v-model="pagination.perPage"
                placeholder="Per page"
              >
                <el-option
                  class="select-primary pull-right"
                  v-for="item in pagination.perPageOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>

              <div hidden>
                <base-input
                  v-model="searchQuery"
                  prepend-icon="fas fa-search"
                  placeholder="Search..."
                >
                </base-input>
              </div>
            </div>

            <div v-show="!dataLoad">
              <div class="loader"></div>
            </div>
            <el-table
              :data="queriedData"
              v-show="dataLoad"
              row-key="id"
              header-row-class-name="thead-light"
              @sort-change="sortChange"
              @selection-change="selectionChange"
            >
              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                v-bind="column"
              >
              </el-table-column>
              <el-table-column min-width="250px" align="right" label="Options">
                <div slot-scope="{ $index, row }" class="d-flex">
                  <base-button
                    @click="printSettings($index, row)"
                    size="sm"
                    type="success"
                    >Custom Print</base-button
                  >
                  <base-button
                    @click="PrintSelected('PrintSelected', $index, row)"
                    size="sm"
                    type="success"
                    >Print</base-button
                  >
                </div>
              </el-table-column>
            </el-table>
          </div>
          <div
            slot="footer"
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <div class="">
              <p class="card-category">
                Showing {{ from + 1 }} to {{ to }} of {{ total }} entries

                <span v-if="selectedRows.length">
                  &nbsp; &nbsp; {{ selectedRows.length }} rows selected
                </span>
              </p>
            </div>
            <base-pagination
              class="pagination-no-border"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="total"
            >
            </base-pagination>
          </div>
        </card>
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

import { BFormRadioGroup } from "bootstrap-vue";
import { multiplyDuration } from "@fullcalendar/core";
Vue.component("b-form-radio-group", BFormRadioGroup);

export default {
  mixins: [clientPaginationMixin],
  components: {
    BFormRadioGroup,
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
    this.LoadSettings();
    this.FillDropdowns();
    this.FillGrid();
  },
  data() {
    return {
      month: {
        value: {},
        data: [],
      },

      customModal: false,
      customModal1: false,
      customModal2: false,
      optionC: "Save",
      savingC: false,
      signC: "fas fa-edit",

      opt: {
        value: { id: 0, name: "Print All" },
        data: [
          { id: 0, name: "Print All" },
          { id: 1, name: "Print Selected Month" },
          { id: 2, name: "Print Till Selected Month" },
        ],
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

      myObj: {
        issuedate: null,
        duedate: null,
        validDate: null,
        latefee: 0,
      },

      propsToSearch: ["gr"],
      tableColumns: [
        {
          prop: "sID",
          label: "ID",
          minWidth: 120,
          sortable: true,
        },
        {
          prop: "FCode",
          label: "FCode",
          minWidth: 120,
          sortable: true,
        },

        {
          prop: "GRNo",
          label: "GR",
          minWidth: 120,
          sortable: true,
        },
        {
          prop: "Studentname",
          label: "Name",
          minWidth: 300,
          sortable: true,
        },
        {
          prop: "ClassShortName",
          label: "Class",
          minWidth: 180,
          sortable: true,
        },
        {
          prop: "CurrentSection",
          label: "Section",
          minWidth: 180,
          sortable: true,
        },

        {
          prop: "Balance",
          label: "Amount",
          minWidth: 120,
          sortable: true,
        },
      ],

      tableColumnsCustom: [
        {
          prop: "id",
          label: "ID",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "FeeType",
          label: "Fee",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "monthYear",
          label: "Month",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "Balance",
          label: "Amount",
          minWidth: 130,
          sortable: true,
        },
      ],

      tableData: [],
      tableDataCustom: [],
      selectedRows: [],
      modals: {
        showModal: false,
      },

      name: "",
      optionS: "Save Attendance",
      signS: "fas fa-save",
      savingS: false,

      selected: "Student Wise",
      options: [
        { text: "Student Wise", value: "Student Wise" },
        { text: "Family Wise", value: "Family Wise" },
      ],

      allCls: true,

      dataLoad: false,
      monthYear: null,
      myObjCustom: {
        sID: 0,
        feeID: [],
      },
      familyDues: 0,
      customHeading: "Student Wise",
      duesHeading: "Total Dues: ",
      fields: "",

      objPrint: {
        selected: null,
        sID: null,
        printMode: null,
        monthYear: null,
        dtIssue: null,
        dtDue: null,
        dtValid: null,
        lateFee: null,
        feeID: null,
        type: null,
        clsID: null,
        sec: null,
      },
      tableDataEmpty: true,
    };
  },
  methods: {
    Print() {
      var url =
        this.$store.state.domain +
        "/FeeChallan/PrintCommand?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&selected=" +
        this.objPrint.selected +
        "&sID=" +
        this.objPrint.sID +
        "&printMode=" +
        this.objPrint.printMode +
        "&monthYear=" +
        this.objPrint.monthYear +
        "&dtIssue=" +
        this.objPrint.dtIssue +
        "&dtDue=" +
        this.objPrint.dtDue +
        "&dtValid=" +
        this.objPrint.dtValid +
        "&lateFee=" +
        this.objPrint.lateFee +
        "&feeID=" +
        this.objPrint.feeID +
        "&type=" +
        this.objPrint.type +
        "&clsID=" +
        this.objPrint.clsID +
        "&sec=" +
        this.objPrint.sec;

      var dialog = window.open(url);
      dialog.dialogArguments = qs.stringify(this.objPrint);
      dialog.opener = window;
      window.open(url, "_blank");
    },
    PrintSelected(type, index, row) {
      this.fields = "";

      var ID = 0;
      if (this.selected === "Student Wise") {
        this.objPrint.sID = null;
        if (row.sID > 0) ID = row.sID;
        else this.fields += "Student ID.</br>";
      } else {
        this.objPrint.sID = null;
        if (row.FCode > 0) ID = row.FCode;
        else this.fields += "Family Code.</br>";
      }
      if (this.fields.length === 0) {
        this.PrintSelection(type, ID);
      } else {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Please define following field:<br />" + this.fields,
          type: "danger",
          icon: "fa fa-ban",
          timeout: this.$store.state.timeout,
        });
      }
    },
    PrintSelection(type, ID) {
      //console.log.log("here");
      this.objPrint.type = type;
      this.fields = "";
      if (this.selected === null || this.selected.length === 0) {
        this.fields += "Selected</br>";
      } else {
        this.objPrint.selected = this.selected;
      }
      if (type === "PrintAll") {
        if (this.tableDataEmpty === true) {
          this.fields += "Student ID.</br>";
        } else {
          if (this.selected === "Student Wise") {
            this.objPrint.sID = null;
            var i = 0;
            this.tableData.forEach((element) => {
              if (this.objPrint.sID === null) {
                this.objPrint.sID = this.tableData[i].sID;
              } else {
                this.objPrint.sID += ";" + this.tableData[i].sID;
              }

              i++;
            });
          } else {
            this.objPrint.sID = null;
            var i = 0;
            this.tableData.forEach((element) => {
              if (this.objPrint.sID === null) {
                this.objPrint.sID = this.tableData[i].FCode;
              } else {
                this.objPrint.sID += ";" + this.tableData[i].FCode;
              }
              i++;
            });
          }
        }
        this.objPrint.feeID = null;
      } else if (type === "PrintSelected") {
        if (ID > 0) {
          this.objPrint.sID = null;
          this.objPrint.sID = ID;
        } else {
          this.fields += "Student ID.</br>";
        }
        this.objPrint.feeID = null;
      } else if (type === "PrintCustom") {
        if (this.myObjCustom.sID > 0) {
          this.objPrint.sID = null;
          this.objPrint.sID = this.myObjCustom.sID;
        } else {
          this.fields += "Student ID.</br>";
        }
        if (this.myObjCustom.feeID.length > 0) {
          this.objPrint.feeID = null;
          var i = 0;
          this.myObjCustom.feeID.forEach((element) => {
            if (this.objPrint.feeID === null) {
              this.objPrint.feeID = element;
            } else {
              this.objPrint.feeID += ";" + element;
            }
            i++;
          });
        } else {
          this.fields += "Fees ID.</br>";
        }
      }

      if (this.opt.value === null || this.opt.value.name === null) {
        this.fields += "Print Mode.</br>";
      } else {
        this.objPrint.printMode = this.opt.value.name;
      }

      try {
        this.objPrint.monthYear = null;

        this.month.value.forEach((element) => {
          if (this.objPrint.monthYear === null) {
            this.objPrint.monthYear = element.name;
          } else {
            this.objPrint.monthYear += ";" + element.name;
          }
        });
      } catch (error) {
        //console.log.log(this.month.value.name);
        this.objPrint.monthYear = this.month.value.name;
      }

      if (this.objPrint.monthYear === null) {
        this.fields += "Month Year.</br>";
      }

      if (this.myObj.issuedate === null) {
        this.fields += "Issue Date.</br>";
      } else {
        this.objPrint.dtIssue = this.myObj.issuedate;
      }
      if (this.myObj.duedate === null) {
        this.fields += "Due Date.</br>";
      } else {
        this.objPrint.dtDue = this.myObj.duedate;
      }
      if (this.myObj.validDate === null) {
        this.fields += "Validity Date.</br>";
      } else {
        this.objPrint.dtValid = this.myObj.validDate;
      }
      if (this.myObj.latefee === null || this.myObj.latefee.length === 0) {
        this.fields += "Late Fee.</br>";
      } else {
        this.objPrint.lateFee = this.myObj.latefee;
      }
      if (type === null || type.length === 0) {
        this.fields += "Print type.</br>";
      } else {
        this.objPrint.type = type;
      }
      if (this.cmbClass.value === null || this.cmbClass.value.id === null) {
        this.fields += "Class.</br>";
      } else {
        this.objPrint.clsID = this.cmbClass.value.id;
      }
      if (
        this.cmbSection.value === null ||
        this.cmbSection.value.name === null
      ) {
        this.fields += "Section.</br>";
      } else {
        this.objPrint.sec = this.cmbSection.value.name;
      }

      if (this.fields.length > 0)
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Please define following field:<br />" + this.fields,
          type: "danger",
          icon: "fa fa-ban",
          timeout: this.$store.state.timeout,
        });
      else {
        this.Print();
      }
    },

    LoadSettings() {
      //Load Settings

      var url =
        this.$store.state.domain +
        "/FeeChallan/LoadSettings?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log(response.data.data);
          } else {
            this.myObj.issuedate = moment(response.data.data.dtIssue).format(
              "YYYY/MM/DD"
            );
            this.myObj.duedate = moment(response.data.data.dtDue).format(
              "YYYY/MM/DD"
            );
            this.myObj.validDate = moment(response.data.data.dtValid).format(
              "YYYY/MM/DD"
            );
            this.myObj.latefee = response.data.data.lateFee;
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Settings: ', error);
        })
        .finally(() => {});
    },

    SaveSettings() {
      this.fields = "";
      if (this.myObj.issuedate === null) {
        this.fields += "Issue Date.<br />";
      } else if (this.myObj.duedate === null) {
        this.fields += "Due Date.<br />";
      } else if (this.myObj.validDate === null) {
        this.fields += "Validity Date.<br />";
      } else if (this.myObj.latefee === null) {
        this.fields += "Late Fees.<br />";
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
        //Save Settings
        this.savingC = true;
        this.optionC = "Saving...";
        this.signC = "fas fa-circle-notch fa-spin";
        var url =
          this.$store.state.domain +
          "/FeeChallan/SaveSettings?cID=" +
          this.$store.state.cID +
          "&_db=" +
          this.$store.state.db +
          "&issuedate=" +
          this.myObj.issuedate +
          "&dueDate=" +
          this.myObj.duedate +
          "&validity=" +
          this.myObj.validDate +
          "&lateFee=" +
          this.myObj.latefee;
        axios
          .get(url)
          .then((response) => {
            if (response.data.status === "error") {
              this.$notify({
                verticalAlign: "top",
                horizontalAlign: "right",
                message: "Error! <br /> " + response.data.data,
                type: "danger",
                icon: "fa fa-ban",
                timeout: this.$store.state.timeout,
              });
            } else {
              this.$notify({
                verticalAlign: "top",
                horizontalAlign: "right",
                message: "Settings Saved!",
                type: "success",
                icon: "fa fa-check",
                timeout: this.$store.state.timeout,
              });
            }
          })
          .catch(function (error) {
            //console.log.log('Server Error on saving settings: ', error);
          })
          .finally(() => {
            this.savingC = false;
            this.optionC = "Save";
            this.signC = "fas fa-edit";
          });
      }
    },

    FillDropdowns() {
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
            //console.log.log('Error on getting Class: ', response.data);
          } else {
            response.data.data.forEach((element) => {
              this.cmbClass.data.push({ id: element.id, name: element.Class });
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Class: ', error);
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
            //console.log.log('Error on getting Faculty: ', response.data);
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
          //console.log.log('Server Error on getting Faculty: ', error);
        });

      //MonthYear
      var url =
        this.$store.state.domain +
        "/FeeChallan/MonthYear?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Month year: ', response.data);
          } else {
            response.data.data.forEach((element) => {
              if (response.data.message == element.id) {
                this.month.value = { id: element.id, name: element.monthYear };
              }
              this.month.data.push({ id: element.id, name: element.monthYear });
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Faculty: ', error);
        });
    },

    loadSec(option, id) {
      if (id === "cmbClass") {
        this.cmbClass.value = { id: option.id, name: option.name };
        this.FillGrid();
      }

      if (this.cmbClass.value.name === "All") {
        this.cmbSection.value = { id: 0, name: "All" };
        this.allCls = true;
        this.FillGrid();
      } else {
        //console.log.log(this.cmbClass.value.name);
        this.allCls = false;

        this.cmbSection.value = { id: 0, name: "All" };

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
              //console.log.log('Error on getting sec: ', response.data);
            } else {
              var i = 0;

              response.data.data.forEach((element) => {
                this.cmbSection.data.push({
                  id: element.id,
                  name: element.sec,
                });

                i++;
              });
            }
          })
          .catch(function (error) {
            //console.log.log('Server Error on getting sec: ', error);
          });
      }
    },

    FillGrid() {
      this.dataLoad = false;
      this.fields = "";
      this.objPrint.sID = null;
      //Fill Grid
      if (this.cmbClass.value === null || this.cmbClass.value.id === null) {
        this.fields += "Class.<br />";
      }
      if (
        this.cmbSection.value === null ||
        this.cmbSection.value.name === null
      ) {
        this.fields += "Section.<br />";
      }
      if (this.cmbFaculty.value === null || this.cmbFaculty.value.id === null) {
        this.fields += "Faculty.<br />";
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
        this.tableDataEmpty = true;

        var url =
          this.$store.state.domain +
          "/FeeChallan/FillGrid?cID=" +
          this.$store.state.cID +
          "&_db=" +
          this.$store.state.db +
          "&clsID=" +
          this.cmbClass.value.id +
          "&sec=" +
          this.cmbSection.value.name +
          "&faculty=" +
          this.cmbFaculty.value.id;
        axios
          .get(url)
          .then((response) => {
            if (response.data.status === "success") {
              response.data.data.forEach((element) => {
                if (this.selected === "Student Wise") {
                  if (this.objPrint.sID === null) {
                    this.objPrint.sID = element.sID;
                  } else {
                    this.objPrint.sID += ";" + element.sID;
                  }
                } else {
                  if (this.objPrint.sID === null) {
                    this.objPrint.sID = element.FCode;
                  } else {
                    this.objPrint.sID += ";" + element.FCode;
                  }
                }
              });
              this.tableData = response.data.data;
              this.tableDataEmpty = false;
            } else {
              this.tableData = [];
              this.tableDataEmpty = true;
              //console.log.log('Error on grid: ', response)
            }
          })
          .catch(function (error) {
            this.tableDataEmpty = true;
          })
          .finally(() => {
            this.dataLoad = true;
          });
      }
    },

    printSettings(index, row) {
      this.customModal2 = true;
      //LoadData
      this.myObjCustom.sID = 0;
      this.myObjCustom.feeID = [];
      var sID = 0;
      this.familyDues = 0;
      if (this.selected === "Student Wise") {
        sID = row.sID;
      } else {
        sID = row.FCode;
      }

      if (sID > 0) {
        var url =
          this.$store.state.domain +
          "/FeeChallan/CustomPrintLoad?cID=" +
          this.$store.state.cID +
          "&_db=" +
          this.$store.state.db +
          "&sID=" +
          row.sID +
          "&selected=" +
          this.selected;
        axios
          .get(url)
          .then((response) => {
            if (response.data.status === "success") {
              this.myObjCustom.sID = row.sID;
              response.data.data.forEach((element) => {
                this.familyDues += element.Balance;

                this.myObjCustom.feeID.push(element.id);
              });
              this.tableDataCustom = response.data.data;
            } else {
              //console.log.log('Error on grid: ', response)
            }
          })
          .catch(function (error) {})
          .finally(() => {
            if (this.selected === "Student Wise") {
              this.customHeading = "Student G.R: " + row.GRNo;
              this.duesHeading = "Total Dues: " + row.Balance;
            } else {
              this.customHeading = "Family Code: " + sID;
              this.duesHeading = "Total Dues: " + this.familyDues;
              //console.log.log('Total Dues: ' + this.familyDues);
            }
          });
      }
    },

    rowClicked(row) {
      if (this.myObjCustom.feeID.includes(row.id)) {
        this.myObjCustom.feeID.splice(
          this.myObjCustom.feeID.indexOf(row.id),
          1
        );
      } else {
        this.myObjCustom.feeID.push(row.id);
      }
      //console.log.log(this.myObjCustom.feeID);
    },

    tableRowClassName({ row, rowIndex }) {
      if (this.myObjCustom.feeID.includes(row.id)) {
        return "success-row";
      } else {
        return "warning-row";
      }
    },

    UpdateValue(option, id) {
      if (id === "cmbSection") {
        this.cmbSection.value = { id: option.id, name: option.name };
        this.FillGrid();
      } else if (id === "cmbFaculty") {
        this.cmbFaculty.value = { id: option.id, name: option.name };
        this.FillGrid();
      }
    },

    selectionChange(selectedRows) {
      this.selectedRows = selectedRows;
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

.el-table .warning-row td {
  background-color: #ca3433;
  color: #fff;
}

.el-table .success-row td {
  background-color: #f7fafc;
  color: #606266;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #fdecec !important;
  color: #606266;
}
</style>
