<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Staff Data</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" @click="filterModal = true" type="neutral"
            >Filter</base-button
          >
          <base-button size="sm" @click="filterCols = true" type="neutral"
            >Columns</base-button
          >
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
                  @select="loadSec"
                  id="cmbClass"
                >
                </multiselect>
              </base-input>

              <base-input label="Section:">
                <multiselect
                  placeholder="Select section"
                  v-model="cmbSec.value"
                  :options="cmbSec.data"
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

              <base-input label="Gender:">
                <multiselect
                  placeholder="Select gender"
                  v-model="cmbGender.value"
                  :options="cmbGender.data"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :hide-selected="false"
                  :preserve-search="true"
                  label="name"
                  track-by="name"
                  :preselect-first="true"
                  @select="UpdateValue"
                  id="cmbGender"
                >
                </multiselect>
              </base-input>

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
    //this.$store.commit('domain', 'http://localhost:51898');
    //this.gridConfig();
    this.fillDropdowns();
    //this.cmbStatus.value = {id: this.$store.state.selectedStatus, name: this.$store.state.selectedStatus};
    this.fillGrid();
  },

  data() {
    return {
      myObj: {
        id: 0,
        batch: "",
        campusID: 0,
      },
      filterModal: false,
      signF: "fas fa-search",
      cmbStatus: {
        value: { id: "Present", name: "Present" },
        data: [
          { id: "-", name: "All" },
          { id: "Present", name: "Present" },
          { id: "Registered", name: "Registered" },
          { id: "Online", name: "Online" },
          { id: "Left", name: "Left" },
        ],
      },
      cmbClass: {
        value: { id: "-", name: "All" },
        data: [],
      },
      cmbSec: {
        value: { id: "-", name: "All" },
        data: [],
      },
      cmbFaculty: {
        value: { id: "-", name: "All" },
        data: [],
      },
      cmbGender: {
        value: { id: "-", name: "All" },
        data: [
          { id: "-", name: "All" },
          { id: "Male", name: "Male" },
          { id: "Female", name: "Female" },
        ],
      },
      cols: null,
      propsToSearch: ["Studentname"],
      tableColumns: [
        {
          prop: "ID",
          label: "ID",
          minWidth: 130,
          sortable: true,
        },
        {
          prop: "Name",
          label: "Name",
          minWidth: 250,
          sortable: true,
        },
        {
          prop: "FatherName",
          label: "Father Name",
          minWidth: 250,
          sortable: true,
        },
        {
          prop: "Designation",
          label: "Designation",
          minWidth: 250,
          sortable: true,
        },
        {
          prop: "Department",
          label: "Department",
          minWidth: 250,
          sortable: true,
        },
        {
          prop: "Status",
          label: "Status",
          minWidth: 130,
          sortable: true,
        },
        {
          prop: "DOA",
          label: "DOA",
          minWidth: 130,
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
      this.$store.commit("staffID", 0);
      let resolved = this.$router.resolve("/fusion/staff");
      //console.log.log('Router: ', resolved.route.name);
      if (resolved.route.name != "404")
        this.$router.push({ name: resolved.route.name, params: {} });
    },

    fillDropdowns() {
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
            var i = 0;
            this.cmbClass.data.push({ id: "-", name: "All" });
            response.data.data.forEach((element) => {
              //console.log.log(element.ClassShortName)
              this.cmbClass.data.push({ id: element.id, name: element.Class });

              if (i === 0) {
                this.cmbClass.value = { id: "-", name: "All" };
              }

              i++;
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
            this.cmbFaculty.data.push({ id: "-", name: "All" });
            response.data.data.forEach((element) => {
              this.cmbFaculty.data.push({
                id: element.id,
                name: element.faculty,
              });

              if (i === 0) {
                this.cmbFaculty.value = { id: "-", name: "All" };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Faculty: ', error);
        });
    },

    loadSec(option, id) {
      this.cmbSec.data = [];
      this.cmbSec.value = { id: "-", name: "All" };
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
            //console.log.log('Error on getting sec a: ', response.data);
          } else {
            this.cmbSec.data.push({ id: "-", name: "All" });
            response.data.data.forEach((element) => {
              this.cmbSec.data.push({ id: element.id, name: element.sec });
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Area: ', error);
        });
    },

    UpdateValue(option, id) {
      if (id === "cmbStatus") {
        this.cmbStatus.value = { id: option.id, name: option.name };
      } else if (id === "cmbClass") {
        this.cmbClass.value = { id: option.id, name: option.name };
      } else if (id === "cmbSection") {
        this.cmbSec.value = { id: option.id, name: option.name };
      } else if (id === "cmbFaculty") {
        this.cmbFaculty.value = { id: option.id, name: option.name };
      } else if (id === "cmbGender") {
        this.cmbGender.value = { id: option.id, name: option.name };
      }
    },

    fillGrid() {
      this.signF = "fas fa-circle-notch fa-spin";
      this.optionF = "Filtering...";
      this.saving = true;
      var url =
        this.$store.state.domain +
        "/Registration?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&status=" +
        this.cmbStatus.value.name +
        "&cls=" +
        this.cmbClass.value.name +
        "&sec=" +
        this.cmbSec.value.name +
        "&faculty=" +
        this.cmbFaculty.value.name +
        "&gender=" +
        this.cmbGender.value.name +
        "&pg=" +
        this.pIndex;

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
        })
        .then((response) => {
          if (response.data.status === "success") {
            ////console.log.log(response.data.data)
            this.tableData = response.data.data;
            this.signF = "fas fa-search";
            this.optionF = "Filter record";
            this.saving = false;
            this.filterModal = false;
          }
        })
        .finally(() => {});
    },

    editRecord(index, row) {
      this.saving = false;
      this.$store.commit("sID", row.id);
      this.$store.commit("register", false);
      let resolved = this.$router.resolve("/fusion/admission");
      //console.log.log('Router: ', resolved.route.name);
      if (resolved.route.name != "404")
        this.$router.push({ name: resolved.route.name, params: {} });
    },
    handleDelete(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to delete batch " + row.batch + "?",
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
            "/Batch/Delete?id=" +
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
                  message: 'Saved! <br />Batch "' + row.batch + '" removed.',
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
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
