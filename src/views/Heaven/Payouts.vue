<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Manage Payouts</h6>
        </div>
      </div>
    </base-header>
    <div>
      <div class="container-fluid mt--6">
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
                <div class="row col-12">
                  <div class="col-md-2 col-sm-6 col-12">
                    <base-input addon-left-icon="ni ni-calendar-grid-58">
                      <flat-picker
                        slot-scope="{ focus, blur }"
                        @on-open="focus"
                        @on-close="blur"
                        :config="{ allowInput: true, mode: 'range' }"
                        class="form-control datepicker"
                        @focusout="checkDate()"
                        v-model="pdates.range"
                      >
                      </flat-picker>
                    </base-input>
                  </div>

                  <div class="col-md-auto col-sm-6 col-12">
                    <base-button>
                      <!-- <span class="btn-inner--icon "
                    ><i class=" fa fa-download"></i
                  ></span> -->
                      <downloadexcel
                        :fetch="fetchData"
                        :fields="json_fields"
                        :before-finish="finishDownload"
                        icon
                        type="primary"
                      >
                        <i v-bind:class="sign"> </i>
                        Export Payouts
                      </downloadexcel>
                    </base-button>
                    <!-- <div style="margin-bottom: 25px" class="">
                <base-button icon type="primary"   >
                  <span class="btn-inner--icon "
                    ><i class="fas fa-edit"></i
                  ></span>
                  <span class="btn-inner--text">Export Payouts</span>
                </base-button>
              </div> -->
                  </div>

                  <div class="col-md-8 col-sm-0 col-0"></div>
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
import downloadexcel from "vue-json-excel";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";
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
    flatPicker,
    downloadexcel,
  },
  created() {
    this.Authenticator();
    this.LoadData();
    //  //console.log.log( this.splitedDate)
    //  //console.log.log(this.pdates.range);
  },
  mounted() {
    this.Authenticator();
  },
  data() {
    return {
      json_fields: {
        from: "from",
        to: "to",
        name: "name",
        email: "email",
        mobile: "mobile",
        username: "username",
        city: "city",
        payoutAmount: "payoutAmount",
        mode_of_payment: "mode_of_payment",
        payment_details: "payment_details",
      },

      pdates: {
        range: "",
      },
      myObj: {},
      splitDate: {
        splitedDate: "",
        from: "",
        to: "",
      },
      propsToSearch: ["firstName", "email"],
      tableColumns: [
        {
          prop: "name",
          label: "Seller",
          minWidth: 220,
          sortable: true,
        },
        {
          prop: "email",
          label: "Email",
          minWidth: 150,
          sortable: true,
        },
        {
          prop: "mobile",
          label: "Mobile",
          minWidth: 120,
          sortable: true,
        },
        {
          prop: "payoutAmount",
          label: "Amount",
          minWidth: 135,
          sortable: false,
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
      // currentDate: moment().format("YYYY-MM-DD"),
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
    checkDate() {
      this.splitDate.from = "";
      this.splitDate.to = "";
      this.splitDate.splitedDate = this.pdates.range.split(" ");
      this.splitDate.from = this.splitDate.splitedDate[0];
      this.splitDate.to = this.splitDate.splitedDate[2];
      //console.log.log(this.splitDate.from);
      //console.log.log(this.splitDate.to);
      // if(this.splitDate.from != '' || this.splitDate.to != '' )
      // {
      //   //console.log.log("check");
      //   this.fetchData();
      //   this.startDownload();
      //   this.finishDownload();
      // }
    },

    async fetchData() {
      this.splitDate.from = "";
      this.splitDate.to = "";
      this.splitDate.splitedDate = this.pdates.range.split(" ");
      this.splitDate.from = this.splitDate.splitedDate[0];
      this.splitDate.to = this.splitDate.splitedDate[2];
      //console.log.log(this.splitDate.from);
      //console.log.log(this.splitDate.to);

      if (this.splitDate.from != undefined && this.splitDate.to != undefined) {
        if (this.splitDate.from != " " && this.splitDate.to != " ") {
          //console.log.log(this.splitDate.from);
          //console.log.log(this.splitDate.to);
          //console.log.log(0);
          this.sign = "fas fa-circle-notch fa-spin";

          const response = await axios.post(
            "https://api.thrillerme.com/orders/export",
            {
              from: this.splitDate.from,
              to: this.splitDate.to,
            }
          );
          // .then((response) => {
          //   if (response.data.status === "error")
          //   {
          //     this.sign = "";
          //   }
          //   else
          //   {
          //      this.sign = "";
          //     //console.log.log(response);

          //   }
          // })
          // .catch(function (error) {

          // });
          this.sign = "";
          this.tableData = response.data;
          return response.data;
        }
      } else {
        this.$notify({
          verticalAlign: "bottom",
          horizontalAlign: "center",
          message: "Error! <br />" + "Please select date range",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
      }

      //   if(this.splitDate.from  != '' && this.splitDate.to != '' )
      //   {
      // //  //console.log.log(this.splitDate.from);
      // //  //console.log.log(this.splitDate.to);
      //     //console.log.log(0);
      //   const response = await axios.get("https://api.thrillerme.com/shoes");
      //   //console.log.log(response);
      //   return response.data;

      //    }

      //    else if(this.splitDate.from == '' || this.splitDate.to == '' )
      //     {
      //       //console.log.log("run");
      //       //  this.$notify({
      //       //   verticalAlign: "bottom",
      //       //   horizontalAlign: "center",
      //       //   message: "Error! <br />" + "Please select date range",
      //       //   type: "danger",
      //       //   icon: "fa fa-ban",
      //       //   timeout: 0,
      //       // });

      //     }
      //   else
      //   {
      //     //console.log.log(0);
      //     const response = await axios.get("https://api.thrillerme.com/shoes");
      //     //console.log.log(response);
      //     return response.data;
      //   }
    },

    // startDownload()
    // {

    //   },
    //       else if(this.splitDate.from.length != 0 && this.splitDate.to.length != 0 )
    //       {
    // //console.log.log("Check2 ");
    //          this.sign = "";
    //            this.$notify({
    //           verticalAlign: "bottom",
    //           horizontalAlign: "center",
    //           message: "Error! <br />" + "Please select date range",
    //           type: "danger",
    //           icon: "fa fa-ban",
    //           timeout: 0,
    //         });
    //       }
    //  else
    //  {
    //    //console.log.log("Check3");

    //    this.sign = "";
    //    this.$notify({
    //     verticalAlign: "bottom",
    //     horizontalAlign: "center",
    //     message: "Error! <br />" + "Please select correct date range",
    //     type: "danger",
    //     icon: "fa fa-ban",
    //     timeout: 0,
    //   });
    //  }

    finishDownload() {
      //console.log.log("finish");
      // this.sign = "fas fa-circle-notch fa-spin";
    },

    SplitString() {
      this.splitedDate = this.pdates.range.split(" ");
    },
    getdate() {
      this.splitDate.splitedDate = this.pdates.range.split(" ");
      this.splitDate.from = this.splitDate.splitedDate[0];
      this.splitDate.to = this.splitDate.splitedDate[2];
      //console.log.log(this.splitDate.from);
      //console.log.log(this.splitDate.to);
    },

    LoadData() {
      // var url = this.$store.state.domain + "/registrations/role/3";
      // axios
      //   .get(url)
      //   .then((response) => {
      //     if (response.data.status === "error") {
      //     } else {
      //       this.tableData = response.data;
      //     }
      //   })
      //   .catch(function (error) {});
    },
    Updates: {
      range: "",
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
                //this.LoadData();
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
                //this.LoadData();
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
      this.myObj.user_role = 3;
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
      this.myObj.user_role = 3;
      this.myObj.business_name = row.business_name;
      this.myObj.contact = row.contact;
      this.myObj.paypal = row.paypal;
      this.myObj.address = row.address;
    },
    handleDelete(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to delete reject " + row.name + "?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$notify({
            verticalAlign: "bottom",
            horizontalAlign: "center",
            message: 'Saved! <br />Inquiry of "' + row.name + '" removed.',
            type: "danger",
            icon: "fa fa-check",
            timeout: this.$store.state.timeout,
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
