<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Fee Type</h6>
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
            <!-- <base-input label="Fee Type">   
                    
                    <multiselect                                                 
                       placeholder="Select Fee Type"   
                       v-model="cmbFeetype.value" 
                      :options="cmbFeetype.data" 
                      :close-on-select="true" 
                      :clear-on-select="false" 
                      :hide-selected="false" 
                      :preserve-search="true"                      
                      label="name" 
                      track-by="name" 
                      :preselect-first="true"                     
                      id="cmbFeetype">
                    </multiselect>

                  </base-input> -->

            <base-input
              label="Fee Code"
              type="text"
              v-model="myObj.Code"
              placeholder="Enter fee code"
            />
            <base-input
              label="Fee Type"
              type="text"
              v-model="myObj.feeType"
              placeholder="Enter fee type"
            />
            <base-input
              label="Default Amount"
              type="number"
              v-show="shouldAdd"
              v-model="myObj.DefaultAmount"
              placeholder="Enter default amount"
            />
            <base-input label="is Annual?">
              <base-switch
                v-model="otherObj.isAnnual"
                style="margin-top: 0px"
              ></base-switch>
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
                      <span class="btn-inner--text">Fee Type</span>
                    </base-button>

                    <base-button hidden icon type="success" @click="FillGrid()">
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
    this.FillGrid();
  },
  data() {
    return {
      myObj: {
        id: 0,
        feeType: "",
        Code: "",
        Calculated: "",
        DefaultAmount: 0,
        AddBy: null,
        EditBy: null,
      },
      otherObj: {
        isAnnual: null,
      },
      dataLoad: null,
      propsToSearch: ["Code"],
      tableColumns: [
        {
          prop: "id",
          label: "id",
          minWidth: 120,
          sortable: true,
          hidden: true,
        },
        {
          prop: "FeeType",
          label: "Fee Type",
          minWidth: 350,
          sortable: true,
        },
        {
          prop: "Code",
          label: "Fee Code",
          minWidth: 350,
          sortable: true,
        },
        {
          prop: "Calculated",
          label: "isAnnual",
          minWidth: 350,
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

      optionF: "Save",
      saving: false,
      signF: "fas fa-edit",
    };
  },
  methods: {
    FillGrid() {
      //Fill Grid
      var url =
        this.$store.state.domain +
        "/FeeType?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      //console.log.log('url: ' + url);
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "success") {
            response.data.data.forEach((element) => {
              if (element.Calculated === "Annual") element.Calculated = "Yes";
              else element.Calculated = "No";
            });
            this.tableData = response.data.data;
            //console.log.log(response.data.data);
          } else {
            //console.log.log('Error on grid: ', response)
          }
        })
        .catch(function (error) {})
        .finally(() => {
          this.dataLoad = true;
        });
    },

    Save() {
      this.fields = "";
      if (this.myObj.Code === null || this.myObj.Code.length === 0) {
        this.fields += "Fee Code.<br />";
      }
      if (this.myObj.feeType === null || this.myObj.feeType.length === 0) {
        this.fields += "Fees Type.<br />";
      }
      if (this.shouldAdd === true) {
        if (
          this.myObj.DefaultAmount === null ||
          this.myObj.DefaultAmount.length === 0
        ) {
          this.fields += "Default Amount.<br />";
        }
      }

      if (this.fields.length > 0)
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Please define following field:<br />" + this.fields,
          type: "danger",
          icon: "fa fa-ban",
          timeout: $store.state.timeout,
        });
      else {
        //Save
        this.signF = "fas fa-circle-notch fa-spin";
        this.saving = true;
        this.optionF = "Saving...";

        if (this.myObj.id > 0) {
          //Edit
          this.myObj.EditBy = this.$store.state.uID;
          if (this.otherObj.isAnnual === true) {
            //console.log.log('Annual');
            this.myObj.Calculated = "Annual";
          } else {
            //console.log.log('Not Annual');
            this.myObj.Calculated = "-";
          }
          var url =
            this.$store.state.domain +
            "/FeeType/Edit?_db=" +
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
                  timeout: $store.state.timeout,
                });
              } else {
                this.modals.showModal = false;
                if (response.data.data.Calculated === "Annual") {
                  response.data.data.Calculated = "Yes";
                } else {
                  response.data.data.Calculated = "No";
                }
                Vue.set(this.tableData, this.eIndex, response.data.data);
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message:
                    'Saved! <br />Fee Type "' + this.myObj.Code + '" updated.',
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
                timeout: $store.state.timeout,
              });
            })
            .finally(() => {
              this.signF = "fas fa-edit";
              this.saving = false;
              this.optionF = "Edit";
            });
        } else {
          //Add

          this.myObj.AddBy = this.$store.state.uID;
          if (this.otherObj.isAnnual === true) {
            //console.log.log('Annual');
            this.myObj.Calculated = "Annual";
          } else {
            //console.log.log('Not Annual');
            this.myObj.Calculated = "-";
          }
          var url =
            this.$store.state.domain +
            "/FeeType/Add?_db=" +
            this.$store.state.db +
            "&cID=" +
            this.$store.state.cID;
          axios
            .post(url, qs.stringify(this.myObj))
            .then((response) => {
              //console.log.log("Before Condition : " + response.data.status);
              if (response.data.status === "error") {
                //console.log.log(response.data.status);
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message: "Request Error! <br />" + response.data.data,
                  type: "danger",
                  icon: "fa fa-ban",
                  timeout: $store.state.timeout,
                });
              } else {
                //console.log.log(response.data.status);
                this.modals.showModal = false;
                this.FillGrid();
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message:
                    'Saved! <br />Fee Type "' + this.myObj.Code + '" added.',
                  type: "success",
                  icon: "fa fa-check",
                  timeout: this.$store.state.timeout,
                });
              }
            })
            .catch(function (error) {
              //console.log.log("Error here: 111 ");
              //console.log.log(error.response);
              //console.log.log(error.message);
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
              this.signF = "fas fa-plus";
              this.saving = false;
              this.optionF = "Add";
            });
        }
      }
    },

    GetError() {
      return this.nameError;
      return this.prefixError;
    },
    AddModal() {
      this.saving = false;
      this.myObj.id = 0;
      this.myObj.Code = "";
      this.myObj.feeType = "";
      this.myObj.Calculated = "";
      this.myObj.AddBy = this.$store.state.uID;
      this.myObj.EditBy = null;

      this.shouldAdd = true;

      this.modals.showModal = true;

      this.signF = "fas fa-plus";
      this.optionName = "Add";
      this.optionF = "Add";
    },

    editRecord(index, row) {
      this.eIndex = index;
      this.saving = false;
      this.myObj.id = row.id;
      this.myObj.Code = row.Code;
      this.myObj.feeType = row.FeeType;
      this.myObj.AddBy = null;
      this.myObj.EditBy = this.$store.state.uID;
      this.myObj.DefaultAmount = row.DefaultAmount;
      if (row.Calculated === "Yes") {
        this.otherObj.isAnnual = true;
      } else {
        this.otherObj.isAnnual = false;
      }

      this.shouldAdd = false;
      this.optionName = "Edit";
      this.modals.showModal = true;
      this.signF = "far fa-edit";
      this.optionF = "Edit";
      //console.log.log('Row: ', row);
    },
    handleDelete(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to delete  " + row.Code + " - " + row.FeeType + "?",
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
            "/FeeType/DeleteConfirmed?cID=" +
            this.$store.state.cID +
            "&id=" +
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
                  timeout: $store.state.timeout,
                });
              } else {
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message: 'Saved! <br />Fee Type "' + row.Code + '" removed.',
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
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
