<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Manage Templates</h6>
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
            <base-input
              label="Title"
              placeholder="Title"
              v-model="myObj.Title"
            />

            <base-input label="Message">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea3"
                rows="10"
                v-model="myObj.Message"
              ></textarea>
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
                  <div class="col-md-4">
                    <base-button icon type="primary" @click="AddModal()">
                      <span class="btn-inner--icon"
                        ><i class="fas fa-plus"></i
                      ></span>
                      <span class="btn-inner--text">Add New Message</span>
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
              <el-table-column min-width="180px" align="right" label="Options">
                <div slot-scope="{ $index, row }" class="d-flex">
                  <base-button
                    @click="editRecord($index, row)"
                    class="like btn-link"
                    type="primary"
                    size="sm"
                    icon
                  >
                    <i class="text-white fas fa-edit"></i>
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
    var url =
      this.$store.state.domain +
      "/Messages?cID=" +
      this.$store.state.cID +
      "&_db=" +
      this.$store.state.db;
    axios
      .get(url)
      .then((response) => {
        if (response.data.status === "error") {
        } else {
          this.tableData = response.data.data;
        }
      })
      .catch(function (error) {});
  },
  data() {
    return {
      myObj: {
        id: 0,
        Title: null,
        Message: null,
        addBy: null,
        editBy: null,
        ModificationTime: null,
        Visible: true,
        campusID: 0,
      },
      propsToSearch: ["Title"],
      tableColumns: [
        {
          prop: "Title",
          label: "Title",
          minWidth: 150,
          sortable: true,
        },
        {
          prop: "Message",
          label: "Message",
          minWidth: 350,
          sortable: true,
        },
      ],
      tableData: [],
      selectedRows: [],
      modals: {
        showModal: false,
      },
      optionName: "Add New Message",
      name: "",
      prefixname: "",
      sign: "fas fa-user-plus",
      shouldAdd: true,
      eIndex: 0,

      optionF: "Add New Message",
      saving: false,
      signF: "fas fa-edit",
    };
  },
  methods: {
    Save() {
      if (this.myObj.Title === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please enter a title.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }
      if (this.myObj.Message === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please enter a message.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }

      this.signF = "fas fa-circle-notch fa-spin";
      this.saving = true;
      this.optionF = "Saving...";

      if (this.myObj.id == 0) {
        //Add
        var url =
          this.$store.state.domain +
          "/Messages/Create?_db=" +
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
                message: "Saved! <br />New message template saved.",
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
            this.signF = "fas fa-edit";
            this.saving = false;
            this.optionF = "Save";
          });
      } else {
        var url =
          this.$store.state.domain +
          "/Messages/Edit?_db=" +
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
              //this.tableData.push(response.data.data);
              Vue.set(this.tableData, this.eIndex, response.data.data);
              this.$notify({
                verticalAlign: "bottom",
                horizontalAlign: "center",
                message: "Saved! <br />Message template updated.",
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
            this.signF = "fas fa-edit";
            this.saving = false;
            this.optionF = "Save";
          });
      }
    },

    AddModal() {
      this.saving = false;
      (this.myObj.id = 0),
        (this.myObj.Title = null),
        (this.myObj.Message = null),
        (this.myObj.addBy = null),
        (this.myObj.editBy = null),
        (this.myObj.ModificationTime = null),
        (this.myObj.Visible = true),
        (this.myObj.campusID = 0),
        (this.optionF = "Add New Message"),
        (this.shouldAdd = true);

      this.modals.showModal = true;
      this.signF = "fas fa-plus";
    },
    editRecord(index, row) {
      this.eIndex = index;
      this.saving = false;
      this.myObj.id = row.id;
      this.myObj.Title = row.Title;
      this.myObj.Message = row.Message;
      this.shouldAdd = false;
      this.optionName = "Edit Message";
      (this.optionF = "Edit Message"), (this.modals.showModal = true);
      this.signF = "far fa-edit";
    },
    handleDelete(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to delete  " + row.Title + "?",
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
            "/Messages/Delete?id=" +
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
                  message: 'Saved! <br />Batch "' + row.Title + '" removed.',
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
