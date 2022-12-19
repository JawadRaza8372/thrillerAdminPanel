<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Manage Orders</h6>
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
                  >Notes</label
                >
                <div class="col-md-8">
                  <base-input>
                    <textarea
                      class="form-control"
                      v-model="myObj.note"
                      id="note"
                      placeholder="Enter notes"
                      rows="3"
                    >
                    </textarea>
                  </base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Status</label
                >
                <div class="col-md-8">
                  <multiselect
                    style="margin-bottom: 15px"
                    placeholder="Status"
                    v-model="collectionData"
                    :options="collectionOptions"
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
                </div>
              </div>

              <label class="btn btn-success col">
                <input
                  type="file"
                  id="file"
                  ref="file"
                  multiple
                  @change="selectFile"
                  accept="image/*"
                />
              </label>

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

      <modal
        :show.sync="modals.showModalImgs"
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
              <div v-for="img in imgs" :key="img.imageURL">
                <img style="width: 20vw; margin: 10px" :src="img.imageURL" />
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
                    @click.native="handleEdit($index, row)"
                    class="remove btn-link"
                    type="primary"
                    size="sm"
                    icon
                  >
                    <i class="text-white fas fa-edit"></i>
                  </base-button>

                  <base-button
                    @click.native="handleView($index, row)"
                    class="remove btn-link"
                    type="primary"
                    size="sm"
                    icon
                  >
                    <i class="text-white fas fa-image"></i>
                  </base-button>

                  <base-button
                    @click.native="handleAccept($index, row)"
                    class="remove btn-link"
                    type="success"
                    size="sm"
                    icon
                  >
                    <i class="text-white fas fa-check-circle">
                      <span style="margin-left: 10px">Pickup</span></i
                    >
                  </base-button>

                  <base-button
                    @click.native="handlePrint($index, row)"
                    class="remove btn-link"
                    type="success"
                    size="sm"
                    icon
                  >
                    <i class="text-white fas fa-print"></i>
                  </base-button>

                  <base-button
                    @click.native="handleTrack($index, row)"
                    class="remove btn-link"
                    type="primary"
                    size="sm"
                    icon
                  >
                    <i class="text-white fas fa-map-marker-alt"></i>
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
import users from "../Tables/users2";
import axios from "axios";
import qs from "qs";
import Vue from "vue";
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
  },
  created() {
    this.Authenticator();

    //   var url = this.$store.state.domain + "/orders";
    //   axios
    //     .get(url)
    //     .then((response) => {
    //       if (response.data.status === "error") {
    //         //this.$notify({verticalAlign: 'bottom', horizontalAlign: 'center', message: 'Request Error! <br />' + response.data.status.data, type: 'danger', icon: 'fa fa-ban',timeout: 0 });
    //       } else {
    //         response.data.data.forEach((element) => {
    //           if (element.date !== null)
    //             element.date = moment(element.date).format("DD MMM YYYY, ddd");
    //         });
    //         this.tableData = response.data.data;
    //       }
    //     })
    //     .catch(function (error) {});
  },
  mounted() {
    this.Authenticator();
    this.LoadData();
  },
  data() {
    return {
      file: "",
      selectedFiles: undefined,
      myObj: {
        id: 0,
        note: "",
        sellerEmail: "",
        order_id: 0,
        Name: "",
        fatherName: "",
        contactNum: "",
        MobNum: "",
        PurposeOfVisit: null,
        status: null,
        date: null,
      },
      imgs: [],
      collectionData: { id: "Pending", name: "Pending" },
      collectionOptions: [
        { id: "Pending", name: "Pending" },
        { id: "Under Review", name: "Under Review" },
        { id: "Verified", name: "Verified" },
        { id: "Rejected", name: "Rejected" },
        { id: "Delivered", name: "Delivered" },
      ],
      options: [
        { id: "Monday", name: "Monday" },
        { id: "Tueday", name: "Tueday" },
        { id: "Wednesday", name: "Wednesday" },
        { id: "Thursday", name: "Thursday" },
        { id: "Ebad", name: "Ebad" },
        { id: "Saturday", name: "Saturday" },
        { id: "Sunday", name: "Sunday" },
      ],
      value: { id: "Monday", name: "Monday" },
      propsToSearch: ["Name", "fatherName", "contactNum"],
      tableColumns: [
        {
          prop: "order_id",
          label: "Order #",
          minWidth: 80,
          sortable: true,
        },
        {
          prop: "date",
          label: "Date",
          minWidth: 80,
          sortable: true,
        },
        {
          prop: "sku",
          label: "Sku #",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "product",
          label: "Item",
          minWidth: 200,
          sortable: true,
        },
        {
          prop: "price",
          label: "Bill",
          minWidth: 150,
        },
        {
          prop: "status",
          label: "Status",
          minWidth: 135,
          sortable: true,
        },
      ],
      tableData: [],
      selectedRows: [],
      modals: {
        showModal: false,
        showModalImgs: false,
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
      //currentDate: moment().format("YYYY-MM-DD"),
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
    splitDate() {
      //var dts = this.myObj.date.split("-");
      console.log(this.myObj.date[0]);
      //  if (this.myObj.date !== "") {
      //       var dts = this.myObj.date.split("-");
      //       this.myObj.date = dts[0] + "-" + dts[1] + "-" + dts[2];
      //       console.log( this.myObj.date)
      //     } else {
      //       this.myObj.date = null;
      //     }
    },
    LoadData() {
      var url = this.$store.state.domain + "/orders/get";
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
          } else {
            response.data.forEach((elem) => {
              elem.date = elem.date.split("T")[0];
              this.tableData.push(elem);
            });
          }
        })
        .catch(function (error) {});
    },
    Validate() {
      if (this.collectionData !== null && this.collectionData !== undefined) {
        this.sign = "fas fa-circle-notch fa-spin";
        this.saving = true;
        this.optionName = "Saving";
        axios
          .put(this.$store.state.domain + "/orders/updateStatus", {
            order_id: this.myObj.order_id,
            note: this.myObj.note,
            status: this.collectionData.id,
          })
          .then((res) => {
            console.log("note", res);

            //Send Email
            if (this.collectionData.id === "Rejected") {
              axios
                .post(this.$store.state.domain + "/signup", {
                  emailTo: this.myObj.sellerEmail,
                  emailType: "productRejected",
                  title: "Product Rejected - Thriller",
                  text:
                    "The product you sent for shipping is not authentic, we are sending it back to you.",
                })
                .then((res) => {
                  console.log("email", res);
                })
                .catch((err) => {
                  console.log("Error", err);
                });
            }
            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message: "Saved! <br />Order updated.",
              type: "success",
              icon: "fa fa-check",
              timeout: this.$store.state.timeout,
            });
            if (this.selectedFiles !== undefined) {
              let formData = new FormData();
              for (let index = 0; index < this.selectedFiles.length; index++) {
                const element = this.selectedFiles[index];
                //console.log("elem", element);
                formData.append("file", element);
              }

              axios
                .post(this.$store.state.upload, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((e) => {
                  e.data.myresp.forEach((elem) => {
                    console.log(elem.path);
                    axios
                      .post(this.$store.state.domain + "/orderImages", {
                        order_id: this.myObj.order_id,
                        imageURL: "https://appick.io/u/" + elem.path,
                      })
                      .then((res) => {
                        console.log("image uploaded", res);
                      })
                      .catch((err) => {
                        console.error("upload error", err);
                      });
                  });
                })
                .catch((error) => {
                  console.log("Server Error on saving: ", error);
                });
            }
          })
          .catch((err) => {
            console.error("note", err);
          })
          .finally(() => {
            this.sign = "fas fa-user-plus";
            this.saving = false;
            this.optionName = "Add";
            this.selectedFiles = undefined;
            this.modals.showModal = false;
            this.LoadData();
          });
      } else {
        this.$notify({
          verticalAlign: "bottom",
          horizontalAlign: "center",
          message: "Error! <br />Please select the status.",
          type: "danger",
          icon: "fa fa-error",
          timeout: this.$store.state.timeout,
        });
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

      this.myObj.date = this.currentDate;
      (this.myObj.id = 0),
        (this.myObj.Name = ""),
        (this.myObj.fatherName = ""),
        (this.myObj.contactNum = ""),
        (this.myObj.MobNum = ""),
        (this.myObj.PurposeOfVisit = null),
        (this.myObj.status = null);
    },
    editRecord(index, row) {
      this.eIndex = index;
      this.saving = false;
      this.optionName = "Edit";
      this.modals.showModal = true;
      this.sign = "far fa-edit";

      (this.myObj.id = row.id),
        (this.myObj.Name = row.Name),
        (this.myObj.fatherName = row.fatherName),
        (this.myObj.contactNum = row.contactNum),
        (this.myObj.MobNum = row.MobNum),
        (this.myObj.PurposeOfVisit = row.PurposeOfVisit),
        (this.myObj.status = row.status);

      var ts = moment(row.date, "DD MMM YYYY, ddd").valueOf();
      this.myObj.date = moment(ts).format("YYYY-MM-DD");
    },
    handleEdit(index, row) {
      this.selectedFiles = undefined;
      this.eIndex = index;
      this.myObj.order_id = 0;
      this.myObj.note = "";
      (this.myObj.sellerEmail = ""), (this.myObj.note = row.note);
      this.myObj.sellerEmail = row.sellerEmail;
      this.myObj.order_id = row.order_id;
      this.collectionData = {
        id: row.status,
        name: row.status,
      };
      this.saving = false;
      this.optionName = "Edit";
      this.modals.showModal = true;
      this.sign = "far fa-edit";
    },
    handleTrack(index, row) {
      console.log(row);
      if (row.dropoff === null) {
        if (row.phaseOnedropoff !== null) {
          window.open(row.phaseOnedropoff);
        } else {
          this.$notify({
            verticalAlign: "bottom",
            horizontalAlign: "center",
            message: "Error! <br />Please wait for the vendor to call quiqup",
            type: "danger",
            icon: "fa fa-error",
            timeout: this.$store.state.timeout,
          });
        }
      } else {
        window.open(row.dropoff);
      }
    },
    handleView(index, row) {
      this.imgs = [];
      axios
        .get(this.$store.state.domain + "/orderImages/" + row.order_id)
        .then((res) => {
          this.imgs = res.data;
          console.log(this.imgs);
          this.modals.showModalImgs = true;
        });
    },
    handleAccept(index, row) {
      axios
        .get(this.$store.state.domain + "/shippings/" + row.buyerId)
        .then((res) => {
          var orderKind = "Partner_same_day";
          if (res.data.city !== "Dubai") orderKind = "Partner_next_day";
          var obj = {
            name: res.data.firstName + " " + res.data.lastName,
            phone: res.data.phone,
            order_id: row.order_id,
            kind: orderKind,
            address: res.data.address,
            lat: res.data.latitude,
            long: res.data.longitude,
            city: res.data.city,
            product: row.product,
          };
          console.log("ship", res);
          axios
            .post(this.$store.state.domain + "/quiqup/ecommerce", obj)
            .then((ress) => {
              console.log("done", ress);
              console.log(ress);
              this.LoadData();
              window.open(ress.data.order.origin.tracking_url);
            })
            .catch((err) => {
              console.error("error:", err);
            });
        });
    },
    handlePrint(index, row) {
      axios.get(this.$store.state.domain + "/quiqup/token").then((res) => {
        console.log("token", res.data);
        var url = this.$store.state.quiqup + row.jobID;
        console.log("url", url);

        const headers = {
          "Content-Type": "application/json",
          Authorization: res.data,
        };

        axios(`${url}`, {
          method: "GET",
          responseType: "blob", //Force to receive data in a Blob Format
          headers: {
            Authorization: res.data,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "HEAD, GET, POST, PUT, PATCH, DELETE",
            "Access-Control-Allow-Headers":
              "Origin, Content-Type, X-Auth-Token",
          },
        })
          .then((response) => {
            //Create a Blob from the PDF Stream
            console.log("Resp", response);
            const file = new Blob([response.data], { type: "application/pdf" });
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            window.open(fileURL);
          })
          .catch((error) => {
            console.log("Error", error);
            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message: "Error! <br />No label found.",
              type: "danger",
              icon: "fa fa-error",
              timeout: this.$store.state.timeout,
            });
          });
      });
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
            message: 'Saved! <br />Order of "' + row.name + '" removed.',
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
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.selectedFiles = this.$refs.file.files;

      console.log(this.selectedFiles);
    },
  },
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
