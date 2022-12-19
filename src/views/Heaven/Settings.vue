<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Update Settings</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
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
              <base-input
                label="Banner Title:"
                class="mb-3"
                name="batch"
                type="text"
                placeholder="Enter Title"
                v-model="myObj.title"
              />

              <base-input
                label="Button Text:"
                class="mb-3"
                name="batch"
                type="text"
                placeholder="Enter Button Text"
                v-model="myObj.buttonText"
              />

              <label class="btn btn-success col">
                <input
                  type="file"
                  id="file"
                  ref="file"
                  @change="selectFile"
                  accept="image/*"
                />
              </label>
              <div>
                <base-button
                  @click="Upload()"
                  :disabled="saving"
                  type="primary"
                  class="col"
                  ><i v-bind:class="sign"></i> {{ this.optionName }}
                </base-button>
              </div>
            </form>
          </template>
        </card>
      </modal>

      <modal
        :show.sync="modals.showCostModal"
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
                <label class="col-md-6 col-form-label form-control-label"
                  >Delivery (with in Dubai)</label
                >
                <div class="col-md-6">
                  <base-input
                    placeholder="Enter delivery amount"
                    v-model="myCostObj.deliveryIn"
                  ></base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-6 col-form-label form-control-label"
                  >Delivery (outside Dubai)</label
                >
                <div class="col-md-6">
                  <base-input
                    placeholder="Enter delivery amount"
                    v-model="myCostObj.deliveryOut"
                  ></base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-6 col-form-label form-control-label"
                  >Paypal Fee (%)</label
                >
                <div class="col-md-6">
                  <base-input
                    placeholder="Enter percentage"
                    v-model="myCostObj.processingFee"
                  ></base-input>
                </div>
              </div>
              <div class="form-group row mb--2">
                <label class="col-md-6 col-form-label form-control-label"
                  >Quidash Fee</label
                >
                <div class="col-md-6">
                  <base-input
                    placeholder="Enter delivery amount "
                    v-model="myCostObj.quidashIn"
                  ></base-input>
                </div>
              </div>
              <div class="form-group row mb--2">
                <label class="col-md-6 col-form-label form-control-label"
                  >Marketplace Share (%)</label
                >
                <div class="col-md-6">
                  <base-input
                    placeholder="Enter percentage"
                    v-model="myCostObj.marketplaceShare"
                  ></base-input>
                </div>
              </div>

              <div>
                <base-button
                  :disabled="saving"
                  @click="AddCostSettings()"
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
              class="
                col-12
                d-flex
                justify-content-center justify-content-sm-between
                flex-wrap
              "
            >
              <div style="margin-bottom: 5px">
                <base-button
                  icon
                  type="primary"
                  @click="AddModal()"
                  :disabled="isLoading"
                >
                  <span class="btn-inner--icon"
                    ><i class="fas fa-edit"></i
                  ></span>
                  <span class="btn-inner--text">Update Banner</span>
                </base-button>

                <!-- <div >
                <base-button icon type="primary" @click="AddModal()">
                  <span class="btn-inner--icon"
                    ><i class="fas fa-edit"></i
                  ></span>
                  <span class="btn-inner--text">Add Vetter</span>
                </base-button>
              </div> -->
                <!-- Cost button -->
                <base-button
                  icon
                  type="primary"
                  @click="AddCostModal()"
                  :disabled="isLoading"
                >
                  <span class="btn-inner--icon"
                    ><i class="fas fa-edit"></i
                  ></span>
                  <span class="btn-inner--text">Update Cost</span>
                </base-button>

                <!-- <base-button icon type="primary" @click="AddModal()">
                  <span class="btn-inner--icon"
                    ><i class="fas fa-edit"></i
                  ></span>
                  <span class="btn-inner--text">Update Footer</span>
                </base-button> -->
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
              <!-- <el-table-column min-width="180px" align="right" label="Options">
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
              </el-table-column> -->
            </el-table>
          </div>
          <div
            slot="footer"
            class="
              col-12
              d-flex
              justify-content-center justify-content-sm-between
              flex-wrap
            "
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

