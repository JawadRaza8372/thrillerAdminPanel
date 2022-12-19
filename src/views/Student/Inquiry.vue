<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Inquiry Form</h6>
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
        :show.sync="modals.showModal"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-md"
      >
        <card
          type="secondary"
          shadow
          header-classes="bg-white pb-5"
          body-classes="px-lg-5 py-lg-5"
          class="border-0"
        >
          <template>
            <form role="form" class="mb--4">
              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Name:</label
                >
                <div class="col-md-8">
                  <base-input
                    placeholder="Enter name"
                    v-model="myObj.Name"
                    v-bind:error="err.nameerr"
                  ></base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Father Name:</label
                >
                <div class="col-md-8">
                  <base-input
                    placeholder="Enter father/guardian name"
                    v-model="myObj.fatherName"
                  ></base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Contact No.:</label
                >
                <div class="col-md-8">
                  <base-input
                    placeholder="Enter contact no."
                    v-model="myObj.contactNum"
                    type="number"
                  ></base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Mobile No.:</label
                >
                <div class="col-md-8">
                  <base-input
                    placeholder="Enter mobile no."
                    inquiry.mobile=""
                    v-model="myObj.MobNum"
                    type="number"
                  ></base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Purpose of visit:</label
                >
                <div class="col-md-8">
                  <base-input v-bind:error="err.purposevsterr">
                    <textarea
                      class="form-control"
                      v-model="myObj.PurposeOfVisit"
                      id="purpose"
                      placeholder="Enter purpose of Visit"
                      rows="3"
                    >
                    </textarea>
                  </base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Date of visit:</label
                >

                <div class="col-md-8">
                  <base-input addon-left-icon="ni ni-calendar-grid-58">
                    <flat-picker
                      slot-scope="{ focus, blur }"
                      @on-open="focus"
                      @on-close="blur"
                      :config="{ allowInput: true }"
                      class="form-control datepicker"
                      v-model="myObj.date"
                      placeholder="Select visit date"
                    >
                    </flat-picker>
                  </base-input>
                </div>
              </div>

              <div>
                <base-button
                  :disabled="saving"
                  @click="Validate()"
                  type="primary"
                  class="col"
                >
                  <i v-bind:class="sign"></i> {{ optionName }}</base-button
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
              <div style="margin-bottom: 15px">
                <base-button icon type="primary" @click="AddModal()">
                  <span class="btn-inner--icon"
                    ><i class="fas fa-plus"></i
                  ></span>
                  <span class="btn-inner--text">Add New Inquiry</span>
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
                  disabled
                  prepend-icon="fas fa-search"
                  placeholder="Search..."
                >
                </base-input>
              </div>
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
              <el-table-column min-width="180px" align="right" label="Options">
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
import users from "../Tables/users2";
import axios from "axios";
import qs from "qs";
import Vue from "vue";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";

