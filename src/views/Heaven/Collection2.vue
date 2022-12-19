<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Collection</h6>
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
                label="Name:"
                class="mb-3"
                name="batch"
                type="text"
                placeholder="Enter collection name"
                v-model="myObj.title"
              />

              <base-input
                label="Description:"
                class="mb-3"
                name="batch"
                type="text"
                placeholder="Enter description"
                v-model="myObj.description"
              />

              <!-- <label >Add Image</label> -->
              <img
                v-if="myObj.collection_id > 0"
                :src="cover"
                @click="$refs.filee.click()"
                style="width: 5vw; height: 5vw; margin-left: 10px"
                alt="imgAdd"
              />
              <i
                v-if="loading == true"
                class="fas fa-circle-notch fa-spin fa-2x"
                style="color: grey; margin-left: 40px"
              ></i>

              <label
                v-bind:hidden="myObj.collection_id > 0"
                class="btn btn-success col"
              >
                <input
                  type="file"
                  id="filee"
                  ref="filee"
                  @change="selectUFile()"
                  accept="image/*"
                />
              </label>

              <div>
                <base-button
                  @click="AddCollection()"
                  :disabled="saving"
                  type="primary"
                  class="col"
                  style="margin-top: 10px"
                  ><i v-bind:class="sign"></i> {{ optionName }}</base-button
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
                <base-button icon type="primary" @click="AddModal()">
                  <span class="btn-inner--icon"
                    ><i class="fas fa-plus"></i
                  ></span>
                  <span class="btn-inner--text">Add new collection</span>
                </base-button>

                <base-button
                  hidden
                  icon
                  v-if="selectedRows.length"
                  type="danger"
                  @click="RemoveSelected()"
                >
                  <span class="btn-inner--icon"
                    ><i class="fas fa-trash"></i
                  ></span>
                  <span class="btn-inner--text">Remove selected</span>
                </base-button>
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
    this.LoadData();
  },
  mounted() {
    this.Authenticator();
  },
  data() {
    return {
      cover: "/img/Plus.jpg",
      loading: false,
      filee: "",
      myObj: {
        collection_id: 0,
        title: "",
        description: "",
        imageURL: "",
      },
      file: "",
      propsToSearch: ["title"],
      tableColumns: [
        {
          prop: "title",
          label: "Title",
          minWidth: 400,
          sortable: true,
        },
        {
          prop: "description",
          label: "Description",
          minWidth: 885,
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
    selectUFile() {
      // console.log("Osama");
      this.loading = true;
      this.filee = this.$refs.filee.files[0];

      console.log(this.filee.name);

      console.log(this.filee, this.loading);
      //Upload cover
      if (this.filee !== "") {
        let formData = new FormData();
        formData.append("file", this.filee);
        console.log(this.filee);
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
            this.cover = fn;
            this.myObj.imageURL = this.cover;
            //console.log(this.myObj.coverImg);
            this.loading = false;
            console.log(this.loading);
          });
      }
    },

    deleteImages() {
      this.myObj.imageURL = "";
      this.loading = false;
    },
    LoadData() {
      var url = this.$store.state.domain + "/collections";
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
          } else {
            this.tableData = response.data;
          }
        })
        .catch(function (error) {});
    },
    AddCollection() {
      if (this.myObj.title === "") {
        this.$notify({
          verticalAlign: "bottom",
          horizontalAlign: "center",
          message: "Please enter collection name",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
      } else {
        if (this.myObj.collection_id === 0) {
          //Add
          this.optionName = "Adding...";
          if (this.file !== "") {
            let formData = new FormData();
            formData.append("file", this.file);
            //console.log.log(this.file);
            axios
              .post("https://upload.appick.io", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((e) => {
                //console.log.log(e.data);
                var fn = e.data.myresp[0].path;
                this.myObj.imageURL = fn;
                this.AddC();
              });
          } else {
            this.AddC();
          }
        } else {
          //Edit
          this.optionName = "Saving...";
          this.UpdateC();
          // if (this.filee !== "") {
          //   let formData = new FormData();
          //   formData.append("file", this.filee);
          //   //console.log.log(this.file);
          //   axios
          //     .post("https://upload.appick.io", formData, {
          //       headers: {
          //         "Content-Type": "multipart/form-data",
          //       },
          //     })
          //     .then((e) => {
          //       //console.log.log(e.data);
          //       var fn =
          //         "https://dk0pm9zdlq16s.cloudfront.net/" + e.data.myresp[0].filename;
          //       this.myObj.imageURL = fn;
          //       this.UpdateC();
          //     });
          // } else {
          //   this.UpdateC();
          // }
        }
      }
    },
    AddC() {
      var url = this.$store.state.domain + "/collections";
      axios
        .post(url, this.myObj)
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
            this.myObj.collection_id = response.data.insertId;
            this.tableData.push(this.myObj);
            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message: "Saved! <br /> New Collection added.",
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

      ////console.log.log(fn);
      this.optionName = "Add";
      this.modals.showModal = false;
    },
    UpdateC() {
      //console.log.log("updating collection:", this.myObj.collection_id);
      var url =
        this.$store.state.domain + "/collections/" + this.myObj.collection_id;
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
            // Vue.set(this.tableData, this.eIndex, this.myObj);
            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message: "Saved! <br /> Collection Updated.",
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
      this.optionName = "Add";
      this.modals.showModal = false;
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
    //   selectUFile() {
    //   this.filee = this.$refs.filee.files[0];
    // },
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
              this.optionName = "Add";
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
      this.myObj.collection_id = 0;
      this.myObj.title = "";
      this.myObj.description = "";
      this.filee = "";
      this.loading = false;

      this.shouldAdd = true;
      this.optionName = "Add";
      this.modals.showModal = true;
      this.sign = "fas fa-user-plus";
    },
    editRecord(index, row) {
      this.eIndex = index;
      this.saving = false;
      this.myObj.collection_id = row.collection_id;
      this.myObj.title = row.title;
      this.myObj.description = row.description;
      this.myObj.imageURL = row.imageURL;

      this.cover = this.myObj.imageURL;
      this.shouldAdd = false;
      this.optionName = "Edit";
      this.modals.showModal = true;
      this.sign = "far fa-edit";
    },
    handleDelete(index, row) {
      var colID = row.collection_id;
      //console.log.log("Col ID", colID);
      swal({
        title: "Are you sure?",
        text: "You want to delete collection " + row.title + "?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          //Remove API
          var url = this.$store.state.domain + "/collections/" + colID;
          //console.log.log("Remove: " + url);
          axios
            .delete(url, qs.stringify(""))
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
                  message:
                    'Done! <br />Collection "' + row.title + '" removed.',
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
        (tableRow) => tableRow.collection_id === row.collection_id
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
