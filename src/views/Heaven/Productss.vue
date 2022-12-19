<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Manage Product</h6>
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
                  >SKU</label
                >
                <div class="col-md-8">
                  <base-input
                    placeholder="SKU"
                    v-model="myObj.sku_number"
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
              <label v-if="myObj.shoe_id > 0" style="margin-top: 10px"
                >Cover image</label
              >
              <br />
              <img
                v-if="myObj.shoe_id > 0"
                :src="cover"
                @click="$refs.file.click()"
                style="width: 5vw; height: 5vw; margin-left: 10px"
                alt="imgAdd"
              />
              <label v-bind:hidden="myObj.id > 0" class="btn btn-success col">
                <input
                  type="file"
                  id="file"
                  ref="file"
                  @change="selectFile"
                  accept="image/*"
                />
              </label>
              <br />
              <label v-if="myObj.shoe_id > 0" style="margin-top: 10px"
                >More images</label
              >
              <div v-if="myObj.shoe_id > 0" class="container ct-example-row">
                <div class="row">
                  <div
                    class="col-3"
                    v-for="shoe in moreShoesImages"
                    :key="shoe.shoe_image_id"
                  >
                    <div
                      style="
                        border-radius: 16px;
                        width: 5vw;
                        height: 5vw;
                        margin: 10px;
                      "
                    >
                      <i
                        class="fa fa-trash fa-xs"
                        @click="
                          deleteMoreImages(shoe.shoe_image_id, shoe.shoe_id)
                        "
                      ></i>
                      <img
                        :src="shoe.imgURL"
                        alt="imgURL"
                        style="width: 5vw; height: 5vw"
                      />
                    </div>
                  </div>
                  <img
                    v-if="loading == false"
                    :src="'/img/Plus.jpg'"
                    @click="$refs.filee.click()"
                    style="
                      width: 5vw;
                      height: 5vw;
                      margin-left: 20px;
                      margin-top: 20px;
                    "
                    alt="imgAdd"
                  />
                  <div
                    v-if="loading == true"
                    class="text-center"
                    style="margin-left: 40px; margin-top: 50px"
                  >
                    <i
                      class="fas fa-circle-notch fa-spin fa-2x"
                      style="color: grey"
                    ></i>
                  </div>
                </div>
              </div>

              <br />
              <input
                type="file"
                id="filee"
                hidden
                ref="filee"
                multiple
                @change="selectMoreFile"
                accept="image/*"
              />

              <!-- </label> -->

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

              <div class="col-md-2">
                <base-button
                  :disabled="saving"
                  @click="ShowModal()"
                  type="primary"
                  class="col"
                >
                  <i v-bind:class="sign"></i> Add Product</base-button
                >
              </div>

              <div class="col-md-10">
                <base-input
                  placeholder="Search product"
                  v-model="searchInput"
                  v-on:keyup.enter="searchDataa"
                ></base-input>
              </div>

              <!-- <base-input
                v-model="searchQuery"
                prepend-icon="fas fa-search"
                placeholder="Search..."
              >
              </base-input> -->
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

                  <base-button
                    @click="handleDelete($index, row)"
                    class="like btn-link"
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
      cover: "/img/Plus.jpg",
      files: [],
      selectedFiles: undefined,
      loading: false,
      searchInput: "",
      myObj: {
        shoe_id: 0,
        sku_number: "",
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
        { id: "Women", name: "Woman" },
        { id: "Featured", name: "Featured" },
        { id: "Popular", name: "Popular" },
        { id: "New", name: "New" },
      ],
      propsToSearch: ["name"],
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
      searchData: [],
      collectionData: [],
      collectionOptions: [],
      selectedTags: [],
      selectedRows: [],
      moreShoesImages: [],
      modals: {
        showModal: false,
      },
      optionName: "Add Product",
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
      ////console.log(this.$store.state.myUser.email , this.$store.state.myUser.password );
      if (
        this.$store.state.myUser.email == null ||
        this.$store.state.myUser.password == null ||
        this.$store.state.myUser.email == "" ||
        this.$store.state.myUser.password == ""
      ) {
        //console.log("Hi If");
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
    deleteMoreImages(more_image_id, shoe_id) {
      swal({
        title: "Are you sure?",
        text: "You want to delete this image?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          axios
            .delete(this.$store.state.domain + "/shoesImages/" + more_image_id)
            .then((res) => {
              //Load more images
              this.LoadImages(shoe_id);
            })
            .catch((err) => {
              console.error("img", err);
            });
        }
      });
    },
    searchDataa() {
      //console.log("Searching:", this.searchInput);
      if (this.searchInput.length > 0) {
        var url =
          this.$store.state.domain + "/shoes/getByName/" + this.searchInput;
        axios
          .get(url)
          .then((response) => {
            if (response.data.status === "error") {
              //this.$notify({verticalalign: 'bottom', horizontalalign: 'center', message: 'Request Error! <br />' + response.data.status.data, type: 'danger', icon: 'fa fa-ban',timeout: 0 });
            } else {
              this.tableData = [];
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
            //console.log(error);
          });
      } else {
        this.LoadData();
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
          //console.log(error);
        });
    },
    LoadImages(shoeID) {
      var url = this.$store.state.domain + "/shoesImages/" + shoeID;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log(response.data.status);
          } else {
            this.moreShoesImages = response.data;
            //console.log(this.moreShoesImages);
          }
        })
        .catch(function (error) {
          //console.log(error);
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

      //Upload cover
      if (this.file !== "") {
        let formData = new FormData();
        formData.append("file", this.file);
        //console.log(this.file);
        axios
          .post("https://upload.appick.io", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((e) => {
            //console.log(e.data);
            // this.file = undefined;
            var fn = e.data.myresp[0].path;

            this.myObj.cover_image = fn;
            //console.log(this.myObj.cover_image);
            this.UpdateCover();
          });
      }
    },
    selectMoreFile() {
      this.spin = "fas fa-circle-notch fa-spin";
      this.loading = true;
      this.selectedFiles = this.$refs.filee.files;

      //Upload other images
      if (this.selectedFiles !== undefined) {
        let formData = new FormData();
        for (let index = 0; index < this.selectedFiles.length; index++) {
          const element = this.selectedFiles[index];
          //console.log("elem", element);
          formData.append("file[" + index + "]", element);
        }

        axios
          .post(this.$store.state.upload, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((e) => {
            e.data.myresp.forEach((elem) => {
              //console.log(elem.path);
              axios
                .post(this.$store.state.domain + "/shoesImages", {
                  shoe_id: this.myObj.shoe_id,
                  imgURL: elem.path,
                })
                .then((res) => {
                  //console.log("image uploaded", res);
                  this.LoadImages(this.myObj.shoe_id);
                })
                .catch((err) => {
                  console.error("upload error", err);
                });
            });
          })
          .catch((error) => {
            //console.log("Server Error on saving: ", error);
          })
          .finally(() => {
            this.selectedFiles = undefined;
            this.spin = "";
            this.loading = false;
          });
      }
      //console.log(this.selectedFiles);
    },
    date: function (date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    AddNewProduct() {
      if (this.myObj.shoe_id === 0) {
        //Add
        this.optionName = "Adding...";
        this.myObj.collection_id = this.collectionData.id;
        this.myObj.tag = "";
        this.selectedTags.forEach((elem) => {
          this.myObj.tag += elem.name + ", ";
        });

        //Upload cover
        if (this.file !== "") {
          let formData = new FormData();
          formData.append("file", this.file);
          //console.log(this.file);
          axios
            .post("https://upload.appick.io", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((e) => {
              //console.log(e.data);
              // this.file = undefined;
              var fn = e.data.myresp[0].path;
              this.myObj.cover_image = fn;
              this.PostProudct();
            });
        } else {
          this.PostProudct();
        }
      } else {
        //Update
        this.optionName = "Saving...";
        this.myObj.collection_id = this.collectionData.id;
        this.myObj.tag = "";
        this.selectedTags.forEach((elem) => {
          this.myObj.tag += elem.name + ", ";
        });

        //Upload cover
        if (this.file !== "") {
          let formData = new FormData();
          formData.append("file", this.file);
          //console.log(this.file);
          axios
            .post("https://upload.appick.io", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((e) => {
              //console.log(e.data);
              // this.file = undefined;
              var fn = e.data.myresp[0].path;
              this.myObj.cover_image = fn;
              this.PutProudct();
            });
        } else {
          this.PutProudct();
        }

        // //Upload other images
        // if (this.selectedFiles !== undefined) {
        //   let formData = new FormData();
        //   for (let index = 0; index < this.selectedFiles.length; index++) {
        //     const element = this.selectedFiles[index];
        //     //console.log("elem", element);
        //     formData.append("file", element);
        //   }

        //   axios
        //     .post(this.$store.state.upload, formData, {
        //       headers: {
        //         "Content-Type": "multipart/form-data",
        //       },
        //     })
        //     .then((e) => {
        //       e.data.myresp.forEach((elem) => {
        //         //console.log(elem.path);
        //         axios
        //           .post(this.$store.state.domain + "/shoesImages", {
        //             shoe_id: this.myObj.shoe_id,
        //             imgURL: "https://appick.io/u/" + elem.path,
        //           })
        //           .then((res) => {
        //             //console.log("image uploaded", res);
        //           })
        //           .catch((err) => {
        //             console.error("upload error", err);
        //           });
        //       });

        //     })
        //     .catch((error) => {
        //       //console.log("Server Error on saving: ", error);
        //     })
        //     .finally(() => {
        //       this.selectedFiles = undefined;
        //     });
        // }
      }
    },
    PostProudct() {
      //Post Request
      var url = this.$store.state.domain + "/shoes";

      //console.log("url:", url);
      //console.log("data:", this.myObj);
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
          //console.log(error);
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

      ////console.log(fn);
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

      //console.log("url:", url);
      //console.log(this.myObj);
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
          //console.log(error);
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

      //console.log("updated...");
      this.optionName = "Add Product";
      this.modals.showModal = false;
    },
    UpdateCover() {
      //Put Request
      var url = this.$store.state.domain + "/shoes/" + this.myObj.shoe_id;
      if (this.myObj.release_date !== "") {
        var dts = this.myObj.release_date.split("-");
        this.myObj.release_date = dts[0] + "-" + dts[1] + "-" + dts[2];
      } else {
        this.myObj.release_date = null;
      }

      //console.log("url:", url);
      //console.log(this.myObj);
      axios
        .put(url, this.myObj)
        .then((response) => {
          //console.log(response);
          this.cover = this.myObj.cover_image;
        })
        .catch(function (error) {});
    },
    GetError() {
      return this.nameError;
      return this.prefixError;
    },

    editRecord(index, row) {
      axios
        .get(this.$store.state.domain + "/shoes/" + row.shoe_id)
        .then((res) => {
          this.eIndex = index;
          this.saving = false;
          this.optionName = "Edit";
          this.modals.showModal = true;
          this.sign = "far fa-edit";
          //console.log("Get", res);
          row = res.data;

          this.myObj.shoe_id = row.shoe_id;
          this.myObj.sku_number = row.sku_number;
          this.myObj.name = row.name;
          this.myObj.summary = row.summary;
          this.myObj.tag = row.tag;
          this.myObj.colorway = row.colorway;
          this.myObj.highest_offer = row.highest_offer;
          this.myObj.lowest_asking_price = row.lowest_asking_price;

          this.myObj.cover_image = row.cover_image;
          this.cover = row.cover_image;
          this.LoadImages(row.shoe_id);

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

          //    if(this.selectedFiles != null){
          //   this.moreShoesImages.push({id: this.myObj.shoe_id });
          // }

          if (this.myObj.release_date === "") {
            this.myObj.release_date = null;
          }
          var arr = this.myObj.tag.split(",");
          this.selectedTags = [];
          //console.log(this.myObj.tag);
          if (this.myObj.tag.indexOf(",") > -1) {
            arr.forEach((elem) => {
              if (elem !== " ") {
                this.selectedTags.push({ id: elem, name: elem });
              }
            });
          } else {
            this.selectedTags.push({
              id: this.myObj.tag,
              name: this.myObj.tag,
            });
          }

          //console.log("Data: ", this.myObj);
        });
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
        this.deleteRow(row);
        if (result.value) {
          axios
            .delete(this.$store.state.domain + "/shoes/" + row.shoe_id)
            .then((res) => {
              //console.log(res);
              this.$notify({
                verticalalign: "bottom",
                horizontalalign: "center",
                message: 'Removed"' + row.sku_number,
                type: "danger",
                icon: "fa fa-check",
                timeout: this.$store.state.timeout,
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
};
</script>

<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
