<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Attendance</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <modal
        :show.sync="customModal"
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
            <base-input label="Class:">
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
                @select="loadSecF"
                id="cmbClass"
              >
              </multiselect>
            </base-input>

            <base-input label="Section:">
              <multiselect
                placeholder="Select section"
                v-model="cmbSection.value"
                :options="cmbSection.data"
                :close-on-select="true"
                :clear-on-select="false"
                :hide-selected="false"
                :preserve-search="true"
                label="name"
                track-by="name"
                :preselect-first="true"
                @select="UpdateValue"
                id="cmbSection"
              >
              </multiselect>
            </base-input>

            <base-input label="Faculty:">
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

            <!-- <base-input label="Subject:">                    
                                <multiselect                                                 
                                  placeholder="Select subject"   
                                  v-model="cmbSubject.value" 
                                  :options="cmbSubject.data" 
                                  :close-on-select="true" 
                                  :clear-on-select="false" 
                                  :hide-selected="false" 
                                  :preserve-search="true"                      
                                  label="name" 
                                  track-by="name"   
                                  :multiple="false"                               
                                  :preselect-first="true"                                
                                  id="cmbSubject">
                                </multiselect>

                            </base-input> -->

            <base-input label="Date">
              <flat-picker
                slot-scope="{ focus, blur }"
                @on-open="focus"
                @on-close="blur"
                :config="{ allowInput: true }"
                class="form-control datepicker"
                v-model="currentDate"
              >
              </flat-picker>
            </base-input>

            <div>
              <base-button
                @click="Load()"
                :disabled="savingC"
                type="primary"
                class="col"
                ><i v-bind:class="signC"></i> {{ optionC }}
              </base-button>
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
              <div style="margin-bottom: 20px">
                <base-button icon type="primary" @click="customModal = true">
                  <span class="btn-inner--icon"
                    ><i class="fas fa-plus"></i
                  ></span>
                  <span class="btn-inner--text">Select Class</span>
                </base-button>

                <base-button
                  icon
                  type="success"
                  :disabled="savingS"
                  @click="Save()"
                >
                  <span class="btn-inner--icon"
                    ><i v-bind:class="signS"></i
                  ></span>
                  <span class="btn-inner--text">{{ optionS }} </span>
                </base-button>
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
            <el-table
              :data="queriedData"
              style="cursor: pointer"
              row-key="gr"
              header-row-class-name="thead-light"
              @sort-change="sortChange"
              @selection-change="selectionChange"
              @row-click="rowClicked"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                v-for="column in tableColumns"
                :key="column.gr"
                v-bind="column"
              >
              </el-table-column>
              <el-table-column min-width="180px" align="right" label="Options">
                <div slot-scope="{ $index, row }" class="d-flex">
                  <base-button
                    @click.stop="MarkLeave($index, row)"
                    size="sm"
                    type="success"
                    >Mark leave</base-button
                  >
                  <base-button
                    @click.stop="MarkLate($index, row)"
                    size="sm"
                    type="danger"
                    >Mark late</base-button
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

