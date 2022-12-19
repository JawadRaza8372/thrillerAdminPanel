<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Manage New Products</h6>
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
                <multiselect
                  style="margin-bottom: 15px"
                  placeholder="Select collection"
                  v-model="myStatus.currentValue"
                  :options="myStatus.status"
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

                <label class="col-md-4 col-form-label form-control-label"
                  >SKU</label
                >
                <div class="col-md-8">
                  <base-input
                    placeholder="SKU"
                    v-model="myObj.sku_number"
                    v-bind:error="skuError"
                  ></base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Name</label
                >
                <div class="col-md-8">
                  <base-input
                    placeholder="Name"
                    v-model="myObj.name"
                    v-bind:error="nameError"
                  ></base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Details</label
                >
                <div class="col-md-8">
                  <base-input>
                    <textarea
                      class="form-control"
                      v-model="myObj.summary"
                      id="purpose"
                      placeholder="Enter product details"
                      rows="2"
                    >
                    </textarea>
                  </base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Colorway:</label
                >
                <div class="col-md-8">
                  <base-input
                    placeholder="Colorway"
                    v-model="myObj.colorway"
                  ></base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <label class="col-md-4 col-form-label form-control-label"
                  >Release Date:</label
                >

                <div class="col-md-8">
                  <base-input addon-left-icon="ni ni-calendar-grid-58">
                    <flat-picker
                      slot-scope="{ focus, blur }"
                      @on-open="focus"
                      @on-close="blur"
                      :config="{ allowInput: true }"
                      class="form-control datepicker"
                      v-model="myObj.release_date"
                      placeholder="Select visit date"
                    >
                    </flat-picker>
                  </base-input>
                </div>
              </div>

              <div class="form-group row mb--2">
                <multiselect
                  style="margin-bottom: 15px"
                  placeholder="Select collection"
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

              <div class="form-group row mb--2">
                <multiselect
                  style="margin-bottom: 15px"
                  placeholder="Select tags"
                  multiple
                  v-model="selectedTags"
                  :options="tags"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :hide-selected="false"
                  :preserve-search="true"
                  label="name"
                  track-by="name"
                  :preselect-first="false"
                  id="example"
                >
                </multiselect>
              </div>

              <label class="btn btn-success col">
                <input
                  type="file"
                  id="file"
                  ref="file"
                  @change="selectFile"
                  accept="image/*"
                />
              </label>

              <div style="margin-top: 10px">
                <base-button
                  :disabled="saving"
                  @click="AddNewProduct()"
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
                <base-button
                  :disabled="saving"
                  @click="ShowModal()"
                  type="primary"
                  class="col"
                >
                  <i v-bind:class="sign"></i> Add Product</base-button
                >

                <!-- <base-input
                  v-model="searchQuery"
                  disabled
                  prepend-icon="fas fa-search"
                  placeholder="Search..."
                >
                </base-input> -->
              </div>
            </div>

            <el-table
              :data="queriedData"
              row-key="id"
              header-row-class-name="thead-light"
              @sort-change="sortChange"
              @selection-change="selectionChange"
              style="margin-top: 20px"
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
                </div>
              </el-table-column>
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
    this.LoadData();
    this.LoadCollectionDropdown();
  },
  mounted() {
    this.Authenticator();
  },
  data() {
    return {
      myStatus: {
        currentValue: "",
        status: [
          { value: "active", name: "Active" },
          { value: "inactive", name: "Inactive" },
        ],
      },

      myObj: {
        shoe_id: 0,
        sku_number: "abc-12234",
        name: "",
        summary: "",
        colorway: "",
        tag: "",
        release_date: null,
        highest_offer: 0,
        lowest_asking_price: 0,
        cover_image: "",
        collection_id: 0,
      },
      tags: [
        { id: "Just Dropped", name: "Just Dropped" },
        { id: "Most Popular", name: "Most Popular" },
        { id: "Favorites", name: "Favorites" },
        { id: "Air Jordon", name: "Air Jordon" },
        { id: "Adidas Yeezy", name: "Adidas Yeezy" },
        { id: "Dunks", name: "Dunks" },
        { id: "Jordon 1", name: "Jordon 1" },
        { id: "Travis Scot", name: "Travis Scot" },
        { id: "Off White", name: "Off White" },
        { id: "Men", name: "Men" },
        { id: "Women", name: "Women" },
        { id: "Featured", name: "Featured" },
        { id: "Popular", name: "Popular" },
        { id: "New", name: "New" },
      ],
      propsToSearch: ["sku_number", "name", "tag"],
      tableColumns: [
        {
          prop: "sku_number",
          label: "SKU",
          minWidth: 220,
          sortable: true,
        },
        {
          prop: "name",
          label: "Name",
          minWidth: 200,
          sortable: true,
        },
        {
          prop: "tag",
          label: "Tags",
          minWidth: 120,
          sortable: true,
        },
        {
          prop: "colorway",
          label: "Colorway",
          minWidth: 135,
          sortable: false,
        },
        {
          prop: "release_date",
          label: "Release Date",
          minWidth: 120,
          sortable: false,
        },
      ],
      file: "",
      tableData: [],
      collectionData: [],
      collectionOptions: [],
      selectedTags: [],
      selectedRows: [],
      modals: {
        showModal: true,
      },
      optionName: "Add Product",
      saving: false,
      name: "",
      prefixname: "",
      prefixError: false,
      nameError: false,
      skuError: false,
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
    LoadCollectionDropdown() {
      var url = this.$store.state.domain + "/collections/dropdown";
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //this.$notify({verticalalign: 'bottom', horizontalalign: 'center', message: 'Request Error! <br />' + response.data.status.data, type: 'danger', icon: 'fa fa-ban',timeout: 0 });
          } else {
            this.collectionOptions = response.data;
          }
        })
        .catch(function (error) {});
    },

    LoadData() {
      var url = this.$store.state.domain + "/shoes";
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //this.$notify({verticalalign: 'bottom', horizontalalign: 'center', message: 'Request Error! <br />' + response.data.status.data, type: 'danger', icon: 'fa fa-ban',timeout: 0 });
          } else {
            response.data.forEach((element) => {
              if (element.release_date !== null)
                element.release_date = moment(element.release_date).format(
                  "DD MMM YYYY, ddd"
                );
            });
            this.tableData = response.data;
          }
        })
        .catch(function (error) {
          //console.log.log(error);
        });
    },
    ShowModal() {
      this.collectionData = [];
      this.modals.showModal = true;
      this.optionName = "Add Product";
      this.myObj.shoe_id = 0;
      this.myObj.sku_number = "";
      this.myObj.name = "";
      this.myObj.summary = "";
      this.myObj.tag = "";
      this.myObj.colorway = "";
      this.myObj.release_date = null;
      this.highest_offer = 0;
      this.lowest_asking_price = 0;
      this.cover_image = "";
      this.collection_id = 0;
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
    date: function (date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    AddNewProduct() {
      if (this.myObj.sku_number.length === 0) {
        this.skuError = "Please enter sku numner";
      } else {
        this.skuError = false;
      }

      // if (this.myObj.shoe_id === 0) {
      //   //Add
      //   this.optionName = "Adding...";
      //   this.myObj.collection_id = this.collectionData.id;
      //   this.myObj.tag = "";
      //   this.selectedTags.forEach((elem) => {
      //     this.myObj.tag += elem.name + ", ";
      //   });

      //   //Upload cover
      //   if (this.file !== "") {
      //     let formData = new FormData();
      //     formData.append("file", this.file);
      //     //console.log.log(this.file);
      //     axios
      //       .post("https://upload.appick.io", formData, {
      //         headers: {
      //           "Content-Type": "multipart/form-data",
      //         },
      //       })
      //       .then((e) => {
      //         //console.log.log(e.data);
      //         // this.file = undefined;
      //         var fn =
      //           "https://dk0pm9zdlq16s.cloudfront.net/" + e.data.myresp[0].filename;
      //         this.myObj.cover_image = fn;
      //         this.PostProudct();
      //       });
      //   } else {
      //     this.PostProudct();
      //   }
      // } else {
      //   //Update
      //   this.optionName = "Saving...";
      //   this.myObj.collection_id = this.collectionData.id;
      //   this.myObj.tag = "";
      //   this.selectedTags.forEach((elem) => {
      //     this.myObj.tag += elem.name + ", ";
      //   });

      //   //Upload cover
      //   if (this.file !== "") {
      //     let formData = new FormData();
      //     formData.append("file", this.file);
      //     //console.log.log(this.file);
      //     axios
      //       .post("https://upload.appick.io", formData, {
      //         headers: {
      //           "Content-Type": "multipart/form-data",
      //         },
      //       })
      //       .then((e) => {
      //         //console.log.log(e.data);
      //         // this.file = undefined;
      //         var fn =
      //           "https://dk0pm9zdlq16s.cloudfront.net/" + e.data.myresp[0].filename;
      //         this.myObj.cover_image = fn;
      //         this.PutProudct();
      //       });
      //   } else {
      //     this.PutProudct();
      //   }
      // }
    },
    PostProudct() {
      //Post Request
      var url = this.$store.state.domain + "/shoes";

      //console.log.log("url:", url);
      //console.log.log("data:", this.myObj);
      axios
        .post(url, this.myObj)
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
            this.LoadData();
            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message: "Saved! <br /> New product added.",
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

      //console.log.log(fn);
      this.optionName = "Add Product";
      this.modals.showModal = false;
    },
    PutProudct() {
      //Put Request
      var url = this.$store.state.domain + "/shoes/" + this.myObj.shoe_id;
      if (this.myObj.release_date !== "") {
        var dts = this.myObj.release_date.split("-");
        this.myObj.release_date = dts[0] + "-" + dts[1] + "-" + dts[2];
      } else {
        this.myObj.release_date = null;
      }

      //console.log.log("url:", url);
      //console.log.log(this.myObj);
      axios
        .put(url, this.myObj)
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
            this.LoadData();
            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message: "Saved! <br /> Product updated.",
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

      //console.log.log(fn);
      this.optionName = "Add Product";
      this.modals.showModal = false;
    },
    GetError() {
      return this.nameError;
      return this.prefixError;
    },

    editRecord(index, row) {
      this.eIndex = index;
      this.saving = false;
      this.optionName = "Edit";
      this.modals.showModal = true;
      this.sign = "far fa-edit";

      this.myObj.shoe_id = row.shoe_id;
      this.myObj.sku_number = row.sku_number;
      this.myObj.name = row.name;
      this.myObj.summary = row.summary;
      this.myObj.tag = row.tag;
      this.myObj.colorway = row.colorway;
      this.myObj.highest_offer = row.highest_offer;
      this.myObj.lowest_asking_price = row.lowest_asking_price;
      this.myObj.cover_image = row.cover_image;

      if (row.release_date !== "") {
        var ts = moment(row.release_date, "DD MMM YYYY, ddd").valueOf();
        this.myObj.release_date = moment(ts).format("YYYY-MM-DD");
      } else {
        this.myObj.release_date = null;
      }

      this.collectionOptions.forEach((elem) => {
        if (elem.id === row.collection_id) {
          this.collectionData = elem;
          this.myObj.collection_id = elem.id;
        }
      });

      if (this.myObj.release_date === "") {
        this.myObj.release_date = null;
      }
      var arr = this.myObj.tag.split(",");
      this.selectedTags = [];
      //console.log.log(this.myObj.tag);
      if (this.myObj.tag.indexOf(",") > -1) {
        arr.forEach((elem) => {
          if (elem !== " ") {
            this.selectedTags.push({ id: elem, name: elem });
          }
        });
      } else {
        this.selectedTags.push({ id: this.myObj.tag, name: this.myObj.tag });
      }

      //console.log.log("Data: ", this.myObj);
    },
    handleDelete(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to delete " + row.sku_number + "?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$notify({
            verticalalign: "bottom",
            horizontalalign: "center",
            message: 'Done! <br />Inquiry of "' + row.name + '" removed.',
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
