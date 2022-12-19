<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Manage Sellers</h6>
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
                  >First Name</label
                >
                <div class="col-md-8">
                  <base-input
                    placeholder="Enter first name"
                    v-model="myObj.firstName"
                  ></base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Last Name</label
                >
                <div class="col-md-8">
                  <base-input
                    placeholder="Enter last name"
                    v-model="myObj.lastName"
                  ></base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Business Name</label
                >
                <div class="col-md-8">
                  <base-input
                    placeholder="Enter business name"
                    v-model="myObj.business_name"
                  ></base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Contact #</label
                >
                <div class="col-md-8">
                  <base-input
                    placeholder="Enter contact"
                    v-model="myObj.contact"
                  ></base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Email</label
                >
                <div class="col-md-8">
                  <base-input
                    placeholder="Enter email"
                    v-model="myObj.email"
                  ></base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Paypal</label
                >
                <div class="col-md-8">
                  <base-input
                    placeholder="Enter paypal"
                    v-model="myObj.paypal"
                  ></base-input>
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

          <div class="col-md-12">
            <base-input
              placeholder="Search sellers"
              v-model="searchInput"
              v-on:keyup.enter="searchDataa"
            ></base-input>
          </div>

          <div>
            <div
              class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
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
                    @click.native="handleAccept($index, row)"
                    class="remove btn-link"
                    type="primary"
                    size="sm"
                    icon
                  >
                    <i class="text-white fas fa-check-circle"></i>
                  </base-button>

                  <base-button
                    @click.native="handleSuspend($index, row)"
                    class="remove btn-link"
                    type="danger"
                    size="sm"
                    icon
                  >
                    <i class="text-white fas fa-pause"></i>
                  </base-button>

                  <base-button
                    @click.native="handleDelete($index, row)"
                    class="remove btn-link"
                    type="danger"
                    size="sm"
                    icon
                  >
                    <i class="text-white fas fa-times"></i>
                  </base-button>

                  <!-- <base-button
                    @click="editRecord($index, row)"
                    class="like btn-link"
                    type="primary"
                    size="sm"
                    icon
                  >
                    <i class="text-white far fa-edit"></i>
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
import users from "../Tables/users2";
import axios from "axios";
import qs from "qs";
import Vue from "vue";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";
import Multiselect from "vue-multiselect";
Vue.use(axios);
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
    flatPicker,
  },
  created() {
    this.Authenticator();
    this.LoadData();
  },
  mounted() {
    this.Authenticator();
  },
  data() {
    return {
      searchInput: "",
      myObj: {
        user_id: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        verification_code: null,
        isAuthenticated: true,
        isApproved: true,
        isSuspended: false,
        suspendedTill: null,
        defaultSize: null,
        userInfo: null,
        user_role: 1,
        business_name: null,
        contact: null,
        paypal: null,
        address: null,
      },
      propsToSearch: ["firstName", "email"],
      tableColumns: [
        {
          prop: "firstName",
          label: "First Name",
          minWidth: 150,
          sortable: true,
        },
        {
          prop: "lastName",
          label: "Last Name",
          minWidth: 150,
          sortable: true,
        },
        {
          prop: "email",
          label: "Email",
          minWidth: 135,
          sortable: false,
        },
        {
          prop: "phone",
          label: "Contact #",
          minWidth: 150,
          sortable: true,
        },
        {
          prop: "address",
          label: "Address",
          minWidth: 250,
          sortable: true,
        },
        {
          prop: "city",
          label: "City",
          minWidth: 120,
          sortable: true,
        },
        {
          prop: "statuss",
          label: "Status",
          minWidth: 120,
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
    Authenticator() {
      console.log("### vetter ######", this.$store.state.isVetter);
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
    searchDataa() {
      console.log("Searching:", this.searchInput);
      if (this.searchInput.length > 0) {
        var url =
          this.$store.state.domain + "/shippings/get/" + this.searchInput;
        axios
          .get(url)
          .then((response) => {
            if (response.data.status === "error") {
            } else {
              console.log(response.data);
              this.tableData = [];
              response.data.forEach((elem) => {
                if (elem.statuss === "1") {
                  elem.statuss = "Approved";
                  this.tableData.push(elem);
                } else if (elem.statuss === "0") {
                  elem.statuss = "Pending";
                  this.tableData.push(elem);
                } else if (elem.statuss === "-1") {
                  elem.statuss = "Rejected";
                  this.tableData.push(elem);
                } else if (elem.statuss === "-2") {
                  elem.statuss = "Suspended";
                  this.tableData.push(elem);
                }
              });
            }
          })
          .catch(function (error) {
            //console.log.log(error);
          });
      } else {
        this.LoadData();
      }
    },
    LoadData() {
      var url = this.$store.state.domain + "/shippings/get";
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
          } else {
            response.data.forEach((elem) => {
              if (elem.statuss === "1") {
                elem.statuss = "Approved";
                this.tableData.push(elem);
              } else if (elem.statuss === "0") {
                elem.statuss = "Pending";
                this.tableData.push(elem);
              } else if (elem.statuss === "-1") {
                elem.statuss = "Rejected";
                this.tableData.push(elem);
              } else if (elem.statuss === "-2") {
                elem.statuss = "Suspended";
                this.tableData.push(elem);
              }
            });
          }
        })
        .catch(function (error) {});
    },
    Validate() {
      if (this.myObj.firstName == null || this.myObj.firstName.length === 0) {
        this.$notify({
          verticalAlign: "bottom",
          horizontalAlign: "center",
          message: "Error! <br />" + "Please enter first name",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
      } else if (this.myObj.email == null || this.myObj.email.length === 0) {
        this.$notify({
          verticalAlign: "bottom",
          horizontalAlign: "center",
          message: "Error! <br />" + "Please enter email",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
      } else if (
        this.myObj.password == null ||
        this.myObj.password.length === 0
      ) {
        this.$notify({
          verticalAlign: "bottom",
          horizontalAlign: "center",
          message: "Error! <br />" + "Please enter password",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
      } else {
        //console.log.log(this.myObj);
        if (this.myObj.user_id === 0) {
          //Add
          var url = this.$store.state.domain + "/registrations";

          axios
            .post(url, this.myObj)
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
                this.modals.showModal = false;
                this.LoadData();
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message: "Saved! <br />New vetter added",
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
        } else {
          //Edit

          var url =
            this.$store.state.domain + "/registrations/" + this.myObj.user_id;

          axios({
            method: "put",
            url: url,
            data: this.myObj,
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
                this.LoadData();
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message: "Saved! <br /> Vetter updated",
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

      this.myObj.user_id = 0;
      this.myObj.firstName = "";
      this.myObj.lastName = "";
      this.myObj.email = "";
      this.myObj.password = "";
      this.myObj.verification_code = null;
      this.myObj.isAuthenticated = true;
      this.myObj.isApproved = true;
      this.myObj.isSuspended = false;
      this.myObj.suspendedTill = null;
      this.myObj.defaultSize = null;
      this.myObj.userInfo = null;
      this.myObj.user_role = 1;
      this.myObj.business_name = null;
      this.myObj.contact = null;
      this.myObj.paypal = null;
      this.myObj.address = null;
    },
    editRecord(index, row) {
      this.eIndex = index;
      this.saving = false;
      this.optionName = "Edit";
      this.modals.showModal = true;
      this.sign = "far fa-edit";

      this.myObj.user_id = row.user_id;
      this.myObj.firstName = row.firstName;
      this.myObj.lastName = row.lastName;
      this.myObj.email = row.email;
      this.myObj.password = row.password;
      this.myObj.verification_code = row.verification_code;
      this.myObj.isAuthenticated = row.isAuthenticated;
      this.myObj.isApproved = row.isApproved;
      this.myObj.isSuspended = row.isSuspended;
      this.myObj.suspendedTill = row.suspendedTill;
      this.myObj.defaultSize = null;
      this.myObj.userInfo = row.userInfo;
      this.myObj.user_role = 1;
      this.myObj.business_name = row.business_name;
      this.myObj.contact = row.contact;
      this.myObj.paypal = row.paypal;
      this.myObj.address = row.address;
    },
    handleDelete(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to reject " + row.firstName + " with all his listings?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Yes, reject it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          var url =
            this.$store.state.domain + `/registrations/reject/${row.user_id}`;
          console.log(url);
          axios
            .put(url)
            .then((response) => {
              console.log("R", response);
              if (response.data.status === "error") {
                console.log(response.data.status);
              } else {
                axios
                  .post(this.$store.state.domain + "/signup", {
                    emailTo: row.email,
                    emailType: "rejected",
                  })
                  .then((res) => {
                    console.log(res);
                    this.$notify({
                      verticalAlign: "bottom",
                      horizontalAlign: "center",
                      message:
                        'Done! <br />Seller "' + row.firstName + '" rejected.',
                      type: "danger",
                      icon: "fa fa-check",
                      timeout: this.$store.state.timeout,
                    });

                    location.reload();
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      });
    },

    handleSuspend(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to suspend " + row.firstName + "?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Yes, suspend it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          var url =
            this.$store.state.domain + `/registrations/suspend/${row.user_id}`;
          //console.log.log(url);
          axios
            .put(url)
            .then((response) => {
              ////console.log.log("R", response);
              if (response.data.status === "error") {
              } else {
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message:
                    'Done! <br />Seller "' + row.firstName + '" suspended.',
                  type: "danger",
                  icon: "fa fa-check",
                  timeout: this.$store.state.timeout,
                });

                location.reload();

                // axios
                //   .post(this.$store.state.domain + "/signup", {
                //     emailTo: row.email,
                //     emailType: "rejected",
                //   })
                //   .then((res) => {
                //     //console.log.log(res);
                //   })
                //   .catch((err) => {
                //     //console.log.error(err);
                //   });
              }
            })
            .catch(function (error) {});
        }
      });
    },

    handleAccept(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to a accept " + row.email + " as official seller?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Yes, Accept please!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          var url =
            this.$store.state.domain + `/registrations/accept/${row.user_id}`;
          //console.log.log(url);
          axios
            .put(url)
            .then((response) => {
              ////console.log.log("R", response);
              if (response.data.status === "error") {
              } else {
                axios
                  .post(this.$store.state.domain + "/signup", {
                    emailTo: row.email,
                    emailType: "approved",
                  })
                  .then((res) => {
                    //console.log.log(res);
                    this.$notify({
                      verticalAlign: "bottom",
                      horizontalAlign: "center",
                      message:
                        'Done! <br />Seller "' +
                        row.firstName +
                        '" has been accepted.',
                      type: "success",
                      icon: "fa fa-check",
                      timeout: this.$store.state.timeout,
                    });

                    location.reload();
                  })
                  .catch((err) => {
                    //console.log.error(err);
                  });
              }
            })
            .catch(function (error) {});
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
