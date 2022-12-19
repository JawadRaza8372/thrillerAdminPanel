<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Class and Sections</h6>
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
              <h4>Department:</h4>

              <multiselect
                style="margin-bottom: 15px"
                placeholder="Select department"
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
                label="Class name:"
                class="mb-3"
                name="class"
                type="text"
                placeholder="Enter class name"
                v-model="myObj.Class"
                v-bind:error="classError"
              />

              <base-input
                label="No. of section:"
                class="mb-3"
                name="prefix"
                type="number"
                placeholder="Enter no. of sections"
                v-model="myObj.Sections"
                v-bind:error="sectionError"
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
              <div style="margin-bottom: 5px">
                <base-button icon type="primary" @click="AddModal()">
                  <span class="btn-inner--icon"
                    ><i class="fas fa-plus"></i
                  ></span>
                  <span class="btn-inner--text">Add New Class</span>
                </base-button>

                <base-button
                  hidden
                  icon
                  v-if="selectedRows.length"
                  type="danger"
                  @click="RemoveSelected()"
                >
                  <span class="btn-inner--icon"
                    ><i class="fas fa-trash"></i
                  ></span>
                  <span class="btn-inner--text">Remove selected</span>
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

              <div>
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
    //cmbDepartment
    var url =
      this.$store.state.domain +
      "/StudentDepartments?cID=" +
      this.$store.state.cID +
      "&_db=" +
      this.$store.state.db;
    axios
      .get(url)
      .then((response) => {
        if (response.data.status === "error") {
          //console.log.log("Error on getting cmbDepartment: ", response.data);
        } else {
          response.data.data.forEach((element) => {
            this.options.push({ id: element.id, name: element.department });
          });
        }
      })
      .catch(function (error) {
        //console.log.log("Server Error on getting cmbDepartment: ", error);
      });

    //Grid
    var urlGrid =
      this.$store.state.domain +
      "/ClassandSectionInfo?cID=" +
      this.$store.state.cID +
      "&_db=" +
      this.$store.state.db;
    axios
      .get(urlGrid)
      .then((response) => {
        if (response.data.status === "error") {
          //console.log.log("Error on getting Grid: ", response.data);
        } else {
          ////console.log.log(response.data.data);
          this.tableData = response.data.data;
        }
      })
      .catch(function (error) {
        //console.log.log("Server Error on getting Grid: ", error);
      });
  },
  data() {
    return {
      myObj: {
        id: 0,
        department: null,
        Class: null,
        ClassShortName: null,
        Sections: null,
        addBy: 0,
        EditBy: 0,
      },
      cmbObj: {
        id: 0,
        name: null,
      },
      classError: false,
      sectionError: false,
      dptError: false,
      propsToSearch: ["department"],
      tableColumns: [
        {
          type: "selection",
        },
        {
          prop: "Class",
          label: "Class",
          minWidth: 360,
          sortable: true,
        },
        {
          prop: "Sections",
          label: "Sections",
          minWidth: 120,
          sortable: true,
        },
        {
          prop: "departmentName",
          label: "Department",
          minWidth: 360,
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
      selected: null,
      options: [],
      value: { id: null, name: null },
      dptID: 0,
    };
  },
  methods: {
    Validate() {
      if (this.value == "") {
        //Empty dropdown
        this.$notify({
          verticalAlign: "bottom",
          horizontalAlign: "center",
          message: "Error! <br />" + "Please select a department.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: this.$store.state.timeout,
        });
      } else {
        this.myObj.department = this.value.id;

        if (this.myObj.Class === null || this.myObj.Class.length === 0)
          this.classError = "Enter class name";
        else this.classError = false;
        if (this.myObj.Sections === null || this.myObj.Sections.length === 0)
          this.sectionError = "Enter no. of sections";
        else this.sectionError = false;

        if (this.value !== null && !this.classError && !this.sectionError) {
          //Validation done
          this.sign = "fas fa-circle-notch fa-spin";
          this.saving = true;
          this.optionName = "Saving";
          if (this.myObj.id > 0) {
            //Edit
            this.myObj.EditBy = this.$store.state.uID;
            var url =
              this.$store.state.domain +
              "/ClassandSectionInfo/Edit?_db=" +
              this.$store.state.db +
              "&cID=" +
              this.$store.state.cID;
            ////console.log.log(url);

            axios({
              method: "post",
              url: url,
              data: qs.stringify(this.myObj),
              validateStatus: (status) => {
                return true;
              },
            })
              .catch((error) => {
                //console.log.log("Server Error on saving: ", error);
              })
              .then((response) => {
                if (response.data.status === "error") {
                  //console.log.log("Error saving: ", response.data);
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
                      'Saved! <br />Class "' + this.myObj.Class + '" saved..',
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
          } else {
            //Add

            this.myObj.addBy = this.$store.state.uID;
            var url =
              this.$store.state.domain +
              "/ClassandSectionInfo/Create?_db=" +
              this.$store.state.db +
              "&cID=" +
              this.$store.state.cID;
            ////console.log.log(url);

            axios({
              method: "post",
              url: url,
              data: qs.stringify(this.myObj),
              validateStatus: (status) => {
                return true;
              },
            })
              .catch((error) => {
                //console.log.log("Server Error on saving: ", error);
              })
              .then((response) => {
                if (response.data.status === "error") {
                  //console.log.log("Error saving: ", response.data);
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
                      'Saved! <br />New Class "' +
                      this.myObj.Class +
                      '" added.',
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
          }
        }
      }
    },
    AddModal() {
      (this.myObj.id = 0),
        (this.myObj.department = null),
        (this.myObj.Class = null),
        (this.myObj.ClassShortName = null),
        (this.myObj.Sections = null),
        (this.myObj.addBy = 0),
        (this.myObj.EditBy = 0);

      this.saving = false;
      this.shouldAdd = true;
      this.optionName = "Add";
      this.modals.showModal = true;
      this.sign = "fas fa-user-plus";
    },
    editRecord(index, row) {
      this.eIndex = index;
      this.saving = false;

      if (this.value === null) this.value = { id: null, name: null };
      this.myObj.id = row.id;
      this.myObj.department = row.department;
      this.value.id = row.department;
      this.value.name = row.departmentName;
      this.myObj.Class = row.Class;
      this.myObj.Sections = row.Sections;
      this.myObj.addBy = row.addBy;

      this.shouldAdd = false;
      this.optionName = "Edit";
      this.modals.showModal = true;
      this.sign = "far fa-edit";

      ////console.log.log('Row: ', row);
    },
    handleDelete(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to delete class " + row.Class + "?",
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
            "/ClassandSectionInfo/Delete?id=" +
            row.id +
            "&_db=" +
            this.$store.state.db;
          //console.log.log("Remove: " + url);
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
                    'Saved! <br />Department "' + row.department + '" removed.',
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
