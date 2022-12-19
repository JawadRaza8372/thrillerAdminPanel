<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Journal Entries</h6>
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
            <div>
              <div style="margin-bottom: 5px">
                <div class="row">
                  <div class="col-3" style="margin-left: 20px">
                    <base-input addon-left-icon="ni ni-calendar-grid-58">
                      <flat-picker
                        slot-scope="{ focus, blur }"
                        @on-open="focus"
                        @on-close="blur"
                        :config="{ allowInput: true, mode: 'range' }"
                        class="form-control datepicker"
                        v-model="dates.range"
                      >
                      </flat-picker>
                    </base-input>
                  </div>
                  <div class="col-4">
                    <base-button icon type="primary" @click="LoadData()">
                      <span class="btn-inner--icon"
                        ><i class="fas fa-search"></i
                      ></span>
                      <span class="btn-inner--text">Show Data</span>
                    </base-button>

                    <base-button icon type="primary" @click="Add()">
                      <span class="btn-inner--icon"
                        ><i class="fas fa-plus"></i
                      ></span>
                      <span class="btn-inner--text">Add Journal Entry</span>
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

              <!-- <div>
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

                  <!-- <base-button
                    @click.native="handleDelete($index, row)"
                    class="remove btn-link"
                    type="danger"
                    size="sm"
                    icon
                  >
                    <i class="text-white fas fa-trash"></i>
                  </base-button> -->
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

  created() {},
  data() {
    return {
      myObj: {
        id: 0,
        code: "",
        account: "",
        parentHead: 0,
        campusID: 0,
      },
      dates: {
        range: "",
      },
      propsToSearch: ["account"],
      tableColumns: [
        {
          prop: "voucher",
          label: "Voucher",
          minWidth: 150,
          sortable: false,
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
          minWidth: 200,
          sortable: false,
        },
        {
          prop: "description",
          label: "Description",
          minWidth: 300,
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
    LoadData() {
      //Grid
      var url =
        this.$store.state.domain +
        "/Accounts/GetJournals?date=" +
        this.data.range +
        "&cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      ////console.log.log('url: ' + url);
      axios
        .get(url)
        .then((response) => {
          // handle success
          ////console.log.log(response);
          if (response.data.status === "error") {
            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message: "Request Error! <br />" + response.data.status.data,
              type: "danger",
              icon: "fa fa-ban",
              timeout: 0,
            });
          } else {
            //console.log.log(response.data.data);
            this.tableData = response.data.data;
            ////console.log.log("Data: ",  this.tableData);
          }
        })
        .catch(function (error) {
          // handle error
          //this.$notify({verticalAlign: 'bottom', horizontalAlign: 'center', message: 'Request Error! <br />', type: 'danger', icon: 'fa fa-ban', timeout: 0 });
        });
    },
    Add() {
      let resolved = this.$router.resolve("/fusion/journalentry");
      //console.log.log('Router: ', resolved.route.name);
      if (resolved.route.name != "404") {
        let routeData = this.$router.resolve({
          name: resolved.route.name,
          query: {},
        });
        window.location = routeData.href;
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