export default {
  mixins: [clientPaginationMixin],
  components: {
    BasePagination,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    flatPicker,
  },
  created() {
    var url =
      this.$store.state.domain +
      "/Inquiry?cID=" +
      this.$store.state.cID +
      "&_db=" +
      this.$store.state.db;
    axios
      .get(url)
      .then((response) => {
        if (response.data.status === "error") {
          //this.$notify({verticalAlign: 'bottom', horizontalAlign: 'center', message: 'Request Error! <br />' + response.data.status.data, type: 'danger', icon: 'fa fa-ban',timeout: 0 });
        } else {
          response.data.data.forEach((element) => {
            if (element.date !== null)
              element.date = moment(element.date).format("DD MMM YYYY, ddd");
          });
          this.tableData = response.data.data;
        }
      })
      .catch(function (error) {});
  },
  mounted() {},
  data() {
    return {
      myObj: {
        id: 0,
        Name: "",
        fatherName: "",
        contactNum: "",
        MobNum: "",
        PurposeOfVisit: null,
        status: null,
        date: null,
      },
      propsToSearch: ["Name", "fatherName", "contactNum"],
      tableColumns: [
        {
          type: "selection",
        },
        {
          prop: "Name",
          label: "Name",
          minWidth: 120,
          sortable: true,
        },
        {
          prop: "fatherName",
          label: "Father",
          minWidth: 120,
          sortable: true,
        },
        {
          prop: "contactNum",
          label: "Contact",
          minWidth: 135,
          sortable: false,
        },
        {
          prop: "MobNum",
          label: "Mobile",
          minWidth: 135,
          sortable: false,
        },
        {
          prop: "PurposeOfVisit",
          label: "Purpose",
          minWidth: 250,
          sortable: true,
        },
        {
          prop: "date",
          label: "Date",
          minWidth: 125,
          sortable: true,
        },
      ],
      tableData: [],
      selectedRows: [],
      modals: {
        showModal: false,
      },
      optionName: "Add",
      saving: false,
      name: "",
      prefixname: "",
      prefixError: false,
      nameError: false,
      sign: "",
      err: {
        nameerr: false,
        contacterr: false,
        mobileerr: false,
        purposevsterr: false,
        dateerr: false,
      },
      currentDate: moment().format("YYYY-MM-DD"),
      eIndex: 0,
    };
  },

  methods: {
    Validate() {
      if (this.myObj.Name == null || this.myObj.Name.length === 0)
        this.err.nameerr = "Enter name";
      else this.err.nameerr = false;

      if (
        this.myObj.PurposeOfVisit == null ||
        this.myObj.PurposeOfVisit.length === 0
      )
        this.err.purposevsterr = "Enter purpose of visit";
      else this.err.purposevsterr = false;

      if (!this.err.nameerr && !this.err.purposevsterr) {
        this.sign = "fas fa-circle-notch fa-spin";
        this.saving = true;
        this.optionName = "Saving";

        if (this.myObj.id === 0) {
          //Add
          var url =
            this.$store.state.domain +
            "/Inquiry/Create?_db=" +
            this.$store.state.db +
            "&cID=" +
            this.$store.state.cID;

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
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message: "Request Error! <br />" + response.data.data,
                  type: "danger",
                  icon: "fa fa-ban",
                  timeout: 0,
                });
              } else {
                this.modals.showModal = false;
                response.data.data.date = moment(
                  response.data.data.date
                ).format("DD MMM YYYY, ddd");
                this.tableData.push(response.data.data);
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message:
                    'Saved! <br />New inquiry of "' +
                    this.myObj.Name +
                    '" saved..',
                  type: "success",
                  icon: "fa fa-check",
                  timeout: this.$store.state.timeout,
                });
              }
            })
            .finally(() => {
              this.sign = "fas fa-user-plus";
              this.saving = false;
              this.optionName = "Add";
            });
        } else {
          //Edit

          var url =
            this.$store.state.domain +
            "/Inquiry/Edit?_db=" +
            this.$store.state.db +
            "&cID=" +
            this.$store.state.cID;

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
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message: "Request Error! <br />" + response.data.data,
                  type: "danger",
                  icon: "fa fa-ban",
                  timeout: 0,
                });
              } else {
                this.modals.showModal = false;
                response.data.data.date = moment(
                  response.data.data.date
                ).format("DD MMM YYYY, ddd");
                Vue.set(this.tableData, this.eIndex, response.data.data);
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message:
                    'Saved! <br />Inquiry of "' +
                    this.myObj.Name +
                    '" modified.',
                  type: "success",
                  icon: "fa fa-check",
                  timeout: this.$store.state.timeout,
                });
              }
            })
            .finally(() => {
              this.sign = "far fa-edit";
              this.saving = false;
              this.optionName = "Edit";
            });
        }
      }
    },
    date: function (date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },

    GetError() {
      return this.nameError;
      return this.prefixError;
    },
    AddModal() {
      this.saving = false;
      this.optionName = "Add";
      this.modals.showModal = true;
      this.sign = "fas fa-user-plus";

      this.myObj.date = this.currentDate;
      (this.myObj.id = 0),
        (this.myObj.Name = ""),
        (this.myObj.fatherName = ""),
        (this.myObj.contactNum = ""),
        (this.myObj.MobNum = ""),
        (this.myObj.PurposeOfVisit = null),
        (this.myObj.status = null);
    },
    editRecord(index, row) {
      this.eIndex = index;
      this.saving = false;
      this.optionName = "Edit";
      this.modals.showModal = true;
      this.sign = "far fa-edit";

      (this.myObj.id = row.id),
        (this.myObj.Name = row.Name),
        (this.myObj.fatherName = row.fatherName),
        (this.myObj.contactNum = row.contactNum),
        (this.myObj.MobNum = row.MobNum),
        (this.myObj.PurposeOfVisit = row.PurposeOfVisit),
        (this.myObj.status = row.status);

      var ts = moment(row.date, "DD MMM YYYY, ddd").valueOf();
      this.myObj.date = moment(ts).format("YYYY-MM-DD");
    },
    handleDelete(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to delete inquiry of " + row.Name + "?",
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
            "/Inquiry/Delete?id=" +
            row.id +
            "&_db=" +
            this.$store.state.db;
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
                    'Saved! <br />Inquiry of "' + row.Name + '" removed.',
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
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
