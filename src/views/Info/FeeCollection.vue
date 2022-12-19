<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-12 col-12">
          <div class="row" style="width: 100%">
            <div class="col-lg-10">
              <div class="row" style="width: 100%">
                <div class="" style="margin-top: 25px; margin-left: 20px">
                  <b-form-radio-group
                    size="sm"
                    v-model="myObj.selected"
                    :options="options"
                    buttons
                    name="radios-btn-default"
                  >
                  </b-form-radio-group>
                </div>
              </div>
            </div>
            <div class="col-lg-2">
              <h4 style="margin-top: 25px; float: right">
                {{ myObj.totalAmount }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <modal
        :show.sync="editRecordModal"
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
            <form role="form">
              <base-input
                label="Fee:"
                class="mb-3"
                name="fee"
                type="number"
                placeholder="Actual Fee"
                v-model="objChangeFee.actualFee"
                v-bind:error="nameError"
                :disabled="true"
              />
              <base-input
                label="Discount:"
                class="mb-3"
                name="discount"
                type="number"
                placeholder="Enter Discount"
                v-model="objChangeFee.newDiscount"
                v-bind:error="nameError"
                v-on:keyup="feeChange"
              />
              <base-input
                label="Previous Discount:"
                class="mb-3"
                name="discount"
                type="number"
                placeholder="Previous Discount"
                v-model="objChangeFee.discount"
                v-bind:error="nameError"
                :disabled="true"
              />

              <base-input
                label="Monthly Discount:"
                class="mb-3"
                name="monthlyDiscount"
                type="number"
                placeholder="Monthly Discount"
                v-model="objChangeFee.monthlyDiscount"
                v-bind:error="nameError"
                :disabled="true"
              />
              <base-input
                label="Balance:"
                class="mb-3"
                name="balance"
                type="number"
                placeholder="Balance"
                :disabled="true"
                v-model="objChangeFee.balance"
                v-bind:error="nameError"
              />
              <base-input label="Promise Date">
                <flat-picker
                  slot-scope="{ focus, blur }"
                  @on-open="focus"
                  @on-close="blur"
                  :config="{ allowInput: true }"
                  class="form-control datepicker"
                  v-model="objChangeFee.promiseDate"
                >
                </flat-picker>
              </base-input>

              <div>
                <base-button
                  @click="SaveChangeFee()"
                  :disabled="saving"
                  type="primary"
                  class="col"
                  ><i v-bind:class="sign"></i> {{ optionName }}</base-button
                >
              </div>
            </form>
          </template>
        </card>
      </modal>

      <modal
        :show.sync="installmentModal"
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
            <form role="form">
              <base-input
                label="Amount:"
                class="mb-3"
                name="amount"
                type="number"
                placeholder="Amount"
                v-model="installmentAmount"
                v-bind:error="nameError"
              />
              <div>
                <base-button
                  v-on:click.self="BreakInstallment()"
                  :disabled="saving"
                  type="primary"
                  class="col"
                  ><i v-bind:class="sign"></i> {{ optionName }}</base-button
                >
              </div>
            </form>
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
              class="col-md-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
              <div class="row" style="width: 100%">
                <div class="col-lg-8">
                  <div class="row">
                    <div class="col-md-3">
                      <base-input
                        type="text"
                        :placeholder="'Enter ' + myObj.selected"
                        v-model="myObj.id"
                      >
                      </base-input>
                    </div>

                    <div class="col-md-3 mrgTop">
                      <base-button
                        type="primary"
                        style="width: 100%"
                        @click="FillGrid()"
                        >Show</base-button
                      >
                    </div>
                    <div class="col-md-3 mrgTop">
                      <base-button type="primary" style="width: 100%"
                        >History</base-button
                      >
                    </div>
                    <div class="col-md-3 mrgTop">
                      <base-button type="primary" style="width: 100%"
                        >Create Fee</base-button
                      >
                    </div>
                  </div>
                </div>

                <div
                  class="col-lg-4 mrgTop"
                  style="margin-top: -15px; float: right"
                >
                  <div class="row mrgTop">
                    <base-input label="Print Voucher" style="margin-left: 20px">
                      <base-switch
                        v-model="myObj.printVoucher"
                        style="margin-top: 0px"
                      ></base-switch>
                    </base-input>

                    <base-input label="Send SMS" style="margin-left: 20px">
                      <base-switch
                        v-model="myObj.sendSms"
                        style="margin-top: 0px"
                      ></base-switch>
                    </base-input>

                    <base-input label="Auto Receive" style="margin-left: 20px">
                      <base-switch
                        v-model="myObj.autoReceive"
                        style="margin-top: 0px"
                      ></base-switch>
                    </base-input>
                  </div>
                </div>
              </div>
              <div class="row" style="width: 100%">
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-md-2">
                      <base-input>
                        <flat-picker
                          slot-scope="{ focus, blur }"
                          @on-open="focus"
                          @on-close="blur"
                          v-model="myObj.rcvdDate"
                          placeholder="Received Date"
                          :config="{ allowInput: true }"
                          class="form-control datepicker"
                        >
                        </flat-picker>
                      </base-input>
                    </div>

                    <div class="col-md-2">
                      <base-input
                        type="number"
                        placeholder="Receive"
                        v-model="myObj.rcvd"
                      >
                      </base-input>
                    </div>
                    <div class="col-md-2">
                      <base-input
                        type="number"
                        placeholder="Discount"
                        v-model="myObj.disc"
                        :disabled="true"
                      >
                      </base-input>
                    </div>
                    <div class="col-md-3">
                      <multiselect
                        placeholder="Select Account"
                        v-model="cmbAccount.value"
                        :options="cmbAccount.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        @select="UpdateValue"
                        id="cmbAccount"
                      >
                      </multiselect>
                    </div>
                    <div class="col-md-3">
                      <base-button
                        type="primary"
                        style="width: 100%"
                        :disabled="saving"
                        @click="Receive()"
                        ><i v-bind:class="signRcv"></i>
                        {{ optionNameRcv }}</base-button
                      >
                    </div>
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

              <div></div>
            </div>
            <div v-show="!dataLoad">
              <div class="loader"></div>
            </div>
            <el-table
              :data="queriedData"
              style="cursor: pointer"
              v-show="dataLoad"
              row-key="id"
              header-row-class-name="thead-light"
              @sort-change="sortChange"
              @selection-change="selectionChange"
              @row-click="rowClicked"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                v-bind="column"
              >
              </el-table-column>
              <el-table-column min-width="350px" align="right" label="Options">
                <div slot-scope="{ $index, row }" class="d-flex">
                  <base-button
                    @click="installment($index, row)"
                    size="sm"
                    type="success"
                    >Installment</base-button
                  >
                  <base-button
                    @click="editRecord($index, row)"
                    size="sm"
                    type="success"
                    >Edit</base-button
                  >
                  <base-button
                    @click="Exempt($index, row)"
                    size="sm"
                    type="primary"
                    :disabled="saving"
                    >Exempt</base-button
                  >

                  <base-button
                    @click.native="handleDelete($index, row)"
                    class="remove btn-link"
                    type="danger"
                    size="sm"
                    icon
                  >
                    <i class="text-white fas fa-trash"></i>
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
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";
import { BFormRadioGroup } from "bootstrap-vue";

import Multiselect from "vue-multiselect";

Vue.component("b-form-radio-group", BFormRadioGroup);

export default {
  mixins: [clientPaginationMixin],
  components: {
    Multiselect,
    BFormRadioGroup,
    flatPicker,
    BasePagination,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  created() {
    var url =
      this.$store.state.domain +
      "/Fill/GetAccounts?cID=" +
      this.$store.state.cID +
      "&_db=" +
      this.$store.state.db;
    axios
      .get(url)
      .then((response) => {
        if (response.data.status === "error") {
          //console.log.log('Error on getting Account: ', response.data);
        } else {
          response.data.data.forEach((element) => {
            this.cmbAccount.data.push({ id: element.id, name: element.Name });
          });
        }
      })
      .catch(function (error) {
        //console.log.log('Server Error on getting Accounts: ', error);
      })
      .finally(() => {});
  },
  data() {
    return {
      selected: "G.R",
      options: [
        { text: "Family Code", value: "Family Code" },
        { text: "G.R", value: "G.R" },
        { text: "Voucher", value: "Voucher" },
        { text: "Search", value: "Name" },
      ],

      cmbAccount: {
        value: null,
        data: [],
      },
      myObj: {
        selected: "G.R",
        id: null,
        feeID: null,
        rcvd: null,
        rcvdDate: null,
        totalAmount: null,
        printVoucher: false,
        sendSms: false,
        autoReceive: false,
        disc: null,
      },
      objChangeFee: {
        feeID: null,
        actualFee: null,
        discount: null,
        monthlyDiscount: null,
        balance: null,
        promiseDate: null,
        newDiscount: 0,
      },
      txtPH: null,
      dataLoad: true,
      signR: null,
      optionR: null,
      optionName: "Save",
      optionNameRcv: "Receive",
      signRcv: "fas fa-edit",

      propsToSearch: ["gr"],
      tableColumns: [
        {
          prop: "FeeID",
          label: "Fee ID",
          minWidth: 95,
          sortable: true,
          hidden: true,
        },

        {
          prop: "Name",
          label: "Name",
          minWidth: 120,
          sortable: true,
        },

        {
          prop: "FeeType",
          label: "Fee",
          minWidth: 120,
          sortable: true,
        },
        {
          prop: "Month",
          label: "Month",
          minWidth: 120,
          sortable: true,
        },
        {
          prop: "ActualFees",
          label: "Amount",
          minWidth: 120,
          sortable: true,
        },
        {
          prop: "MonthlyDisc",
          label: "M Disc",
          minWidth: 120,
          sortable: true,
        },
        {
          prop: "Disc",
          label: "Disc",
          minWidth: 120,
          sortable: true,
        },

        {
          prop: "Balance",
          label: "Balance",
          minWidth: 120,
          sortable: true,
        },
        {
          prop: "PromiseDate",
          label: "Promise Date",
          minWidth: 150,
          sortable: true,
        },
      ],

      tableData: [],
      selectedRows: [],
      modals: {
        showModal: false,
        showModal1: false,
      },

      name: "",
      prefixname: "",
      prefixError: false,
      nameError: false,
      sign: "fas fa-edit",
      shouldAdd: true,
      saving: false,
      eIndex: 0,
      installmentModal: false,
      editRecordModal: false,
      installmentAmount: null,
    };
  },
  methods: {
    //fillGrid
    FillGrid() {
      this.dataLoad = false;
      this.fields = "";

      if (this.myObj.id === null) {
        this.fields += this.myObj.selected + ".<br />";
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
        this.myObj.rcvd = 0;
        this.myObj.feeID = [];

        var url =
          this.$store.state.domain +
          "/FeeCollection/LoadData?cID=" +
          this.$store.state.cID +
          "&_db=" +
          this.$store.state.db +
          "&id=" +
          this.myObj.id +
          "&selected=" +
          this.myObj.selected;
        axios
          .get(url)
          .then((response) => {
            if (response.data.status === "success") {
              var total = 0;
              response.data.data.forEach((element) => {
                total = total + element.Balance;

                if (element.PromiseDate !== null)
                  element.PromiseDate = moment(element.PromiseDate).format(
                    "DD MMM YYYY, ddd"
                  );
              });
              if (this.myObj.selected === "Voucher") {
                response.data.message.forEach((element) => {
                  this.myObj.feeID.push(element);
                });
                this.myObj.rcvd = response.data.data2;
              }

              this.tableData = response.data.data;
              this.myObj.totalAmount = "Total:" + total;
            } else {
              //console.log.log('Error on grid: ', response)
            }
          })
          .catch(function (error) {})
          .finally(() => {
            this.dataLoad = true;
            if (this.myObj.selected === "Voucher") {
              if (this.myObj.autoReceive === true) {
                this.Receive();
              }
            }
          });
      }
    },

    installment(index, row) {
      event.stopPropagation();
      this.installmentModal = true;
      this.objChangeFee.feeID = row.FeeID;
    },
    editRecord(index, row) {
      event.stopPropagation();
      this.editRecordModal = true;

      this.objChangeFee = {
        feeID: row.FeeID,
        actualFee: 0,
        discount: 0,
        monthlyDiscount: 0,
        balance: 0,
        promiseDate: null,
        newDiscount: 0,
      };
      //Load data here
      this.objChangeFee.feeID = row.FeeID;
      var url =
        this.$store.state.domain +
        "/FeeCollection/LoadFeeData?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&id=" +
        row.FeeID;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "success") {
            if (response.data.data.ActualFees !== null)
              this.objChangeFee.actualFee = response.data.data.ActualFees;
            if (response.data.data.monthlyDiscount !== null)
              this.objChangeFee.monthlyDiscount =
                response.data.data.monthlyDiscount;
            if (response.data.data.Discount !== null)
              this.objChangeFee.discount = response.data.data.Discount;
            if (response.data.data.Balance !== null)
              this.objChangeFee.balance = response.data.data.Balance;
            if (response.data.data.PromiseDate !== null)
              this.objChangeFee.promiseDate = moment(
                response.data.data.PromiseDate
              ).format("YYYY/MM/DD");
          } else {
            //console.log.log('Error on grid: ', response)
          }
        })
        .catch(function (error) {})
        .finally(() => {});
    },

    Exempt(index, row) {
      event.stopPropagation();
      swal({
        title: "Are you sure?",
        text: "You want to exempt  " + row.FeeType + " of " + row.Month + "?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Yes, exempt it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.fields = "";
          if (this.myObj.rcvdDate === null || this.myObj.rcvdDate.length === 0)
            this.fields += "Receiving Date";
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
            this.saving = true;
            var url =
              this.$store.state.domain +
              "/FeeCollection/Exempt?cID=" +
              this.$store.state.cID +
              "&_db=" +
              this.$store.state.db +
              "&id=" +
              row.FeeID +
              "&uID=" +
              this.$store.state.uID +
              "&rcvdDate=" +
              this.myObj.rcvdDate;

            axios
              .get(url)
              .then((response) => {
                if (response.data.status === "success") {
                  this.$notify({
                    verticalAlign: "top",
                    horizontalAlign: "right",
                    message: "Fees exempted successfully",
                    type: "success",
                    icon: "fa fa-check",
                    timeout: this.$store.state.timeout,
                  });
                  this.FillGrid();
                } else {
                  this.$notify({
                    verticalAlign: "top",
                    horizontalAlign: "right",
                    message: response.data.data,
                    type: "error",
                    icon: "fa fa-ban",
                    timeout: this.$store.state.timeout,
                  });
                }
              })
              .catch(function (error) {
                this.$notify({
                  verticalAlign: "top",
                  horizontalAlign: "right",
                  message: error.message,
                  type: "error",
                  icon: "fa fa-ban",
                  timeout: this.$store.state.timeout,
                });
              });
            this.saving = false;
          }
        }
      });
    },
    handleDelete(index, row) {
      event.stopPropagation();
      swal({
        title: "Are you sure?",
        text: "You want to delete  " + row.FeeType + " of " + row.Month + "?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          var url =
            this.$store.state.domain +
            "/FeeCollection/Delete?cID=" +
            this.$store.state.cID +
            "&_db=" +
            this.$store.state.db +
            "&id=" +
            row.FeeID +
            "&uID=" +
            this.$store.state.uID;

          axios
            .get(url)
            .then((response) => {
              if (response.data.status === "success") {
                this.$notify({
                  verticalAlign: "top",
                  horizontalAlign: "right",
                  message: "Fees deleted successfully",
                  type: "success",
                  icon: "fa fa-check",
                  timeout: this.$store.state.timeout,
                });
                this.FillGrid();
              } else {
                this.$notify({
                  verticalAlign: "top",
                  horizontalAlign: "right",
                  message: response.data.data,
                  type: "error",
                  icon: "fa fa-ban",
                  timeout: this.$store.state.timeout,
                });
              }
            })
            .catch(function (error) {
              this.$notify({
                verticalAlign: "top",
                horizontalAlign: "right",
                message: error.message,
                type: "error",
                icon: "fa fa-ban",
                timeout: this.$store.state.timeout,
              });
            });
        }
      });
    },
    feeChange() {
      //console.log.log('Actual Fees: ' + this.objChangeFee.actualFee + ' New Discount: ' +  this.objChangeFee.newDiscount + ' Discount: ' +  this.objChangeFee.discount);
      var disc = 0;
      if (
        this.objChangeFee.newDiscount === null ||
        this.objChangeFee.newDiscount.length === 0
      ) {
        disc = 0;
      } else {
        disc = this.objChangeFee.newDiscount;
      }
      if (this.objChangeFee.promiseDate === null) {
        this.objChangeFee.promiseDate = moment("1/1/1980").format("YYYY/MM/DD");
      }
      this.objChangeFee.balance =
        this.objChangeFee.actualFee - this.objChangeFee.discount - disc;
    },

    SaveChangeFee() {
      //console.log.log(this.objChangeFee.feeID)
      this.fields = "";
      if (
        this.objChangeFee.newDiscount === null ||
        this.objChangeFee.newDiscount.length === 0
      ) {
        this.fields += "Discount</br>";
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
        //Save data
        this.sign = "fas fa-circle-notch fa-spin";
        this.optionName = "Saving...";
        this.saving = true;
        var url =
          this.$store.state.domain +
          "/FeeCollection/SaveChangeFee?cID=" +
          this.$store.state.cID +
          "&_db=" +
          this.$store.state.db +
          "&id=" +
          this.objChangeFee.feeID +
          "&discAmount=" +
          this.objChangeFee.newDiscount +
          "&promiseDate=" +
          this.objChangeFee.promiseDate +
          "&uID=" +
          this.$store.state.uID;
        axios
          .get(url)
          .then((response) => {
            if (response.data.status === "success") {
              this.$notify({
                verticalAlign: "top",
                horizontalAlign: "right",
                message: "Fees changed successfully",
                type: "success",
                icon: "fa fa-check",
                timeout: this.$store.state.timeout,
              });
              this.editRecordModal = false;
              this.FillGrid();
            } else {
              this.$notify({
                verticalAlign: "top",
                horizontalAlign: "right",
                message: response.data.data,
                type: "error",
                icon: "fa fa-ban",
                timeout: this.$store.state.timeout,
              });
            }
          })
          .catch(function (error) {
            this.$notify({
              verticalAlign: "top",
              horizontalAlign: "right",
              message: error.message,
              type: "error",
              icon: "fa fa-ban",
              timeout: this.$store.state.timeout,
            });
          })
          .finally(() => {
            this.sign = "fa fa-edit";
            this.optionName = "Save";
            this.saving = false;
          });
      }
    },

    BreakInstallment() {
      this.fields = "";
      if (
        this.installmentAmount === null ||
        this.installmentAmount.length === 0
      ) {
        this.fields += "Installment Amount</br>";
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
        //Save data
        this.sign = "fas fa-circle-notch fa-spin";
        this.optionName = "Saving...";
        this.saving = true;
        var url =
          this.$store.state.domain +
          "/FeeCollection/BreakInstallment?cID=" +
          this.$store.state.cID +
          "&_db=" +
          this.$store.state.db +
          "&id=" +
          this.objChangeFee.feeID +
          "&insAmount=" +
          this.installmentAmount +
          "&uID=" +
          this.$store.state.uID;
        axios
          .get(url)
          .then((response) => {
            if (response.data.status === "success") {
              this.$notify({
                verticalAlign: "top",
                horizontalAlign: "right",
                message: "Fees break into installment successfully",
                type: "success",
                icon: "fa fa-check",
                timeout: this.$store.state.timeout,
              });
              this.installmentModal = false;
              this.FillGrid();
            } else {
              this.$notify({
                verticalAlign: "top",
                horizontalAlign: "right",
                message: response.data.data,
                type: "error",
                icon: "fa fa-ban",
                timeout: this.$store.state.timeout,
              });
            }
          })
          .catch(function (error) {
            this.$notify({
              verticalAlign: "top",
              horizontalAlign: "right",
              message: error.message,
              type: "error",
              icon: "fa fa-ban",
              timeout: this.$store.state.timeout,
            });
          })
          .finally(() => {
            this.sign = "fa fa-edit";
            this.optionName = "Save";
            this.saving = false;
          });
      }
    },

    rowClicked(row) {
      //console.log.log(row.FeeID)
      if (this.myObj.feeID.includes(row.FeeID)) {
        this.myObj.feeID.splice(this.myObj.feeID.indexOf(row.FeeID), 1);
        if (this.myObj.rcvd === 0) {
        } else {
          this.myObj.rcvd = this.myObj.rcvd - row.Balance;
        }
      } else {
        this.myObj.feeID.push(row.FeeID);
        if (
          this.myObj.rcvd === 0 ||
          this.myObj.rcvd < 0 ||
          this.myObj.rcvd === null
        ) {
          this.myObj.rcvd = row.Balance;
        } else {
          this.myObj.rcvd = this.myObj.rcvd + row.Balance;
        }
      }
      //console.log.log(this.myObj.feeID);
    },

    Receive() {
      this.fields = "";
      var fID = null;

      if (this.myObj.feeID !== null) {
        this.myObj.feeID.forEach((element) => {
          if (fID === null) {
            fID = element;
          } else {
            fID += ";" + element;
          }
        });
      }

      if (this.myObj.id === 0 || this.myObj.id === null)
        this.fields += "</br>Student ID";
      if (
        this.myObj.rcvd === 0 ||
        this.myObj.rcvd === null ||
        this.myObj.rcvd < 0
      )
        this.fields += "</br>Received Amount";
      if (this.myObj.rcvdDate === null || this.myObj.rcvdDate.length === 0)
        this.fields += "</br>Receiving Date";
      if (
        this.cmbAccount.value.id === null ||
        this.cmbAccount.value.name.length === 0
      )
        this.fields += "</br>Account";
      if (fID === null) this.fields += "</br>Fee ID";

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
        this.signRcv = "fas fa-circle-notch fa-spin";
        this.signRcv = "fas fa-circle-notch fa-spin";
        this.optionNameRcv = "Receiving...";
        this.saving = true;

        if (this.myObj.disc === null) this.myObj.disc = 0;
        var url =
          this.$store.state.domain +
          "/FeeCollection/Receive?cID=" +
          this.$store.state.cID +
          "&_db=" +
          this.$store.state.db +
          "&option=" +
          this.myObj.selected +
          "&sID=" +
          this.myObj.id +
          "&printVoucher=" +
          this.myObj.printVoucher +
          "&sendSMS=" +
          this.myObj.sendSms +
          "&feeID=" +
          fID +
          "&rcvdDate=" +
          this.myObj.rcvdDate +
          "&rcvd=" +
          this.myObj.rcvd +
          "&disc=" +
          this.myObj.disc +
          "&account=" +
          this.cmbAccount.value.id +
          "&uID=" +
          this.$store.state.uID;

        axios
          .get(url)
          .then((response) => {
            if (response.data.status === "success") {
              this.$notify({
                verticalAlign: "top",
                horizontalAlign: "right",
                message: "Fees received successfully",
                type: "success",
                icon: "fa fa-check",
                timeout: this.$store.state.timeout,
              });
              this.FillGrid();
              if (this.myObj.printVoucher === true) {
                url =
                  this.$store.state.domain +
                  "/FeeCollection/PrintVoucher?cID=" +
                  this.$store.state.cID +
                  "&_db=" +
                  this.$store.state.db +
                  "&billID=" +
                  response.data.data +
                  "&account=" +
                  this.cmbAccount.value.id +
                  "&option=" +
                  this.this.myObj.selected;
                //console.log.log(url);
                var dialog = window.open(url);
                dialog.opener = window;
                window.open(url, "_blank");
              }
            } else {
              this.$notify({
                verticalAlign: "top",
                horizontalAlign: "right",
                message: response.data.data,
                type: "error",
                icon: "fa fa-ban",
                timeout: this.$store.state.timeout,
              });
            }
          })
          .catch(function (error) {
            this.$notify({
              verticalAlign: "top",
              horizontalAlign: "right",
              message: error.message,
              type: "error",
              icon: "fa fa-ban",
              timeout: this.$store.state.timeout,
            });
          })
          .finally(() => {
            this.signRcv = "fa fa-edit";
            this.optionNameRcv = "Receive";
            this.saving = false;
          });
      }
    },

    UpdateValue(option, id) {
      if (id === "cmbAccount") {
        this.cmbAccount.value = { id: option.id, name: option.name };
      }
    },

    tableRowClassName({ row, rowIndex }) {
      if (this.myObj.feeID.includes(row.FeeID)) {
        return "success-row";
      } else {
        return "primary-row";
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

.el-table .cell {
  word-break: break-word;
}

.el-table .success-row td {
  background-color: #2dce88b2;
  color: #fff;
}

.el-table .primary-row td {
  background-color: #f7fafc;
  color: #606266;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #ecfdf1 !important;
  color: #606266;
}

@media only screen and (max-width: 767px) {
  .mrgTop {
    margin-top: 15px;
  }
}
</style>
