<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Fee Amount</h6>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <modal
        :show.sync="modals.showModal"
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
            <base-input
              label="Amount:"
              type="number"
              v-model="myObj.amount"
              placeholder="Enter amount"
            />

            <div class="row">
              <div class="col-md-4">
                <base-button @click="Save()" :disabled="saving" type="primary"
                  ><i v-bind:class="signF"></i> Save
                </base-button>
              </div>
              <div class="col-md-8">
                <base-button
                  @click="SaveAll()"
                  :disabled="savingAll"
                  type="primary"
                  ><i v-bind:class="signAll"></i> Save for All Classes
                </base-button>
              </div>
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
            <div class="">
              <div style="margin-bottom: 20px">
                <div class="row col-md-12">
                  <div class="col-md-3">
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
                      :disabled="cmbClassLoad"
                      :preselect-first="true"
                      @select="UpdateValue"
                      id="cmbClass"
                    >
                    </multiselect>
                  </div>
                  <div class="col-md-3">
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
                      :disabled="cmbSessionLoad"
                      :preselect-first="true"
                      @select="UpdateValue"
                      id="cmbSession"
                    >
                    </multiselect>
                  </div>

                  <div class="col-md-4">
                    <base-button icon type="primary" @click="Refresh()">
                      <span class="btn-inner--icon"
                        ><i class="fas fa-plus"></i
                      ></span>
                      <span class="btn-inner--text">Show</span>
                    </base-button>
                  </div>
                </div>
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

              <div class="col-md-8" hidden>
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
              <el-table-column min-width="180px" align="right" label="Edit">
                <div slot-scope="{ $index, row }" class="d-flex">
                  <base-button
                    @click="editRecord($index, row)"
                    class="like btn-link"
                    type="primary"
                    size="sm"
                    icon
                  >
                    <i class="text-white far fa-edit"></i>
                  </base-button>
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