export default {
  mixins: [clientPaginationMixin],
  components: {
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
  },
  data() {
    return {
      customModal: false,
      optionC: "Show attendance",
      savingC: false,
      signC: "fas fa-edit",
      currentDate: moment().format("YYYY-MM-DD"),

      cmbClass: {
        value: null,
        data: [],
      },
      cmbSection: {
        value: null,
        data: [],
      },
      cmbFaculty: {
        value: null,
        data: [],
      },
      myObj: {
        list: null,
        tID: 0,
        clsID: null,
        sec: null,
        facID: null,
        sub: 0,
        day: null,
        mn: null,
        year: null,
        cID: null,
        _db: null,
      },
      propsToSearch: ["batch"],
      tableColumns: [
        {
          prop: "gr",
          label: "GR",
          minWidth: 180,
          sortable: true,
        },
        {
          prop: "name",
          label: "Student",
          minWidth: 350,
          sortable: true,
        },
        {
          prop: "fName",
          label: "Father Name",
          minWidth: 250,
          sortable: true,
        },
        {
          prop: "status",
          label: "Status",
          minWidth: 180,
          sortable: true,
        },
      ],
      tableData: [],
      selectedRows: [],
      modals: {
        showModal: false,
      },
      optionName: "Add",
      name: "",
      prefixname: "",
      prefixError: false,
      nameError: false,
      sign: "fas fa-user-plus",
      shouldAdd: true,
      saving: false,
      eIndex: 0,
      optionS: "Save Attendance",
      signS: "fas fa-save",
      savingS: false,
    };
  },
  methods: {
    MarkLeave(index, row) {
      row.status = "L";
    },

    MarkLate(index, row) {
      row.status = "Late";
    },

    rowClicked(row) {
      if (row.status === "A") {
        row.status = "P";
      } else {
        row.status = "A";
      }
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.status === "P") {
        return "success-row";
      } else if (row.status === "A") {
        return "warning-row";
      } else if (row.status === "L") {
        return "other-row";
      } else if (row.status === "Late") {
        return "late-row";
      }
    },

    FillDropdowns() {
      //Classes
      var url =
        this.$store.state.domain +
        "/Fill/TClasses?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&localID=" +
        this.$store.state.localID;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Class: ', response.data);
          } else {
            response.data.data.forEach((element) => {
              this.cmbClass.data.push({ id: element.id, name: element.name });
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Class: ', error);
        });
    },

    loadSecF(option, id) {
      //cmbSection
      this.cmbSection.data = [];
      this.cmbSection.value = null;
      var url =
        this.$store.state.domain +
        "/Fill/TSections?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&localID=" +
        this.$store.state.localID +
        "&clsID=" +
        option.id;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting sec a: ', response.data);
          } else {
            response.data.data.forEach((element) => {
              this.cmbSection.data.push({ id: element, name: element });
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Area: ', error);
        });

      //cmbFaculty
      this.cmbFaculty.data = [];
      this.cmbFaculty.value = null;
      var url =
        this.$store.state.domain +
        "/Fill/TFaculty?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&localID=" +
        this.$store.state.localID +
        "&clsID=" +
        option.id;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting fac a: ', response.data);
          } else {
            response.data.data.forEach((element) => {
              this.cmbFaculty.data.push({ id: element.id, name: element.name });
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting fac: ', error);
        });
    },

    UpdateValue(option, id) {
      if (id === "cmbSection") {
        this.cmbSection.value = { id: option.id, name: option.name };
      } else if (id === "cmbFaculty") {
        this.cmbFaculty.value = { id: option.id, name: option.name };
      }

      // //Load Subjects
      // if(this.cmbClass.value !== null && this.cmbSection.value !== null && this.cmbFaculty.value !== null){
      //   this.cmbSubject.data = [];
      //   this.cmbSubject.value = null;
      //   var url = this.$store.state.domain + '/Fill/TSubjects?cID=' + this.$store.state.cID +'&_db=' + this.$store.state.db + '&localID=' + this.$store.state.localID + "&clsID=" + this.cmbClass.value.id + '&sec=' + this.cmbSection.value.name + '&fac=' + this.cmbFaculty.value.id
      //    axios.get(url)
      //   .then((response) => {

      //     if(response.data.status === "error")
      //     {
      //       //console.log.log('Error on getting subs: ', response.data);
      //     }
      //     else{
      //       response.data.data.forEach(element => {
      //        this.cmbSubject.data.push( { id: element.id, name: element.name });
      //      });
      //     }
      //   })
      //   .catch(function (error) {
      //       //console.log.log('Server Error on getting subs: ', error);
      //   })
      // }
    },

    selectionChange(selectedRows) {
      this.selectedRows = selectedRows;
    },

    Load() {
      if (this.cmbClass.value === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error:<br />Please select a class.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }
      if (this.cmbSection.value === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error:<br />Please select a section.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }
      if (this.cmbFaculty.value === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error:<br />Please select a faculty.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }
      this.signC = "fas fa-circle-notch fa-spin";
      this.savingC = true;
      this.optionC = "Please wait...";

      var day = moment(this.currentDate).format("DD");
      var mn = moment(this.currentDate).format("MM");
      var year = moment(this.currentDate).format("YYYY");

      this.myObj.day = day;
      this.myObj.mn = mn;
      this.myObj.year = year;

      //Load Data
      var url =
        this.$store.state.domain +
        "/Attendance/PopulateAttendance?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&tID=" +
        this.$store.state.localID +
        "&clsID=" +
        this.cmbClass.value.id +
        "&sec=" +
        this.cmbSection.value.name +
        "&facID=" +
        this.cmbFaculty.value.id +
        "&subID=0" +
        "&day=" +
        day +
        "&mn=" +
        mn +
        "&year=" +
        year;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            this.tableData = [];
            this.signC = "fas fa-edit";
            this.savingC = false;
            this.optionC = "Show attendance";
            this.customModal = false;
            //console.log.log('Error on getting Loading attd: ', response.data);
          } else {
            this.tableData = response.data.data;
            this.signC = "fas fa-edit";
            this.savingC = false;
            this.optionC = "Show attendance";
            this.customModal = false;
          }
        })
        .catch(function (error) {
          this.tableData = [];
          this.signC = "fas fa-edit";
          this.savingC = false;
          this.optionC = "Show attendance";
          this.customModal = false;
          //console.log.log('Server Error on getting Loading attd: ', error);
        });
    },

    Save() {
      if (this.tableData === null || this.tableData.length === 0) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Nothing to save!",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }

      this.myObj.tID = this.$store.state.localID;
      this.myObj.clsID = this.cmbClass.value.id;
      this.myObj.sec = this.cmbSection.value.id;
      this.myObj.facID = this.cmbFaculty.value.id;
      this.myObj.sub = 0;
      this.myObj.cID = this.$store.state.cID;
      this.myObj._db = this.$store.state.db;
      this.myObj.list = this.tableData;

      var url = this.$store.state.domain + "/Attendance/PostAttendance";

      this.signS = "fas fa-circle-notch fa-spin";
      this.savingS = true;
      this.optionS = "Saving...";

      axios({
        method: "post",
        url: url,
        data: qs.stringify(this.myObj),
        validateStatus: (status) => {
          return true;
        },
      })
        .catch((error) => {
          //console.log.log('Server Error on saving: ', error);
        })
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error saving: ', response.data);
            this.$notify({
              verticalAlign: "top",
              horizontalAlign: "right",
              message: "Request Error! <br />" + response.data.data,
              type: "danger",
              icon: "fa fa-ban",
              timeout: 0,
            });
          } else {
            this.$notify({
              verticalAlign: "top",
              horizontalAlign: "right",
              message: "Saved! <br />Attendance saved.",
              type: "success",
              icon: "fa fa-check",
              timeout: this.$store.state.timeout,
            });
          }
        })
        .finally(() => {
          this.signS = "fas fa-save";
          this.savingS = false;
          this.optionS = "Save Attendance";
        });
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
  background-color: #fff;
  color: #606266;
}

.el-table .late-row td {
  background-color: #fdecec;
  color: #000;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #fdecec !important;
  color: #606266;
}

.el-table .other-row td {
  background-color: #defdde;
  color: #000;
}
</style>
