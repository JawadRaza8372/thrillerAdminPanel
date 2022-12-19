<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Notification Center</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <div hidden class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral" @click="AddModal1()"
            >Filters</base-button
          >
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <modal
        :show.sync="modals.showModal"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-lg mt-3 mb--5"
      >
        <card
          type="secondary"
          shadow
          header-classes="bg-white pb-5"
          body-classes="px-lg-5 py-lg-5"
          class="border-0"
        >
          <template>
            <div class="row">
              <div class="col-md-6">
                <base-input label="Message:">
                  <multiselect
                    placeholder="Select a message"
                    v-model="cmbMessage.value"
                    :options="cmbMessage.data"
                    :close-on-select="true"
                    :clear-on-select="false"
                    :hide-selected="false"
                    :preserve-search="true"
                    label="name"
                    track-by="name"
                    :preselect-first="true"
                    id="cmbMessage"
                  >
                  </multiselect>
                </base-input>
              </div>

              <div class="col-md-6">
                <base-input label="Class:">
                  <multiselect
                    placeholder="Select class"
                    v-model="cmbClass.value"
                    :options="cmbClass.data"
                    :close-on-select="true"
                    :clear-on-select="false"
                    :hide-selected="false"
                    :preserve-search="true"
                    label="name"
                    track-by="name"
                    :multiple="true"
                    :preselect-first="true"
                    @select="UpdateValue"
                    id="cmbClass"
                  >
                  </multiselect>
                </base-input>
              </div>
            </div>

            <div hidden class="row">
              <div class="col-md-6">
                <base-input label="Session">
                  <multiselect
                    placeholder="Select session"
                    v-model="cmbSession.value"
                    :options="cmbSession.data"
                    :close-on-select="true"
                    :clear-on-select="false"
                    :hide-selected="false"
                    :preserve-search="true"
                    label="name"
                    track-by="name"
                    :preselect-first="true"
                    id="cmbSession"
                  >
                  </multiselect>
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input label="Status">
                  <multiselect
                    placeholder="Select Status"
                    v-model="cmbStatus.value"
                    :options="cmbStatus.data"
                    :close-on-select="true"
                    :clear-on-select="false"
                    :hide-selected="false"
                    :preserve-search="true"
                    label="name"
                    track-by="name"
                    :preselect-first="true"
                    id="cmbStatus"
                  >
                  </multiselect>
                </base-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <base-input label="Custom Recipient">
                  <multiselect
                    placeholder="Select Custom Recipient"
                    v-model="cmbRecipient.value"
                    :options="cmbRecipient.data"
                    :close-on-select="true"
                    :clear-on-select="false"
                    :hide-selected="false"
                    :preserve-search="true"
                    label="name"
                    track-by="name"
                    :preselect-first="true"
                    @select="UpdateValue"
                    id="cmbRecipient"
                  >
                  </multiselect>
                </base-input>
              </div>
            </div>

            <div v-if="progress > 0" class="progress">
              <div
                class="progress-bar progress-bar-info progress-bar-striped"
                role="progressbar"
                :aria-valuenow="progress"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{ width: progress + '%' }"
              >
                {{ progress }}%
              </div>
            </div>
            <label class="btn btn-success col">
              <input type="file" id="file" ref="file" @change="selectFile" />
            </label>

            <base-button class="col success" @click="upload">
              <!-- <i v-bind:class="signC"></i> -->
              {{ optionName }}
            </base-button>
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
                  <div class="col-md-3">
                    <multiselect
                      placeholder="Status"
                      v-model="cmbStatus.value"
                      :options="cmbStatus.data"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :hide-selected="false"
                      :preserve-search="true"
                      label="name"
                      track-by="name"
                      :preselect-first="true"
                      id="cmbStatus"
                    >
                    </multiselect>
                  </div>

                  <div class="col-md-4">
                    <base-button
                      :disabled="loading"
                      icon
                      type="primary"
                      @click="AddModal()"
                    >
                      <span class="btn-inner--icon"
                        ><i v-bind:class="signMain"></i
                      ></span>
                      <span class="btn-inner--text">{{ txtMain }}</span>
                    </base-button>

                    <base-button hidden icon type="success" @click="Refresh()">
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
import Multiselect from "vue-multiselect";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  mixins: [clientPaginationMixin],
  components: {
    Multiselect,
    flatPicker,
    BasePagination,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  created() {
    this.FillDropdowns();

    //Messages
    var url =
      this.$store.state.domain +
      "/Fill/Messages?cID=" +
      this.$store.state.cID +
      "&_db=" +
      this.$store.state.db;
    axios
      .get(url)
      .then((response) => {
        if (response.data.status === "error") {
          //console.log.log("Error on getting Message: ", response.data);
        } else {
          response.data.data.forEach((element) => {
            this.cmbMessage.data.push({ id: element.id, name: element.name });
          });
        }
      })
      .catch(function (error) {
        //console.log.log("Server Error on getting Message: ", url);
      });
  },
  data() {
    return {
      myObj: {
        clsList: [],
        msgID: 0,
        fileURL: "",
      },
      propsToSearch: ["notification"],
      tableColumns: [
        {
          prop: "Name",
          label: "Name",
          minWidth: 250,
          sortable: true,
        },
        {
          prop: "Class",
          label: "Class",
          minWidth: 180,
          sortable: true,
        },
        {
          prop: "Number",
          label: "Number",
          minWidth: 180,
          sortable: true,
        },
        {
          prop: "Message",
          label: "Message",
          minWidth: 180,
          sortable: true,
        },
        {
          prop: "Time",
          label: "Time",
          minWidth: 180,
          sortable: true,
        },
        {
          prop: "Delivered",
          label: "Dilivered",
          minWidth: 180,
          sortable: true,
        },
      ],
      tableData: [],
      selectedRows: [],
      modals: {
        showModal: false,
        showModal1: false,
      },

      dates: {
        simple: new Date(),
        range: "2020-01-01 to 2020-01-15",
      },
      optionName: "Send",
      name: "",
      prefixname: "",
      prefixError: false,
      nameError: false,
      sign: "fas fa-user-plus",
      shouldAdd: true,
      eIndex: 0,

      cmbBatch: {
        value: null,
        data: [],
      },

      tStatus: {
        value: { id: null, name: null },
        data: [],
      },
      dep: {
        value: { id: null, name: null },
        data: [],
      },

      cmbSession: {
        value: { id: null, name: null },
        data: [],
      },
      cmbFeeSession: {
        value: { id: null, name: null },
        data: [],
      },
      cmbTeacher: {
        value: null,
        data: [],
      },
      cmbSubject: {
        value: null,
        data: [],
      },
      cmbStatus: {
        value: { id: 1, name: "SendBox" },
        data: [
          { id: 1, name: "SendBox" },
          { id: 2, name: "OutBox" },
        ],
      },
      cmbMessage: {
        value: null,
        data: [],
      },

      optionF: "Save",
      saving: false,
      signF: "fas fa-edit",

      cmbClass: {
        value: null,
        data: [],
      },
      cmbRecipient: {
        value: null,
        data: [],
      },

      opt: false,
      opta: false,
      loading: true,
      signMain: "fas fa-circle-notch fa-spin",
      txtMain: "Loading",
      file: undefined,
      progress: 0,
    };
  },
  methods: {
    upload() {
      if (this.cmbClass.value == null || this.cmbClass.value == "") {
        //Empty dropdown
        this.$notify({
          verticalAlign: "bottom",
          horizontalAlign: "center",
          message: "Error! <br />" + "Please select a class.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: this.$store.state.timeout,
        });
      } else if (this.cmbMessage.value == null || this.cmbMessage.value == "") {
        //Empty dropdown
        this.$notify({
          verticalAlign: "bottom",
          horizontalAlign: "center",
          message: "Error! <br />" + "Please select a message.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: this.$store.state.timeout,
        });
      } else {
        if (this.file != undefined) {
          //Upload File
          this.optionName = "Uploading...";
          let formData = new FormData();
          formData.append("file", this.file);
          axios
            .post("https://upload.appick.io", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: function (progressEvent) {
                this.progress = parseInt(
                  Math.round((progressEvent.loaded / progressEvent.total) * 100)
                );
              }.bind(this),
            })
            .then((e) => {
              //console.log.log(e);
              this.file = undefined;
              //console.log.log("SUCCESS!!", e);
              var fn = e.data.path;
              this.Send(fn);
              this.optionName = "Sending...";
            })
            .catch((e) => {
              (this.file = undefined), //console.log.log("FAILURE!!", e);
                //this.uploading = false;
                (this.optionName = "Send");
              //this.sign = 'fas fa-user-plus';
            });
        } //Text msg
        else {
          this.Send(null);
          this.optionName = "Sending...";
        }
      }
    },
    Send(fileURL) {
      this.myObj.clsList = [];
      this.myObj.clsList = this.cmbClass.value;
      this.myObj.msgID = this.cmbMessage.value.id;
      this.myObj.fileURL = fileURL;
      var url =
        this.$store.state.domain +
        "/Messages/CreateOutbox?_db=" +
        this.$store.state.db +
        "&cID=" +
        this.$store.state.cID;

      axios({
        method: "post",
        url: url,
        data: qs.stringify(this.myObj),
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

            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message: "Message Sent! <br />Messages sent successfully!",
              type: "success",
              icon: "fa fa-check",
              timeout: this.$store.state.timeout,
            });
          }
        })
        .finally(() => {
          var fileLoader = document.getElementById("file");
          fileLoader.value = null;
          this.sign = "fas fa-user-plus";
          this.saving = false;
          this.optionName = "Upload Lesson";
          this.file = undefined;
          this.selectedFiles = undefined;
          this.progress = 0;
          this.btnDisabled = false;
        });
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
    FillDropdowns() {
      //Classes
      var url =
        this.$store.state.domain +
        "/Fill/ClassesAll?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&localID=" +
        this.$store.state.localID;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log("Error on getting Class: ", response.data);
          } else {
            response.data.data.forEach((element) => {
              this.cmbClass.data.push({ id: element.id, name: element.name });
            });
          }
          this.loading = false;
          this.signMain = "fas fa-plus";
          this.txtMain = "Send";
        })
        .catch(function (error) {
          //console.log.log("Server Error on getting Class: ", error);
        });
    },
    loadSecF(option, id) {
      //cmbSection
      this.cmbSection.data = [];
      this.cmbSection.value = null;
      var url =
        this.$store.state.domain +
        "/Fill/TSections?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&localID=" +
        this.$store.state.localID +
        "&clsID=" +
        option.id;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log("Error on getting sec a: ", response.data);
          } else {
            response.data.data.forEach((element) => {
              this.cmbSection.data.push({ id: element, name: element });
            });
          }
        })
        .catch(function (error) {
          //console.log.log("Server Error on getting Area: ", error);
        });

      //cmbFaculty
      this.cmbFaculty.data = [];
      this.cmbFaculty.value = null;
      var url =
        this.$store.state.domain +
        "/Fill/TFaculty?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&localID=" +
        this.$store.state.localID +
        "&clsID=" +
        option.id;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log("Error on getting fac a: ", response.data);
          } else {
            response.data.data.forEach((element) => {
              this.cmbFaculty.data.push({ id: element.id, name: element.name });
            });
          }
        })
        .catch(function (error) {
          //console.log.log("Server Error on getting fac: ", error);
        });
    },

    Refresh() {
      //Fill Grid
      var url =
        this.$store.state.domain +
        "/BatchAllocation?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&bID=" +
        this.cmbBatch.value.id;
      //console.log.log("url: " + url);
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "success") {
            this.tableData = response.data.data;
          } else {
            //console.log.log("Error on grid: ", response);
          }
        })
        .catch(function (error) {});
    },

    loadSec(option, id) {
      if (option.id === 999) {
        this.opt = true;
        this.opta = false;
        this.cmbFaculty.value.name = "-";
        this.cmbSection.value.name = "-";
      } else if (option.id === 0) {
        this.opta = true;
        this.opt = true;
        this.cmbSection.value.name = "";
        this.cmbFaculty.value.name = "-";
        this.dep.value.name = "-";
      } else {
        this.opt = false;
        this.opta = false;
        this.cmbFaculty.value.name = "All";
        this.dep.value.name = "All";
      }

      this.cmbSection.data = [];
      this.cmbSection.data.push({ id: 0, name: "All" });
      this.cmbSection.value = null;
      var url =
        this.$store.state.domain +
        "/Fill/Sections?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&clsID=" +
        option.id;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log("Error on getting sec: ", response.data);
          } else {
            var i = 0;

            response.data.data.forEach((element) => {
              this.cmbSection.data.push({ id: element.id, name: element.sec });

              if (i === 0) {
                this.cmbSection.value = { id: element.id, name: element.sec };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log("Server Error on getting sec: ", error);
        });
    },

    UpdateValue(option, id) {
      if (id === "cmbSection") {
        this.cmbSection.value = { id: option.id, name: option.name };
      } else if (id === "cmbFaculty") {
        this.cmbFaculty.value = { id: option.id, name: option.name };
      }
    },
    Save() {
      if (this.cmbClass.value === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select a class.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }
      if (this.cmbSection.value === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select a section.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }
      if (this.cmbFaculty.value === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select a faculty.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }

      this.signF = "fas fa-circle-notch fa-spin";
      this.saving = true;
      this.optionF = "Saving...";
      this.myObj.clsID = this.cmbClass.value.id;
      this.myObj.sec = this.cmbSection.value.id;
      this.myObj.facID = this.cmbFaculty.value.id;
      this.myObj.msgID = this.cmbMessage.value.id;

      //Save
      var url =
        this.$store.state.domain +
        "/Messages/CreateOutbox?clsID=" +
        this.myObj.clsID +
        "&sec=" +
        this.myObj.sec +
        "&facID=" +
        this.myObj.facID +
        "&msgID=" +
        this.myObj.msgID +
        "&_db=" +
        this.$store.state.db +
        "&cID=" +
        this.$store.state.cID;
      axios
        .post(url)
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
            //this.tableData.push(response.data.data);
            this.$notify({
              verticalAlign: "bottom",
              horizontalAlign: "center",
              message: "Saved! <br />Sent to outbox.",
              type: "success",
              icon: "fa fa-check",
              timeout: this.$store.state.timeout,
            });
            //this.Refresh();
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
    },

    GetError() {
      return this.nameError;
      return this.prefixError;
    },

    AddModal1() {
      this.modals.showModal1 = true;
    },
    AddModal() {
      this.modals.showModal = true;
      this.$refs.file.value = null;
      this.file = undefined;
      this.myObj.clsList = [];
      this.cmbClass.value = null;
      this.cmbMessage.value = null;
      this.optionName = "Send";
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
        text:
          "You want to delete  " +
          row.Subject +
          " - " +
          row.Class +
          "-" +
          row.Sec +
          " " +
          row.Faculty +
          "?",
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
            "/BatchAllocation/Delete?id=" +
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
                  message: 'Saved! <br />Batch "' + row.Subject + '" removed.',
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
