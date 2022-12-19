<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Manage Styles</h6>
          <!-- <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav> -->
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
            <form role="form">
              <base-input
                label="Title:"
                class="mb-3"
                name="batch"
                type="text"
                placeholder="Enter title here."
                v-model="myObj.header"
              />

              <base-input label="Details:" class="mb-3" name="batch">
                <textarea
                  class="form-control"
                  type="text"
                  placeholder="Enter details text here."
                  v-model="myObj.details"
                  rows="3"
                ></textarea>
              </base-input>

              <base-button
                :disabled="saving"
                @click="UpdateHeader()"
                type="primary"
                class="col"
              >
                Save Header</base-button
              >
            </form>
          </template>
        </card>
      </modal>

      <modal
        :show.sync="modals.galleryModal"
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
              <label for="shoes">Shoes:</label>
              <multiselect
                style="margin-bottom: 15px"
                placeholder="Select shoes"
                v-model="collectionData1"
                :options="collectionOptions"
                :close-on-select="true"
                :clear-on-select="false"
                :hide-selected="false"
                :preserve-search="true"
                label="name"
                track-by="shoe_id"
                :preselect-first="true"
                id="example"
              >
              </multiselect>

              <label for="tag"> Tag:</label>
              <base-input
                name="batch"
                type="text"
                placeholder="Enter image tag here."
                v-model="gallery.tag"
              />
              <label for="shoes">Image Type:</label>
              <multiselect
                style="margin-bottom: 15px"
                placeholder="Select image type"
                v-model="collectionData2"
                :options="types"
                :close-on-select="true"
                :clear-on-select="false"
                :hide-selected="false"
                :preserve-search="true"
                label="name"
                track-by="value"
                :preselect-first="true"
                id="example"
              >
              </multiselect>
              <!-- Cover -->
              <div>
                <div class="form-group row mt-2 mb--2">
                  <label class="col-md-4 col-form-label form-control-label"
                    >Cover</label
                  >
                </div>
                <img
                  :src="mycover"
                  @click="$refs.filee.click()"
                  class="mt-2"
                  alt="imgAdd"
                  height="120"
                  width="120"
                  rounded
                />
                <i
                  v-if="loading == true"
                  class="fas fa-circle-notch fa-spin fa-2x position-absolute"
                  style="color: grey; margin-left: -77px; margin-top: 52px"
                ></i>
                <label hidden class="btn btn-success col">
                  <input
                    type="file"
                    id="filee"
                    ref="filee"
                    @change="selectUFile()"
                    accept="image/*"
                  />
                </label>
                <!-- <div class="row">
                  <div class=""></div>
                  <small
                    class="mt-4 text-danger col-6 mb-4"
                    v-if="errors.cover != false"
                    >Please select cover image.</small
                  >
                </div> -->
              </div>
              <!-- More Images -->
              <div>
                <div class="form-group row">
                  <label class="col-md-12 col-form-label form-control-label"
                    >More Images</label
                  >

                  <div class="row" style="margin-left: -3px">
                    <div>
                      <i
                        v-if="moreloading == true"
                        class="
                          fas
                          fa-circle-notch fa-spin fa-2x
                          position-absolute
                        "
                        style="color: grey; margin-top: 43px; margin-left: 60px"
                      ></i>
                      <img
                        ref="previewEl"
                        rounded
                        src="https://dk0pm9zdlq16s.cloudfront.net/e87f2709-88b0-46cd-8737-52fe2fdf7885.png"
                        @click="$refs.mfile.click()"
                        class="ml-3"
                        height="120"
                        width="120"
                      />
                      <input
                        type="file"
                        id="mfile"
                        hidden
                        ref="mfile"
                        multiple="multiple"
                        @change="selectMoreFile()"
                        accept="image/*"
                      />
                    </div>
                    <div
                      style="margin-left: 18px"
                      v-for="(img, index) in images"
                      :key="index"
                    >
                      <div>
                        <i
                          class="
                            fa fa-trash fa-sm
                            cursor
                            text-danger
                            position-absolute
                          "
                          style="margin: 55px"
                          @click="removeImg(index)"
                        ></i>
                      </div>
                      <div>
                        <img rounded :src="img" height="120" width="120" />
                      </div>
                    </div>
                  </div>

                  <div class="container">
                    <div class="row ml-1"></div>
                  </div>
                </div>
                <!-- <div class="row">
                  <div class=""></div>
                  <small
                    class="col-6 mb-2 text-danger"
                    v-if="errors.images != false"
                    >Please select more images.</small
                  >
                </div> -->
              </div>

              <div>
                <base-button
                  :disabled="saving"
                  @click="SaveGallery()"
                  type="primary"
                  class="col"
                >
                  Save Gallery</base-button
                >
              </div>
            </form>
          </template>
        </card>
      </modal>

      <div>
        <card
          class="no-border-card"
          body-classes="px-0 pb-3"
          footer-classes="pb-3"
        >
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
                  <span class="btn-inner--text">Update Header</span>
                </base-button>

                <base-button
                  icon
                  type="primary"
                  @click="AddGallery()"
                  :disabled="isLoading"
                >
                  <span class="btn-inner--icon"
                    ><i class="fas fa-plus"></i
                  ></span>
                  <span class="btn-inner--text">Add Gallery</span>
                </base-button>
              </div>
            </div>
          </div>
          <div
            class="
              col-12
              d-flex
              justify-content-center justify-content-sm-between
              flex-wrap
            "
          >
            <el-table :data="galleryData" style="margin-top: 20px">
              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                v-bind="column"
              >
              </el-table-column>
              <el-table-column align="right" label="Options">
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
                    @click="handleDelete($index, row.id)"
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
    BasePagination,
    Multiselect,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  created() {
    this.Authenticator();
    this.LoadData();
    //this.LoadCostData();
    // var url = this.$store.state.domain + "/Banners";
    // axios
    //   .get(url)
    //   .then((response) => {
    //     if (response.data.status === "error") {
    //     } else {
    //       this.myObj = response.data[0];
    //       this.isLoading = false;
    //       //console.log.log(myObj);
    //       this.tableData.push(this.myObj);
    //     }
    //   })
    //   .catch(function (error) {});
  },
  mounted() {
    this.Authenticator();
  },
  data() {
    return {
      collectionData2: [],
      collectionData1: [],
      galleryData: [],
      images: [],
      moreloading: false,
      loading: false,
      mycover:
        "https://dk0pm9zdlq16s.cloudfront.net/e87f2709-88b0-46cd-8737-52fe2fdf7885.png",
      types: [
        { name: "Portrait", value: "portrait" },
        { name: "Landscape", value: "landscape" },
      ],
      gallery: {
        id: 0,
        shoe_id: 0,
        tag: "",
        cover: "",
        meta_tag: "",
        image_type: "",
      },
      collectionOptions: [],
      isLoading: true,
      myObj: {},
      myCostObj: {},
      propsToSearch: ["batch"],
      tableColumns: [
        {
          prop: "name",
          label: "Shoe",
          sortable: true,
        },
        {
          prop: "tag",
          label: "Tag",
          sortable: true,
        },
        {
          prop: "image_type",
          label: "Type",
          sortable: true,
        },
      ],
      tableData: [],
      selectedRows: [],
      modals: {
        showModal: false,
        galleryModal: false,
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
    SaveGallery() {
      this.gallery.shoe_id = this.collectionData1.shoe_id;
      this.gallery.image_type = this.collectionData2.value;
      console.log("Finalll", this.gallery);

      if (
        this.collectionData1.length == 0 ||
        this.collectionData2.length == 0 ||
        this.gallery.cover == "" ||
        this.images == "" ||
        this.gallery.meta_tag == ""
      ) {
        return this.$notify({
          verticalAlign: "bottom",
          horizontalAlign: "center",
          message: "Error! <br />" + "Please fill the form correcly.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
      } else {
        if (this.gallery.id == 0) {
          var url = "https://api.thrillerme.com/styles/gallery";

          axios
            .post(url, this.gallery)
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
                this.modals.galleryModal = false;
                this.LoadData();
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message: "Saved! <br />New gallery added",
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
            .finally(() => {});
        } else {
          var url =
            "https://api.thrillerme.com/styles/gallery/" + this.gallery.id;

          axios
            .put(url, this.gallery)
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
                this.modals.galleryModal = false;
                this.LoadData();
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message: "Saved! <br />gallery updated",
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
            .finally(() => {});
        }
      }
      console.log(this.collectionData1);

      //this.gallery.image_type = this.gallery.image_type.;
      //this.gallery.shoe_id = this.collectionData1.id;

      console.log("Gajsh", this.gallery);
    },
    AddGallery() {
      this.collectionData2 = [];
      this.collectionData1 = [];
      this.images = [];
      this.gallery.id = 0;
      this.gallery.shoe_id = 0;
      this.gallery.tag = "";
      this.gallery.image_type = "";
      this.gallery.cover = "";
      this.gallery.meta_tag = "";
      this.mycover =
        "https://dk0pm9zdlq16s.cloudfront.net/e87f2709-88b0-46cd-8737-52fe2fdf7885.png";
      this.modals.galleryModal = true;
    },
    removeImg(index) {
      console.log(index);
      this.images.splice(index, 1);
      this.gallery.meta_tag = this.images.join();
    },
    selectMoreFile() {
      if (this.$refs.mfile.files.length !== 0) {
        this.moreloading = true;
        var formdata = new FormData();
        for (var i = 0; i < this.$refs.mfile.files.length; i++) {
          formdata.append("file", this.$refs.mfile.files[i], "[PROXY]");
        }

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        fetch("https://upload.appick.io", requestOptions)
          .then((response) => response.json()) //2
          .then((result) => {
            console.log(result);
            //this.moreImages.push(result.myresp);

            for (var i = 0, len = result.myresp.length; i < len; ++i) {
              this.moreloading = false;
              var fn = result.myresp[i].path;
              this.images.push(fn);
            }
            this.gallery.meta_tag = this.images.join();
          })

          .catch((error) =>
            swal.fire({
              type: "error",
              title: "  " + error.message,
              text: "Something went wrong with the connection, Please try again later!",
            })
          );
      }
    },
    selectUFile() {
      console.log("HEllo Pic");

      //Upload cover
      if (this.$refs.filee.files[0] !== "") {
        this.loading = true;
        let formData = new FormData();
        formData.append("file", this.$refs.filee.files[0]);
        axios
          .post("https://upload.appick.io", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((e) => {
            console.log(e.data);
            // this.file = undefined;
            var fn = e.data.myresp[0].path;
            console.log(fn);
            this.mycover = fn;
            console.log(this.mycover);

            this.gallery.cover = this.mycover;
            //console.log(this.myObj.coverImg);
            this.loading = false;
            console.log(this.loading);
          });
      }
    },
    UpdateHeader() {
      this.saving = true;
      var url = "https://api.thrillerme.com/styles";

      axios
        .put(url, this.myObj)
        .then((response) => {
          console.log(response);
          if (response.data.affectedRows == 1) {
            console.log("Hiii");
            this.modals.showModal = false;
            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message:
                'Saved! <br />Header "' + this.myObj.header + '" updated.',
              type: "success",
              icon: "fa fa-check",
              timeout: this.$store.state.timeout,
            });
            this.saving = false;
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    LoadData() {
      this.isLoading = true;
      var url = "https://api.thrillerme.com/styles";

      axios
        .get(url)
        .then((response) => {
          // console.log(response.status);
          if (response.status == 200) {
            console.log(response.data[0]);
            this.myObj = response.data[0];
            //    this.isLoading = false;
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});

      var url2 = "https://api.thrillerme.com/shoes";
      axios
        .get(url2)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            //  console.log(response.data[0]);
            this.collectionOptions = response.data;
            this.isLoading = false;
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});

      var url3 = "https://api.thrillerme.com/styles/gallery";
      axios
        .get(url3)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            //  console.log(response.data[0]);
            this.galleryData = response.data;
            this.isLoading = false;
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
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

    selectFile() {
      this.file = this.$refs.file.files[0];
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
    },
    editRecord(index, row) {
      console.log(row);
      this.eIndex = index;
      this.saving = false;
      this.gallery.id = row.id;
      //this.gallery.shoe_id = row.shoe_id;
      this.gallery.tag = row.tag;
      this.gallery.cover = row.cover;
      this.mycover = row.cover;
      this.gallery.image_type = row.image_type;
      this.gallery.meta_tag = row.meta_tag;
      this.images = row.meta_tag.split(",");
      this.collectionData2 = [];
      this.collectionData1 = [];
      this.types.forEach((elem) => {
        if (elem.value === row.image_type) {
          this.collectionData2 = elem;
          this.gallery.image_type = elem.value;
        }
      });
      this.collectionOptions.forEach((elem) => {
        if (elem.shoe_id === row.shoe_id) {
          this.collectionData1 = elem;
          this.gallery.shoe_id = elem.shoe_id;
        }
      });
      this.modals.galleryModal = true;
    },
    handleDelete(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to delete gallery" + "?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          //Remove API
          var url = "https://api.thrillerme.com/styles/gallery/" + row;
          //console.log.log("Remove: " + url);
          axios
            .delete(url)
            .then((response) => {
              // return console.log("CHekcinf", response);
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
                  message: "Saved! <br />Gallery removed.",
                  type: "danger",
                  icon: "fa fa-check",
                  timeout: this.$store.state.timeout,
                });
                this.LoadData();
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
