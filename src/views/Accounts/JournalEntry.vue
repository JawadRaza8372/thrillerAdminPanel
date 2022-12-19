<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">
            Manage Journal Entries
          </h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <!-- <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div> -->
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
            <form role="form">
              <base-input
                label="Code:"
                class="mb-3"
                name="code"
                type="text"
                placeholder="Code"
                v-model="myObj.code"
                v-bind:error="nameError"
              />

              <h4>Parent head:</h4>

              <multiselect
                style="margin-bottom: 15px"
                placeholder="Select Parent Head"
                v-model="value"
                :options="options"
                :close-on-select="true"
                :clear-on-select="false"
                :hide-selected="false"
                :preserve-search="true"
                label="name"
                track-by="name"
                :preselect-first="true"
                id="example"
              >
              </multiselect>

              <base-input
                label="Account Name:"
                class="mb-3"
                name="account"
                type="text"
                placeholder="Enter Account Name"
                v-model="myObj.account"
                v-bind:error="nameError"
              />

              <div>
                <base-button
                  @click="Validate()"
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
              class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
              <div class="row col-12">
                <div class="row col-12">
                  <base-input class="col-2">
                    <h4>Type:</h4>
                    <el-select
                      class="select-danger"
                      placeholder="Voucher"
                      v-model="myObj.type"
                    >
                      <el-option
                        v-for="option in voucherTypes"
                        class="select-danger"
                        :value="option.label"
                        :label="option.label"
                        :key="option.label"
                      >
                      </el-option>
                    </el-select>
                  </base-input>

                  <base-input
                    label="Narration:"
                    class="mb-3 col-6"
                    name="narration"
                    type="text"
                    placeholder="Enter Narration"
                    v-model="myObj.narration"
                    v-bind:error="nameError"
                  />

                  <base-input
                    addon-left-icon="ni ni-calendar-grid-58"
                    style="margin-top: 30px"
                  >
                    <flat-picker
                      slot-scope="{ focus, blur }"
                      @on-open="focus"
                      @on-close="blur"
                      :config="{ allowInput: true }"
                      class="form-control datepicker"
                      v-model="myObj.date"
                    >
                    </flat-picker>
                  </base-input>

                  <base-input
                    label="Vendor:"
                    class="mb-3 col-2"
                    name="vendor"
                    type="text"
                    placeholder="Enter Vendor's Name"
                    v-model="myObj.vendor"
                    v-bind:error="nameError"
                  />
                </div>
              </div>

              <!-- row add -->
              <div class="row col-12">
                <div class="row col-12">
                  <base-input class="col-2">
                    <h4>Code:</h4>
                    <multiselect
                      style="margin-bottom: 15px"
                      placeholder="Enter code"
                      v-model="valueCode"
                      :options="optionsCode"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :hide-selected="false"
                      :preserve-search="true"
                      label="name"
                      track-by="name"
                      :preselect-first="true"
                      id="code"
                    >
                    </multiselect>
                  </base-input>

                  <base-input class="col-2">
                    <h4>Account:</h4>
                    <multiselect
                      style="margin-bottom: 15px"
                      placeholder="Enter Account"
                      v-model="valueAccount"
                      :options="optionsAccount"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :hide-selected="false"
                      :preserve-search="true"
                      label="name"
                      track-by="name"
                      :preselect-first="true"
                      id="account"
                    >
                    </multiselect>
                  </base-input>

                  <base-input
                    label="Desc:"
                    class="mb-3 col-3"
                    name="vendor"
                    type="text"
                    placeholder="Enter Description"
                    v-model="myObj.desc"
                    v-bind:error="nameError"
                  />

                  <base-input
                    label="Debit:"
                    class="mb-3 col-1"
                    name="vendor"
                    type="text"
                    placeholder="Debit"
                    v-model="myObj.debit"
                    v-bind:error="nameError"
                  />

                  <base-input
                    label="Credit:"
                    class="mb-3 col-1"
                    name="vendor"
                    type="text"
                    placeholder="Credit"
                    v-model="myObj.credit"
                    v-bind:error="nameError"
                  />

                  <div>
                    <base-button
                      icon
                      type="primary"
                      @click="Add()"
                      style="margin-top: 30px"
                    >
                      <span class="btn-inner--icon"
                        ><i class="fas fa-plus"></i
                      ></span>
                      <span class="btn-inner--text">Add</span>
                    </base-button>
                  </div>

                  <div>
                    <base-button
                      icon
                      type="success"
                      @click="Save()"
                      style="margin-top: 30px; margin-left: 20px"
                    >
                      <span class="btn-inner--icon"
                        ><i class="fas fa-save"></i
                      ></span>
                      <span class="btn-inner--text">Save</span>
                    </base-button>
                  </div>

                  <div>
                    <base-button
                      icon
                      type="primary"
                      @click="Print()"
                      style="margin-top: 30px; margin-left: 20px"
                    >
                      <span class="btn-inner--icon"
                        ><i class="fas fa-print"></i
                      ></span>
                      <span class="btn-inner--text">Print</span>
                    </base-button>
                  </div>
                </div>
              </div>

              <!-- <div style="margin-bottom:5px;">
                  <base-button icon type="primary" @click="AddModal()">
                        <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
                        <span class="btn-inner--text">Add</span>            
                </base-button>               
              </div> -->

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
              <!-- 
              <div>
                <base-input v-model="searchQuery"
                            prepend-icon="fas fa-search"
                            placeholder="Search...">
                </base-input>
              </div> -->
            </div>
            <el-table
              :data="queriedData"
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
              <!-- <p class="card-category">
                Showing {{ from + 1 }} to {{ to }} of {{ total }} entries

                <span v-if="selectedRows.length">
                  &nbsp; &nbsp; {{selectedRows.length}} rows selected
                </span>
              </p> -->
            </div>
            <!-- <base-pagination
              class="pagination-no-border"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="total"
            >
            </base-pagination> -->
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
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  mixins: [clientPaginationMixin],
  components: {
    BasePagination,
    Multiselect,
    flatPicker,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },

  created() {
    //cmbDepartment
    var url =
      this.$store.state.domain +
      "/Accounts/ParentHead?cID=" +
      this.$store.state.cID +
      "&_db=" +
      this.$store.state.db;
    axios
      .get(url)
      .then((response) => {
        if (response.data.status === "error") {
          //console.log.log('Error on getting parent head: ', response.data);
        } else {
          response.data.data.forEach((element) => {
            ////console.log.log(element);
            this.options.push({ id: element.id, name: element.account });
          });
        }
      })
      .catch(function (error) {
        //console.log.log('Server Error on getting parent head: ', error);
      });

    this.tableData.push({
      code: "001-002-004",
      account: "Muhammad Ali Akbar",
      desc: "salary for the month of nov - cheque 00121233",
      debit: "185000",
      credit: "0",
    });
    this.tableData.push({
      code: "002-005",
      account: "Bank Al Habib",
      desc: "salary for the month of nov - cheque 00121233",
      debit: "0",
      credit: "185000",
    });

    //Grid
    // var url = this.$store.state.domain + '/Accounts/Get?cID=' + this.$store.state.cID + '&_db=' + this.$store.state.db
    //  ////console.log.log('url: ' + url);
    //  axios.get(url)
    // .then((response) => {
    //   // handle success
    //   ////console.log.log(response);
    //   if(response.data.status === "error")
    //   {
    //     this.$notify({verticalAlign: 'bottom', horizontalAlign: 'center', message: 'Request Error! <br />' + response.data.status.data, type: 'danger', icon: 'fa fa-ban',timeout: 0 });

    //   }
    //   else{
    //     //console.log.log(response.data.data);
    //    this.tableData = response.data.data;
    //    ////console.log.log("Data: ",  this.tableData);
    //   }
    // })
    // .catch(function (error) {
    //   // handle error
    //     //this.$notify({verticalAlign: 'bottom', horizontalAlign: 'center', message: 'Request Error! <br />', type: 'danger', icon: 'fa fa-ban', timeout: 0 });

    // })
  },
  data() {
    return {
      myObj: {
        id: 0,
        code: "",
        account: "",
        parentHead: 0,
        campusID: 0,
        date: "",
        type: "CPV",
      },
      valueCode: [],
      optionsCode: [],
      valueAccount: [],
      optionsAccount: [],
      voucherTypes: [
        { label: "CPV" },
        { label: "BPV" },
        { label: "CRV" },
        { label: "BRV" },
        { label: "JV" },
      ],
      dates: {
        simple: "",
      },
      propsToSearch: ["account"],
      tableColumns: [
        {
          type: "selection",
        },
        {
          prop: "code",
          label: "Code",
          minWidth: 200,
          sortable: false,
        },
        {
          prop: "account",
          label: "Account",
          minWidth: 250,
          sortable: false,
        },
        {
          prop: "desc",
          label: "Description",
          minWidth: 350,
          sortable: false,
        },
        {
          prop: "debit",
          label: "Debit",
          minWidth: 150,
          sortable: false,
        },
        {
          prop: "credit",
          label: "Credit",
          minWidth: 150,
          sortable: false,
        },
      ],
      tableData: [],
      options: [],
      value: { id: null, name: null },
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
    };
  },
  methods: {
    Validate() {
      if (this.myObj.account.length === 0) {
        this.nameError = "Enter Account Name";
      } else {
        //Save to DB

        this.sign = "fas fa-circle-notch fa-spin";
        this.saving = true;
        this.optionName = "Saving";
        if (this.myObj.id > 0) {
          //Edit
          var url =
            this.$store.state.domain +
            "/Accounts/Edit?_db=" +
            this.$store.state.db +
            "&cID=" +
            this.$store.state.cID;
          axios
            .post(url, qs.stringify(this.myObj))
            .then((response) => {
              if (response.data.status === "error") {
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message: "Request Error! <br />" + response.data.data,
                  type: "danger",
                  icon: "fa fa-ban",
                  timeout: 0,
                });
              } else {
                this.modals.showModal = false;
                Vue.set(this.tableData, this.eIndex, response.data.data);
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message:
                    'Saved! <br />Accunts "' +
                    this.myObj.account +
                    '" updated.',
                  type: "success",
                  icon: "fa fa-check",
                  timeout: this.$store.state.timeout,
                });
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
                timeout: 0,
              });
            })
            .finally(() => {
              this.sign = "far fa-edit";
              this.saving = false;
              this.optionName = "Edit";
            });
        } else {
          //Add
          //console.log.log('Obj: ', this.myObj)
          var url =
            this.$store.state.domain +
            "/Accounts/Create?_db=" +
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
                  timeout: 0,
                });
              } else {
                this.modals.showModal = false;
                this.tableData.push(response.data.data);
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message:
                    'Saved! <br />Account "' + this.myObj.account + '" added.',
                  type: "success",
                  icon: "fa fa-check",
                  timeout: this.$store.state.timeout,
                });
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
                timeout: 0,
              });
            })
            .finally(() => {
              this.sign = "fas fa-user-plus";
              this.saving = false;
              this.optionName = "Add";
            });
        }
        this.nameError = false;
      }
    },
    GetError() {
      return this.nameError;
      return this.prefixError;
    },
    AddModal() {
      this.saving = false;
      this.myObj.id = 0;
      this.myObj.code = "";
      this.myObj.account = "";
      this.myObj.parentHead = 0;
      this.value.id = 0;
      this.value.name = "-";
      this.shouldAdd = true;
      this.optionName = "Add";
      this.modals.showModal = true;
      this.sign = "fas fa-user-plus";
    },
    editRecord(index, row) {
      this.eIndex = index;
      this.saving = false;
      this.myObj.id = row.id;
      this.myObj.account = row.account;
      this.myObj.code = row.code;
      this.myObj.parentHead = row.parentHead;

      this.value.id = row.parentHead;
      this.value.name = row.parentHeadName;

      this.shouldAdd = false;
      this.optionName = "Edit";
      this.modals.showModal = true;
      this.sign = "far fa-edit";
    },
    handleDelete(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to delete account " + row.account + "?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          //Remove API
          var url =
            this.$store.state.domain +
            "/Accounts/Delete?id=" +
            row.id +
            "&_db=" +
            this.$store.state.db;
          //console.log.log('Remove: ' + url);
          axios
            .post(url, qs.stringify(""))
            .then((response) => {
              if (response.data.status === "error") {
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message: "Request Error! <br />" + response.data.data,
                  type: "danger",
                  icon: "fa fa-ban",
                  timeout: 0,
                });
              } else {
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message:
                    'Saved! <br />Account "' + row.account + '" removed.',
                  type: "danger",
                  icon: "fa fa-check",
                  timeout: this.$store.state.timeout,
                });

                this.deleteRow(row);
              }
            })
            .catch(function (error) {
              this.$notify({
                verticalAlign: "bottom",
                horizontalAlign: "center",
                message: "Request Error! <br />" + response.data.data,
                type: "danger",
                icon: "fa fa-ban",
                timeout: 0,
              });
            });
        }
      });
    },
    deleteRow(row) {
      let indexToDelete = this.tableData.findIndex(
        (tableRow) => tableRow.id === row.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
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
