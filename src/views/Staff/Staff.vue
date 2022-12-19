<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Staff's Data</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" @click="filterModal = true" type="neutral"
            >Filter</base-button
          >
          <!-- <base-button size="sm" @click="filterCols = true;" type="neutral">Columns</base-button> -->
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <modal
        :show.sync="filterModal"
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
              <base-input label="Status:">
                <multiselect
                  placeholder="Select status"
                  v-model="cmbStatus.value"
                  :options="cmbStatus.data"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :hide-selected="false"
                  :preserve-search="true"
                  label="name"
                  track-by="name"
                  :preselect-first="true"
                  @select="UpdateValue"
                  id="cmbStatus"
                >
                </multiselect>
              </base-input>

              <base-input label="Department:">
                <multiselect
                  placeholder="Select department"
                  v-model="cmbDepartment.value"
                  :options="cmbDepartment.data"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :hide-selected="false"
                  :preserve-search="true"
                  label="name"
                  track-by="name"
                  :preselect-first="true"
                  @select="UpdateValue"
                  id="cmbDepartment"
                >
                </multiselect>
              </base-input>

              <div>
                <base-button
                  @click="fillGrid()"
                  :disabled="saving"
                  type="primary"
                  class="col"
                  ><i v-bind:class="signF"></i> {{ optionF }}
                </base-button>
              </div>
            </form>
          </template>
        </card>
      </modal>

      <modal
        :show.sync="filterCols"
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
              <div class="row">
                <base-checkbox
                  v-for="item in cols"
                  :key="item.prop"
                  v-model="item.checked"
                  class="ml-3 mb-3 mr-1"
                  style="width: 130px"
                >
                  {{ item.label }}
                </base-checkbox>
              </div>
              <div>
                <base-button
                  @click="SaveCols()"
                  :disabled="savingCols"
                  type="primary"
                  class="col mt-3"
                  ><i v-bind:class="signC"></i> {{ optionCols }}
                </base-button>
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
              <div style="margin-bottom: 20px; margin-top: -10px">
                <base-button
                  style="margin-top: 5px"
                  icon
                  type="primary"
                  @click="Add()"
                >
                  <span class="btn-inner--icon"
                    ><i class="fas fa-plus"></i
                  ></span>
                  <span class="btn-inner--text">Add new staff</span>
                </base-button>
              </div>

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
              hidden
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

