<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Manage Lectures</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <!-- <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div> -->
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
            <base-input label="Class:" :disabled="clsDisabled">
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

            <!-- <base-input label="Section:">                    
                                <multiselect                                                 
                                  placeholder="Select section"   
                                  v-model="cmbSection.value" 
                                  :options="cmbSection.data" 
                                  :close-on-select="true" 
                                  :clear-on-select="false" 
                                  :hide-selected="false" 
                                  :preserve-search="true"                      
                                  label="name" 
                                  track-by="name" 
                                  :preselect-first="true"
                                   @select="UpdateValue" 
                                  id="cmbSection">
                                </multiselect>

                            </base-input>

                             <base-input label="Faculty:">                    
                                <multiselect                                                 
                                  placeholder="Select faculty"   
                                  v-model="cmbFaculty.value" 
                                  :options="cmbFaculty.data" 
                                  :close-on-select="true" 
                                  :clear-on-select="false" 
                                  :hide-selected="false" 
                                  :preserve-search="true"                      
                                  label="name" 
                                  track-by="name" 
                                  :preselect-first="true"
                                   @select="UpdateValue" 
                                  id="cmbFaculty">
                                </multiselect>

                            </base-input> -->

            <base-input label="Subject:">
              <multiselect
                placeholder="Select subject"
                v-model="cmbSubject.value"
                :options="cmbSubject.data"
                :close-on-select="true"
                :clear-on-select="false"
                :hide-selected="false"
                :preserve-search="true"
                label="name"
                track-by="name"
                :multiple="false"
                :preselect-first="true"
                id="cmbSubject"
              >
              </multiselect>
            </base-input>

            <base-input
              label="Title:"
              class="mb-3"
              name="title"
              type="text"
              placeholder="Enter Title"
              v-model="myObj.title"
              v-bind:error="titleError"
            />

            <base-input label="Date">
              <flat-picker
                slot-scope="{ focus, blur }"
                @on-open="focus"
                @on-close="blur"
                :config="{ allowInput: true }"
                class="form-control datepicker"
                v-model="myObj.date"
              >
              </flat-picker>
            </base-input>

            <base-input
              label="File URL:"
              class="mb-3"
              name="fileURL"
              type="text"
              placeholder="File URL"
              v-model="myObj.fileURL"
            />

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

            <label v-if="this.myObj.id == 0" class="btn btn-success col">
              <input
                type="file"
                id="file"
                ref="file"
                @change="selectFile"
                accept="video/mp4"
              />
            </label>

            <base-button
              :disabled="btnDisabled"
              v-if="myObj.fileURL.length > 0 || btnActive"
              class="col btn-success"
              @click="upload"
            >
              <!-- <i v-bind:class="signC"></i> -->
              {{ this.optionName }}
            </base-button>

            <base-button
              class="col btn-primary"
              style="margin-top: 10px"
              :disabled="disbleLive"
              v-if="this.myObj.id === 0"
              @click="GoLive"
            >
              <i v-bind:class="signLiveC"></i>
              {{ this.optionLive }}
            </base-button>

            <!-- <base-input label="Choose File">
                               <input type="file" id="file">
                             </base-input> -->

            <!-- <div >
                            <base-button @click="Save()" :disabled="savingC" type="primary" class="col" ><i v-bind:class="signC"></i> {{ this.optionName }} </base-button>
                        </div> -->
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
              <div style="margin-bottom: 5px">
                <base-button
                  :disabled="btnDisabled"
                  icon
                  type="primary"
                  @click="AddModal()"
                >
                  <span class="btn-inner--icon"
                    ><i v-bind:class="sign"></i
                  ></span>
                  <span class="btn-inner--text">{{ optionMain }}</span>
                </base-button>

                <!-- <base-button icon type="primary" @click="Live()">
                  <span class="btn-inner--icon"
                    ><i v-bind:class="signLive"></i
                  ></span>
                  <span class="btn-inner--text">Start Live Class</span>
                </base-button> -->

                <!-- <base-button hidden icon v-if="selectedRows.length" type="danger" @click="RemoveSelected()">
                        <span class="btn-inner--icon"><i class="fas fa-trash"></i></span>
                        <span class="btn-inner--text">Remove selected</span>            
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

              <el-table-column min-width="180px" align="right" label="Homework">
                <div slot-scope="{ $index, row }" class="d-flex">
                  <base-button
                    @click="editRecord($index, row)"
                    class="like btn-link"
                    type="primary"
                    size="sm"
                    icon
                  >
                    <i class="text-white far fa-eye"></i>
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
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import Multiselect from "vue-multiselect";
import moment from "moment";

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
    this.sign = "fas fa-circle-notch fa-spin";
    this.btnDisabled = true;

    var url =
      this.$store.state.domain +
      "/Lessons?localID=" +
      this.$store.state.localID +
      "&cID=" +
      this.$store.state.cID +
      "&_db=" +
      this.$store.state.db;
    ////console.log.log('url: ' + url);
    axios
      .get(url)
      .then((response) => {
        // handle success
        ////console.log.log(response);
        if (response.data.status === "error") {
          //this.$notify({verticalAlign: 'bottom', horizontalAlign: 'center', message: 'Request Error! <br />' + response.data.status.data, type: 'danger', icon: 'fa fa-ban',timeout: 0 });
        } else {
          this.FillDropdowns();
          this.LoadSubjects();
          response.data.data.forEach((element) => {
            if (element.date !== null)
              element.date = moment(element.date).format("DD MMM YYYY, ddd");
          });
          this.tableData = response.data.data;
          //console.log.log("Data: ", response.data.data);
        }
      })
      .catch(function (error) {
        // handle error
        //this.$notify({verticalAlign: 'bottom', horizontalAlign: 'center', message: 'Request Error! <br />', type: 'danger', icon: 'fa fa-ban', timeout: 0 });
      });
  },
  data() {
    return {
      btnActive: false,
      currentDate: moment().format("YYYY-MM-DD"),
      titleError: "",
      file: "",
      selectedFiles: undefined,
      progress: 0,
      message: "",
      btnDisabled: true,
      clsDisabled: false,
      signLive: "fa fa-web",
      optionLive: "Create live session",
      signLiveC: "fas fa-web",
      disbleLive: false,
      optionMain: "Create live session or upload lectures",
      pw: "6199163",
      myObj: {
        id: 0,
        tID: null,
        clsID: null,
        sec: null,
        facID: null,
        subID: null,
        date: null,
        description: null,
        //  day: null,
        //  mn: null,
        //  year: null,
        title: "",
        fileURL: "",
        youtubeURL: null,
        campusID: null,
        publishedOn: null,
        expiresOn: null,
        clsList: null,
      },
      propsToSearch: ["title"],
      tableColumns: [
        {
          prop: "title",
          label: "Title",
          minWidth: 250,
          sortable: false,
        },
        {
          prop: "Class",
          label: "Class",
          minWidth: 150,
          sortable: false,
        },
        {
          prop: "Sec",
          label: "Sec",
          minWidth: 180,
          sortable: false,
        },
        {
          prop: "Subject",
          label: "Subject",
          minWidth: 180,
          sortable: false,
        },
        {
          prop: "date",
          label: "Date",
          minWidth: 200,
          sortable: false,
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
      cmbClass: {
        value: null,
        data: [],
      },
      cmbSection: {
        value: null,
        data: [],
      },
      cmbFaculty: {
        value: null,
        data: [],
      },

      cmbSubject: {
        value: null,
        data: [],
      },
    };
  },
  methods: {
    seconds_since_epoch(d) {
      return Math.floor(d / 1000);
    },
    GoLive() {
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
      } else if (this.cmbSubject.value == null || this.cmbSubject.value == "") {
        //Empty dropdown
        this.$notify({
          verticalAlign: "bottom",
          horizontalAlign: "center",
          message: "Error! <br />" + "Please select a subject.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: this.$store.state.timeout,
        });
      } else if (this.myObj.title == null || this.myObj.title == "") {
        //Empty Title
        this.titleError = "Please enter a title";
      } else {
        this.disbleLive = true;
        this.titleError = false;
        this.optionLive = "Going live...";
        this.signLiveC = "fas fa-circle-notch fa-spin";
        var date = new Date();

        var epocSecs = this.seconds_since_epoch(date);
        var meetID =
          this.$store.state.db + "-" + this.$store.state.cID + "-" + epocSecs;
        //console.log.log(meetID);

        var pw = this.pw;
        var liveObj = {
          name: this.myObj.title,
          meetingID: meetID,
          attendeePW: pw,
          moderatorPW: pw.split("").reverse().join(""),
        };

        //console.log.log(liveObj);

        axios({
          method: "post",
          url: "https://meet.appick.io/api/server/create",
          data: liveObj,
          validateStatus: (status) => {
            return true;
          },
        })
          .catch((error) => {
            //console.log.log("Server Error on going live...: ", error);
          })
          .then((response) => {
            //console.log.log("Live session created:", response);
            //Save Live Session
            this.myObj.clsID = this.cmbClass.value.id;
            this.myObj.subID = this.cmbSubject.value.id;
            this.myObj.fileURL = "#meetingID=" + meetID;
            this.myObj.campusID = this.$store.state.cID;
            this.myObj.tID = 0;
            this.myObj.clsList = this.cmbClass.value;
            //console.log.log(this.myObj);
            var url =
              this.$store.state.domain +
              "/Lessons/Create?_db=" +
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
                  response.data.data.forEach((element) => {
                    if (element.date !== null)
                      element.date = moment(element.date).format(
                        "DD MMM YYYY, ddd"
                      );
                    this.tableData.push(element);
                  });

                  this.$notify({
                    verticalAlign: "bottom",
                    horizontalAlign: "center",
                    message:
                      'Saved! <br />Live session for "' +
                      this.myObj.title +
                      '" saved..',
                    type: "success",
                    icon: "fa fa-check",
                    timeout: this.$store.state.timeout,
                  });
                }
              })
              .finally(() => {
                this.disbleLive = false;
                this.optionLive = "Create live session";
                this.signLiveC = "fas fa-web";
              });
          });
      }
    },
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
      }
      // else if(this.cmbSection.value == null || this.cmbSection.value == '') //Empty dropdown
      // {
      //   this.$notify({verticalAlign: 'bottom', horizontalAlign: 'center', message: 'Error! <br />' + 'Please select a seciton.', type: 'danger', icon: 'fa fa-ban', timeout: this.$store.state.timeout });
      // }
      // else if(this.cmbFaculty.value == null || this.cmbFaculty.value == '') //Empty dropdown
      // {
      //   this.$notify({verticalAlign: 'bottom', horizontalAlign: 'center', message: 'Error! <br />' + 'Please select faculty.', type: 'danger', icon: 'fa fa-ban', timeout: this.$store.state.timeout });
      // }
      else if (this.cmbSubject.value == null || this.cmbSubject.value == "") {
        //Empty dropdown
        this.$notify({
          verticalAlign: "bottom",
          horizontalAlign: "center",
          message: "Error! <br />" + "Please select a subject.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: this.$store.state.timeout,
        });
      } else if (this.myObj.title == null || this.myObj.title == "") {
        //Empty Title
        this.titleError = "Please enter a title";
      } else {
        this.btnDisabled = true;
        this.titleError = false;
        this.sign = "fas fa-circle-notch fa-spin";
        if (this.myObj.fileURL.length > 0) {
          //URL
          this.saveLesson(this.myObj.fileURL);
          this.optionName = "Saving...";
        } else {
          //Upload
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
              ////console.log.log(e);
              this.file = undefined;
              //console.log.log("SUCCESS!!", e);
              var fn =
                "https://appick.io/w?c=lessons&n=" +
                e.data.myresp[0].filename.split(".").slice(0, -1).join(".");
              this.saveLesson(fn);
              //uploading = false;
              this.optionName = "Saving...";
            })
            .catch((e) => {
              (this.file = undefined), //console.log.log("FAILURE!!", e);
                //this.uploading = false;
                (this.optionName = "Upload Lesson");
              this.sign = "fas fa-user-plus";
            });
        }
      }
    },
    saveLesson(fileURL) {
      //console.log.log("upload:", fileURL);
      if (this.myObj.id === 0) {
        //Add
        this.myObj.clsID = this.cmbClass.value.id;
        this.myObj.subID = this.cmbSubject.value.id;
        this.myObj.fileURL = fileURL;
        this.myObj.campusID = this.$store.state.cID;
        this.myObj.tID = 0;
        this.myObj.clsList = this.cmbClass.value;
        //console.log.log(this.myObj);
        var url =
          this.$store.state.domain +
          "/Lessons/Create?_db=" +
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
              response.data.data.forEach((element) => {
                if (element.date !== null)
                  element.date = moment(element.date).format(
                    "DD MMM YYYY, ddd"
                  );
                this.tableData.push(element);
              });

              this.$notify({
                verticalAlign: "bottom",
                horizontalAlign: "center",
                message:
                  'Saved! <br />Lesson of "' + this.myObj.title + '" saved..',
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
      } //Edit
      else {
        this.selectedFiles = undefined; //To enable edit button
      }
    },
    date: function (date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    selectFile() {
      this.btnActive = true;
      this.file = this.$refs.file.files[0];
      this.selectedFiles = this.$refs.file.files;
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
        })
        .catch(function (error) {
          //console.log.log("Server Error on getting Class: ", error);
        })
        .finally(() => {
          this.btnDisabled = false;
          this.sign = "fas fa-plus";
        });
    },

    LoadSubjects() {
      //Load Subjects
      this.cmbSubject.data = [];
      this.cmbSubject.value = null;

      var url =
        this.$store.state.domain +
        "/Fill/TSubjects?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&localID=" +
        this.$store.state.localID +
        "&clsID=0" +
        "&sec=-" +
        "&fac=0";
      if (this.$store.state.localID !== 0) {
        this.$store.state.domain +
          "/Fill/TSubjects?cID=" +
          this.$store.state.cID +
          "&_db=" +
          this.$store.state.db +
          "&localID=" +
          this.$store.state.localID +
          "&clsID=" +
          this.cmbClass.value.id +
          "&sec=" +
          this.cmbSection.value.name +
          "&fac=" +
          this.cmbFaculty.value.id;
      }
      //console.log.log(url);

      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log("Error on getting subs: ", response.data);
          } else {
            response.data.data.forEach((element) => {
              this.cmbSubject.data.push({ id: element.id, name: element.name });
            });
          }
        })
        .catch(function (error) {
          //console.log.log("Server Error on getting subs: ", error);
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

    UpdateValue(option, id) {
      if (id === "cmbClass") {
        this.cmbClass.value = { id: option.id, name: option.name };
      } else if (id === "cmbSubject") {
        this.cmbSubject.value = { id: option.id, name: option.name };
      }
    },
    selectionChange(selectedRows) {
      this.selectedRows = selectedRows;
    },
    GetError() {
      return this.nameError;
      return this.prefixError;
    },
    AddModal() {
      this.btnActive = false;
      this.$refs.file.value = null;
      this.saving = false;
      this.myObj.id = 0;
      this.selectedFiles = undefined;
      this.file = undefined;
      this.myObj.title = null;
      this.modals.showModal = true;
      this.shouldAdd = true;
      this.optionName = "Upload Lesson";
      this.modals.showModal = true;
      this.sign = "fas fa-user-plus";
      this.myObj.date = this.currentDate;
      this.myObj.fileURL = "";
      this.clsDisabled = false;
      this.cmbSubject.value = null;
      this.cmbClass.value = null;
    },
    editRecord(index, row) {
      if (row.fileURL.indexOf("#meetingID") !== -1) {
        //Join meeting as Teacher
        this.btnDisabled = true;
        this.optionMain = "Joining live session...";
        this.sign = "fas fa-circle-notch fa-spin";

        //Join class
        var obj = {
          name: "Teacher",
          meetingID: row.fileURL.split("=")[1],
          password: this.pw.split("").reverse().join(""),
          userID: "admin",
        };
        //console.log.log(obj);
        axios({
          method: "post",
          url: "https://meet.appick.io/api/server/join",
          data: obj,
          validateStatus: (status) => {
            return true;
          },
        })
          .catch((error) => {
            //console.log.log("Server Error on joining live...: ", error);
            //this.optionMain = "Joining live session...";
          })
          .then((response) => {
            //console.log.log(response);
            window.open(response.data.data, "_blank");
          });

        this.btnDisabled = false;
        this.sign = "fas fa-plus";
        this.optionMain = "Create live session or upload lectures";
      } else {
        window.open(row.fileURL, "_blank");
      }
    },
    handleDelete(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to delete lesson " + row.title + "?",
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
            "/Lessons/Delete?id=" +
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
                  message: 'Saved! <br />Lesson "' + row.title + '" removed.',
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
    Live() {
      //var liveMessenger = 'https://www.messenger.com/groupcall/create?source=whatsapp&ep=3';
      window.open(
        "https://accounts.google.com/signin/v2/identifier?ltmpl=meet&continue=https%3A%2F%2Fmeet.google.com%2Fnew%3Fhs%3D195&flowName=GlifWebSignIn&flowEntry=ServiceLogin",
        "_blank"
      );
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
