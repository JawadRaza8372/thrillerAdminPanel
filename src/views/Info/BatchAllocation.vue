<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Batch Allocation</h6>
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

            <base-input label="Teacher:">
              <multiselect
                placeholder="Select teacher"
                v-model="cmbTeacher.value"
                :options="cmbTeacher.data"
                :close-on-select="true"
                :clear-on-select="false"
                :hide-selected="false"
                :preserve-search="true"
                label="name"
                track-by="name"
                :preselect-first="true"
                @select="UpdateValue"
                id="cmbTeacher"
              >
              </multiselect>
            </base-input>

            <base-input label="Subject:">
              <multiselect
                placeholder="Select subject"
                v-model="cmbSubject.value"
                :options="cmbSubject.data"
                :close-on-select="false"
                :clear-on-select="false"
                :hide-selected="false"
                :preserve-search="true"
                label="name"
                track-by="name"
                :multiple="true"
                :preselect-first="true"
                @select="UpdateValue"
                id="cmbSubject"
              >
              </multiselect>
            </base-input>

            <div>
              <base-button
                @click="Save()"
                :disabled="saving"
                type="primary"
                class="col"
                ><i v-bind:class="signF"></i> {{ optionF }}
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
            <div class="">
              <div style="margin-bottom: 20px">
                <div class="row col-md-12">
                  <div class="col-md-3">
                    <multiselect
                      placeholder="Select batch"
                      v-model="cmbBatch.value"
                      :options="cmbBatch.data"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :hide-selected="false"
                      :preserve-search="true"
                      label="name"
                      track-by="name"
                      :preselect-first="true"
                      @select="UpdateValue"
                      id="cmbBatch"
                    >
                    </multiselect>
                  </div>

                  <div class="col-md-4">
                    <base-button icon type="primary" @click="AddModal()">
                      <span class="btn-inner--icon"
                        ><i class="fas fa-plus"></i
                      ></span>
                      <span class="btn-inner--text">Allocate</span>
                    </base-button>

                    <base-button hidden icon type="success" @click="Refresh()">
                      <span class="btn-inner--icon"
                        ><i class="fas fa-plus"></i
                      ></span>
                      <span class="btn-inner--text">Refresh</span>
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
              <el-table-column min-width="180px" align="right" label="Delete">
                <div slot-scope="{ $index, row }" class="d-flex">
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
    this.FillDropdowns();
  },
  data() {
    return {
      myObj: {
        id: 0,
        teacherID: null,
        clsID: null,
        subID: null,
        share: null,
        isOptional: null,
        Priority: null,
        sec: null,
        bID: null,
        campusID: null,
        faculty: null,
        list: null,
      },
      propsToSearch: ["batch"],
      tableColumns: [
        {
          prop: "Subject",
          label: "Subject",
          minWidth: 250,
          sortable: true,
        },
        {
          prop: "Teacher",
          label: "Teacher",
          minWidth: 350,
          sortable: true,
        },
        {
          prop: "Class",
          label: "Class",
          minWidth: 180,
          sortable: true,
        },
        {
          prop: "Sec",
          label: "Sec",
          minWidth: 180,
          sortable: true,
        },
        {
          prop: "Faculty",
          label: "Faculty",
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

      cmbBatch: {
        value: null,
        data: [],
      },
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
      cmbTeacher: {
        value: null,
        data: [],
      },
      cmbSubject: {
        value: null,
        data: [],
      },
      optionF: "Save",
      saving: false,
      signF: "fas fa-edit",
    };
  },
  methods: {
    FillDropdowns() {
      //Batch
      var url =
        this.$store.state.domain +
        "/Batch?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Batch: ', response.data);
          } else {
            var i = 0;
            response.data.data.forEach((element) => {
              this.cmbBatch.data.push({ id: element.id, name: element.batch });

              if (i === 0) {
                this.cmbBatch.value = { id: element.id, name: element.batch };
                this.Refresh();
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Batch: ', error);
        });

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

            response.data.data.forEach((element) => {
              this.cmbClass.data.push({ id: element.id, name: element.Class });

              // if(i === 0)
              // {
              //     this.cmbClass.value = { id: element.id, name: element.Class };
              //     this.loadSec(this.cmbClass.value, 'cmbClass');
              // }

              // i++;
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

              //  if(i === 0)
              //  {
              //     this.cmbFaculty.value = { id: element.id, name: element.faculty };
              //  }

              //  i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Faculty: ', error);
        });

      //Teacher
      var url =
        this.$store.state.domain +
        "/Staff/Filldropdown?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Teacher: ', response.data);
          } else {
            var i = 0;
            response.data.data.forEach((element) => {
              this.cmbTeacher.data.push({ id: element.id, name: element.name });

              //  if(i === 0)
              //  {
              //     this.cmbTeacher.value = { id: element.id, name: element.name };
              //  }

              //  i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Faculty: ', error);
        });

      //Subjects
      var url =
        this.$store.state.domain +
        "/Subjects/Filldropdown?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Subjects: ', response.data);
          } else {
            var i = 0;
            response.data.data.forEach((element) => {
              this.cmbSubject.data.push({ id: element.id, name: element.name });

              //  if(i === 0)
              //  {
              //     this.cmbSubject.value = { id: element.id, name: element.name };
              //  }

              //  i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Faculty: ', error);
        });
    },

    Refresh() {
      //Fill Grid
      var url =
        this.$store.state.domain +
        "/BatchAllocation?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&bID=" +
        this.cmbBatch.value.id;
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
        .catch(function (error) {});
    },

    loadSec(option, id) {
      this.cmbSection.data = [];
      this.cmbSection.value = null;
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
              this.cmbSection.data.push({ id: element.id, name: element.sec });

              if (i === 0) {
                this.cmbSection.value = { id: element.id, name: element.sec };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting sec: ', error);
        });
    },

    UpdateValue(option, id) {
      if (id === "cmbBatch") {
        this.cmbBatch.value = { id: option.id, name: option.name };
        this.Refresh();
      } else if (id === "cmbClass") {
        this.cmbClass.value = { id: option.id, name: option.name };
      } else if (id === "cmbSection") {
        this.cmbSection.value = { id: option.id, name: option.name };
      } else if (id === "cmbFaculty") {
        this.cmbFaculty.value = { id: option.id, name: option.name };
      } else if (id === "cmbSubject") {
        this.cmbSubject.value = { id: option.id, name: option.name };
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
          timeout: 0,
        });
        return;
      }
      if (this.cmbSection.value === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select a section.",
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
          message: "Error! <br />" + "Please select a faculty.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }
      if (this.cmbTeacher.value === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select a teacher.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }
      if (
        this.cmbSubject.value === null ||
        this.cmbSubject.value.length === 0
      ) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select a subject.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }

      this.signF = "fas fa-circle-notch fa-spin";
      this.saving = true;
      this.optionF = "Saving...";
      this.myObj.clsID = this.cmbClass.value.id;
      this.myObj.sec = this.cmbSection.value.name;
      this.myObj.faculty = this.cmbFaculty.value.id;
      this.myObj.bID = this.cmbBatch.value.id;
      this.myObj.teacherID = this.cmbTeacher.value.id;
      this.myObj.list = this.cmbSubject.value;

      //Save
      var url =
        this.$store.state.domain +
        "/BatchAllocation/Create?_db=" +
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
            this.modals.showModal = true;
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
            timeout: 0,
          });
        })
        .finally(() => {
          this.signF = "fas fa-edit";
          this.saving = false;
          this.optionF = "Save";
        });
    },

    GetError() {
      return this.nameError;
      return this.prefixError;
    },
    AddModal() {
      if (this.cmbBatch.value === null) {
        this.$notify({
          verticalAlign: "bottom",
          horizontalAlign: "center",
          message: "Error! <br />" + "Please select a batch.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
      } else {
        this.saving = false;
        (this.myObj.id = 0),
          (this.myObj.teacherID = null),
          (this.myObj.clsID = null),
          (this.myObj.subID = null),
          (this.myObj.share = null),
          (this.myObj.isOptional = null),
          (this.myObj.Priority = null),
          (this.myObj.sec = null),
          (this.myObj.bID = null),
          (this.myObj.campusID = null),
          (this.myObj.faculty = null);

        //this.cmbClass.value = null;
        //this.cmbSection.value = null;
        //this.cmbFaculty.value = null;
        //this.cmbTeacher.value = null;
        //this.cmbSubject.value = null;

        this.shouldAdd = true;

        this.modals.showModal = true;
        this.signF = "fas fa-edit";
      }
    },
    editRecord(index, row) {
      this.eIndex = index;
      this.saving = false;
      this.myObj.id = row.id;
      this.myObj.batch = row.batch;

      this.shouldAdd = false;
      this.optionName = "Edit";
      this.modals.showModal = true;
      this.sign = "far fa-edit";
    },
    handleDelete(index, row) {
      swal({
        title: "Are you sure?",
        text:
          "You want to delete  " +
          row.Subject +
          " - " +
          row.Class +
          "-" +
          row.Sec +
          " " +
          row.Faculty +
          "?",
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
            "/BatchAllocation/Delete?id=" +
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
                  message: 'Saved! <br />Batch "' + row.Subject + '" removed.',
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