<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>

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
    //this.$store.commit('domain', 'http://localhost:51898');
    // this.gridConfig();
    this.fillDropdowns();
    //this.cmbStatus.value = {id: this.$store.state.selectedStatus, name: this.$store.state.selectedStatus};

    this.fillGrid();
  },

  data() {
    return {
      myObj: {
        id: 0,
        campusID: 0,
        dataLoad: false,
      },
      filterModal: false,
      signF: "fas fa-search",
      cmbStatus: {
        value: { id: "0", name: "All" },
        data: [],
      },
      cmbDepartment: {
        value: { id: "0", name: "All" },
        data: [],
      },
      cols: null,
      propsToSearch: ["Staffname"],
      tableColumns: [
        {
          type: "selection",
        },
        {
          prop: "id",
          label: "id",
          minWidth: 120,
          sortable: true,
          hidden: true,
        },
        {
          prop: "name",
          label: "Name",
          minWidth: 150,
          sortable: true,
        },
        {
          prop: "FatherName",
          label: "FatherName",
          minWidth: 150,
          sortable: false,
        },
        {
          prop: "Designation",
          label: "Designation",
          minWidth: 125,
          sortable: true,
        },
        {
          prop: "basicSalary",
          label: "Salary",
          minWidth: 100,
          sortable: false,
        },
        {
          prop: "department",
          label: "Department",
          minWidth: 125,
          sortable: true,
        },
        {
          prop: "status",
          label: "Status",
          minWidth: 125,
          sortable: true,
        },
        {
          prop: "AppointedOn",
          label: "AppointedOn",
          minWidth: 125,
          sortable: true,
        },
      ],
      tableData: [],
      selectedRows: [],
      eIndex: 0,
      pIndex: 0,
      optionF: "Filter record",
      saving: false,
      filterCols: false,
      savingCols: false,
      optionCols: "Select columns",
      signC: "fas fa-edit",
    };
  },

  methods: {
    Add() {
      this.$store.commit("tID", 0);
      let resolved = this.$router.resolve("/fusion/staff");
      //console.log.log('Router: ', resolved.route.name);
      if (resolved.route.name != "404")
        this.$router.push({ name: resolved.route.name, params: {} });
    },

    fillDropdowns() {
      //Status
      var url =
        this.$store.state.domain +
        "/TeacherStatus?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Status: ', response.data);
          } else {
            var i = 0;
            this.cmbStatus.data.push({ id: "0", name: "All" });
            response.data.data.forEach((element) => {
              //console.log.log(element.status)
              this.cmbStatus.data.push({
                id: element.id,
                name: element.status,
              });

              if (i === 0) {
                this.cmbStatus.value = { id: "0", name: "All" };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Status: ', error);
        });

      //Department
      var url =
        this.$store.state.domain +
        "/StaffDepartments?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Department: ', response.data);
          } else {
            var i = 0;
            this.cmbDepartment.data.push({ id: "0", name: "All" });
            response.data.data.forEach((element) => {
              //console.log.log(element.department)
              this.cmbDepartment.data.push({
                id: element.id,
                name: element.department,
              });

              if (i === 0) {
                this.cmbDepartment.value = { id: "0", name: "All" };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Status: ', error);
        });
    },

    UpdateValue(option, id) {
      if (id === "cmbStatus") {
        this.cmbStatus.value = { id: option.id, name: option.name };
      }
      if (id === "cmbDepartment") {
        this.cmbDepartment.value = { id: option.id, name: option.name };
      }
    },

    // gridConfig(){

    //   var url = this.$store.state.domain + '/GridConfig?cID=' + this.$store.state.cID +'&_db=' + this.$store.state.db  + "&uID=" + this.$store.state.uID
    //   //console.log.log(url)
    //      axios.get(url)
    //     .then((response) => {

    //       if(response.data.status === "success")
    //       {
    //         //console.log.log(response.data);
    //         this.cols = response.data.cols;
    //         this.tableColumns = response.data.data;
    //       }

    //     })
    //     .catch(function (error) {
    //         //console.log.log('Server Error on getting grid config: ', error);
    //     })

    // },

    fillGrid() {
      this.dataLoad = false;
      this.signF = "fas fa-circle-notch fa-spin";
      this.optionF = "Filtering...";
      this.saving = true;
      var url =
        this.$store.state.domain +
        "/Staff?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&status=" +
        this.cmbStatus.value.id +
        "&department=" +
        this.cmbDepartment.value.id;

      axios({
        method: "get",
        url: url,
        data: null,
        validateStatus: (status) => {
          return true;
        },
      })
        .catch((error) => {
          //console.log.log('Server Error on saving: ', error);
          this.dataLoad = true;
        })
        .then((response) => {
          if (response.data.status === "success") {
            ////console.log.log(response.data.data)

            response.data.data.forEach((element) => {
              if (element.AppointedOn !== null)
                element.AppointedOn = moment(element.AppointedOn).format(
                  "DD MMM YYYY, ddd"
                );
            });
            this.tableData = response.data.data;
            this.dataLoad = true;
            this.signF = "fas fa-search";
            this.optionF = "Filter record";
            this.saving = false;
            this.filterModal = false;
          }
        })
        .finally(() => {});
    },

    // SaveCols(){
    //     this.signC = 'fas fa-circle-notch fa-spin';
    //     this.optionCols = 'Please wait...';
    //     this.savingCols = true;

    //      var url = this.$store.state.domain + '/GridConfig/Create';
    //                ////console.log.log(url);
    //                ////console.log.log('data', qs.stringify(this.tableColumns));
    //                //let payload = { 'data' : this.cols, 'cID': 0, '_db': 'fusion-argon', 'uID': 0 };
    //                axios.post(url, this.cols)
    //                 .then(//console.log.log('done'))
    //                 .catch(//console.log.log('error'))

    //               //  //console.log.log('Payload', payload);
    //               //   axios({
    //               //       method: 'post',
    //               //       url: url,
    //               //       data: payload,
    //               //       validateStatus: (status) => {
    //               //         return true;
    //               //       },
    //               //     }).catch(error => {
    //               //           //console.log.log('Server Error on saving: ', error);
    //               //     }).then(response => {
    //               //          if(response.data.status === "success")
    //               //           {
    //               //             //console.log.log('Resp', response.data);
    //               //             this.tableColumns = response.data.data;
    //               //             this.signC = 'fas fa-edit';
    //               //             this.optionCols = 'Select columns';
    //               //             this.savingCols = false;
    //               //             this.filterCols = false;
    //               //           }
    //               //     }).finally(() => {
    //               //     });

    // },

    editRecord(index, row) {
      this.saving = false;
      this.$store.commit("tID", row.id);
      let resolved = this.$router.resolve("/fusion/staff");
      //console.log.log('Router: ', resolved.route.name);
      if (resolved.route.name != "404")
        this.$router.push({ name: resolved.route.name, params: {} });
    },
    handleDelete(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to delete Staff " + row.name + "?",
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
            "/Staff/Delete?id=" +
            row.id +
            "&_db=" +
            this.$store.state.db +
            "&cID=" +
            this.$store.state.cID;
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
                  timeout: $store.state.timeout,
                });
              } else {
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message: 'Saved! <br />Staff "' + row.name + '" removed.',
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
                timeout: $store.state.timeout,
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