export default {
  mixins: [clientPaginationMixin],
  components: {
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
      myObj: {
        id: 0,
        feeType: null,
        class: null,
        session: null,
        amount: null,
        addBy: null,
        EditBy: null,
      },
      dataLoad: true,
      propsToSearch: ["batch"],
      tableColumns: [
        {
          prop: "id",
          label: "ID",
          minWidth: 180,
          sortable: true,
        },
        {
          prop: "Code",
          label: "Fee Code",
          minWidth: 180,
          sortable: true,
        },
        {
          prop: "FeeType",
          label: "Fees",
          minWidth: 180,
          sortable: true,
        },

        {
          prop: "Amount",
          label: "Amount",
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
      eIndex: 0,

      cmbSession: {
        value: null,
        data: [],
      },
      cmbClass: {
        value: null,
        data: [],
      },

      optionF: "Save",
      saving: false,
      signF: "fas fa-edit",

      optionAll: "Save",
      savingAll: false,
      signAll: "fas fa-edit",

      cmbClassLoad: false,
      cmbSessionLoad: false,
    };
  },
  methods: {
    FillDropdowns() {
      //session
      this.cmbSessionLoad = true;
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
            //console.log.log('Error on getting Class: ', response.data);
          } else {
            response.data.data.forEach((element) => {
              this.cmbSession.data.push({
                id: element.id,
                name: element.session,
              });
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Session: ', error);
        })
        .finally(() => {
          this.cmbSessionLoad = false;
        });

      //Classes
      this.cmbClassLoad = true;
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
            var i = 0;

            response.data.data.forEach((element) => {
              this.cmbClass.data.push({ id: element.id, name: element.Class });
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Class: ', error);
        })
        .finally(() => {
          this.cmbClassLoad = false;
        });
    },

    Refresh() {
      if (this.cmbClass.value === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select a class.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: $store.state.timeout,
        });
        return;
      }

      if (this.cmbSession.value === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select a session.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: $store.state.timeout,
        });
        return;
      }

      this.dataLoad = false;
      //Fill Grid
      var url =
        this.$store.state.domain +
        "/FeeAmount?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&cls=" +
        this.cmbClass.value.id +
        "&sess=" +
        this.cmbSession.value.id;
      //console.log.log('url: ' + url);
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "success") {
            this.tableData = response.data.data;
          } else {
            //console.log.log('Error on grid: ', response)
          }
        })
        .catch(function (error) {})
        .finally(() => {
          this.dataLoad = true;
        });
    },

    UpdateValue(option, id) {
      if (id === "cmbClass") {
        this.cmbClass.value = { id: option.id, name: option.name };
      } else if (id === "cmbSession") {
        this.cmbSession.value = { id: option.id, name: option.name };
      }
    },

    Save() {
      if (this.cmbClass.value === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select a class.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: $store.state.timeout,
        });
        return;
      }
      if (this.cmbSession.value === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select a session.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: $store.state.timeout,
        });
        return;
      }
      if (this.myObj.amount === null || this.myObj.amount.length === 0) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please define amount.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: $store.state.timeout,
        });
        return;
      }

      this.signF = "fas fa-circle-notch fa-spin";
      this.saving = true;
      this.savingAll = true;
      this.optionF = "Saving...";
      this.myObj.classID = this.cmbClass.value.id;
      this.myObj.session = this.cmbSession.value.id;
      this.myObj.EditBy = this.$store.state.uID;

      //Save
      var url =
        this.$store.state.domain +
        "/FeeAmount/Save?_db=" +
        this.$store.state.db +
        "&cID=" +
        this.$store.state.cID;
      axios
        .post(url, qs.stringify(this.myObj))
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error', response.data);
            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message: "Request Error! <br />" + response.data.data,
              type: "danger",
              icon: "fa fa-ban",
              timeout: $store.state.timeout,
            });
          } else {
            this.modals.showModal = false;
            //this.tableData.push(response.data.data);
            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message: "Saved! <br />Saved.",
              type: "success",
              icon: "fa fa-check",
              timeout: this.$store.state.timeout,
            });
            this.Refresh();
          }
        })
        .catch(function (error) {
          //console.log.log(error);
          this.$notify({
            verticalAlign: "bottom",
            horizontalAlign: "center",
            message:
              "Request Error! <br />Request cannot be processed at the moment.",
            type: "danger",
            icon: "fa fa-ban",
            timeout: $store.state.timeout,
          });
        })
        .finally(() => {
          this.signF = "fas fa-edit";
          this.saving = false;
          this.optionF = "Save";
          this.savingAll = false;
        });
    },
    SaveAll() {
      if (this.cmbClass.value === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select a class.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: $store.state.timeout,
        });
        return;
      }
      if (this.cmbSession.value === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select a session.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: $store.state.timeout,
        });
        return;
      }
      if (this.myObj.amount === null || this.myObj.amount.length === 0) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please define amount.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: $store.state.timeout,
        });
        return;
      }

      this.signAll = "fas fa-circle-notch fa-spin";
      this.savingAll = true;
      this.optionAll = "Saving...";
      this.saving = true;
      this.myObj.classID = this.cmbClass.value.id;
      this.myObj.session = this.cmbSession.value.id;
      this.myObj.EditBy = this.$store.state.uID;

      //Save
      var url =
        this.$store.state.domain +
        "/FeeAmount/SaveAll?_db=" +
        this.$store.state.db +
        "&cID=" +
        this.$store.state.cID;
      axios
        .post(url, qs.stringify(this.myObj))
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error', response.data);
            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message: "Request Error! <br />" + response.data.data,
              type: "danger",
              icon: "fa fa-ban",
              timeout: $store.state.timeout,
            });
          } else {
            this.modals.showModal = false;
            //this.tableData.push(response.data.data);
            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message: "Saved! <br />Saved.",
              type: "success",
              icon: "fa fa-check",
              timeout: this.$store.state.timeout,
            });
            this.Refresh();
          }
        })
        .catch(function (error) {
          //console.log.log(error);
          this.$notify({
            verticalAlign: "bottom",
            horizontalAlign: "center",
            message:
              "Request Error! <br />Request cannot be processed at the moment.",
            type: "danger",
            icon: "fa fa-ban",
            timeout: $store.state.timeout,
          });
        })
        .finally(() => {
          this.signAll = "fas fa-edit";
          this.savingAll = false;
          this.optionAll = "Save";
          this.saving = false;
        });
    },

    GetError() {
      return this.nameError;
      return this.prefixError;
    },

    editRecord(index, row) {
      this.eIndex = index;
      this.saving = false;
      this.myObj.id = row.id;
      this.myObj.amount = row.Amount;
      this.myObj.class = this.cmbClass.value.id;
      this.myObj.session = this.cmbSession.value.id;

      this.shouldAdd = false;
      this.optionF = "Save";
      this.modals.showModal = true;
      this.sign = "far fa-edit";
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
</style>