export default {
  mixins: [clientPaginationMixin],
  components: {
    BasePagination,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  created() {
    this.Authenticator();
    // LoadData();
    this.LoadCostData();
    var url = this.$store.state.domain + "/Banners";
    axios
      .get(url)
      .then((response) => {
        if (response.data.status === "error") {
        } else {
          this.myObj = response.data[0];
          this.isLoading = false;
          //console.log.log(myObj);
          this.tableData.push(this.myObj);
        }
      })
      .catch(function (error) {});
  },
  mounted() {
    this.Authenticator();
  },
  data() {
    return {
      isLoading: true,
      myObj: {},
      myCostObj: {},
      propsToSearch: ["batch"],
      tableColumns: [
        {
          type: "selection",
        },
        {
          prop: "title",
          label: "Banner title",
          minWidth: 800,
          sortable: true,
        },
        {
          prop: "buttonText",
          label: "Button Text",
          minWidth: 800,
          sortable: true,
        },
      ],
      tableData: [],
      selectedRows: [],
      modals: {
        showModal: false,
        showCostModal: false,
      },
      optionName: "Update Banner",
      file: "",
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
    Authenticator() {
      //console.log(this.$store.state.myUser.email , this.$store.state.myUser.password );
      if (
        this.$store.state.myUser.email == null ||
        this.$store.state.myUser.password == null ||
        this.$store.state.myUser.email == "" ||
        this.$store.state.myUser.password == ""
      ) {
        console.log("Hi If");
        this.$store.state.myUser.email = "";
        this.$store.state.myUser.password = "";

        return this.$router.push("/login");
      } else if (
        this.$store.state.isVetter == null ||
        this.$store.state.isVetter
      ) {
        return this.$router.push("/login");
      }
    },
    LoadCostData() {
      var url = "https://api.thrillerme.com/settings";
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
          } else {
            this.myCostObj = response.data.result[0];
          }
        })
        .catch(function (error) {});
    },
    Upload() {
      //console.log.log("File:", this.file);
      this.optionName = "Uploading...";
      if (this.file !== "") {
        let formData = new FormData();
        formData.append("file", this.file);
        //console.log.log(this.file);
        axios
          .post("https://upload.appick.io/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((e) => {
            //console.log.log(e.data);
            // this.file = undefined;
            var fn = e.data.myresp[0].path;
            this.myObj.imageURL = fn;
            this.updateBanner();
          });
      } else {
        this.updateBanner();
      }
    },
    AddCostSettings() {
      //Add
      var url = "https://api.thrillerme.com/settings";

      axios
        .post(url, this.myCostObj)
        .then((response) => {
          //console.log.log(response);
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
            this.modals.showCostModal = false;
            this.LoadData();
            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message: "Saved! <br />New Setting Updated",
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
    },
    updateBanner() {
      var url = this.$store.state.domain + "/banners/" + this.myObj.banner_id;

      //console.log.log("url:", url);
      //console.log.log("data:", this.myObj);
      axios
        .put(url, this.myObj)
        .then((response) => {
          //console.log.log(response);
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
            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message: "Saved! <br /> Banner updated.",
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
        });

      //Update Banner API
      ////console.log.log(fn);
      this.optionName = "Update Banner";
      this.modals.showModal = false;
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
    Validate() {
      if (this.myObj.batch.length === 0) {
        this.nameError = "Enter Batch";
      } else {
        //Save to DB

        this.sign = "fas fa-circle-notch fa-spin";
        this.saving = true;
        this.optionName = "Saving";
        if (this.myObj.id > 0) {
          //Edit
          var url =
            this.$store.state.domain +
            "/Batch/Edit?_db=" +
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
                    'Saved! <br />Batch "' + this.myObj.batch + '" updated.',
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
          //console.log.log("Obj: ", this.myObj);
          var url =
            this.$store.state.domain +
            "/Batch/Create?_db=" +
            this.$store.state.db +
            "&cID=" +
            this.$store.state.cID;
          axios
            .post(url, qs.stringify(this.myObj))
            .then((response) => {
              if (response.data.status === "error") {
                //console.log.log("Error", response.data);
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
                    'Saved! <br />Batch "' + this.myObj.batch + '" added.',
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
              this.optionName = "Update Banner";
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
      this.shouldAdd = true;
      this.optionName = "Update Banner";
      this.modals.showModal = true;
      this.sign = "fas fa-user-plus";
    },
    AddCostModal() {
      this.LoadCostData();
      this.saving = false;
      this.shouldAdd = true;
      this.optionName = "Add";
      this.modals.showCostModal = true;
      this.sign = "fas fa-user-plus";

      // this.myObj.user_id = 0;
      // this.myObj.firstName = "";
      // this.myObj.lastName = "";
      // this.myObj.email = "";
      // this.myObj.password = "";
      // this.myObj.verification_code = null;
      // this.myObj.isAuthenticated = true;
      // this.myObj.isApproved = true;
      // this.myObj.isSuspended = false;
      // this.myObj.suspendedTill = null;
      // this.myObj.defaultSize = null;
      // this.myObj.userInfo = null;
      // this.myObj.user_role = 3;
      // this.myObj.business_name = null;
      // this.myObj.contact = null;
      // this.myObj.paypal = null;
      // this.myObj.address = null;
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
