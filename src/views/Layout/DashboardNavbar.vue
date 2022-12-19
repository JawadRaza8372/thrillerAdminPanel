<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top border-bottom navbar-expand"
    :class="{ 'bg-success navbar-dark': type === 'default' }"
  >
    <input hidden id="btnFile" ref="file" type="file" @change="HandleUpload" />

    <!--      
   <base-input  addon-left-icon="ni ni-calendar-grid-58">
      <flat-picker
        slot-scope="{ focus, blur }"
        @on-open="focus"
        @on-close="blur"
        :config="{ allowInput: true, mode: 'range' }"
        class="form-control datepicker"
        v-model="dates.range"
      >
      </flat-picker>
    </base-input>
       

    <ul class="navbar-nav align-items-center ml-md-auto">
      <li class="nav-item d-xl-none">
        
        <div
          class="pr-3 sidenav-toggler"
          :class="{
            active: $sidebar.showSidebar,
            'sidenav-toggler-dark': type === 'default',
            'sidenav-toggler-light': type === 'light',
          }"
          @click="toggleSidebar"
        >
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </div>
      </li>
      <li class="nav-item d-sm-none">
        <a
          class="nav-link"
          href="#"
          data-action="search-show"
          data-target="#navbar-search-main"
        >
          <i class="ni ni-zoom-split-in"></i>
        </a>
      </li>
    </ul>
    

    <ul class="navbar-nav align-items-center ml-auto ml-md-0">
      <base-dropdown
        menu-on-right
        class="nav-item"
        tag="li"
        title-tag="a"
        title-classes="nav-link pr-0"
      >
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <div class="media align-items-center">
            <span class="avatar avatar-sm rounded-circle">
              <img
                alt="Image placeholder"
                src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
              />
            </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm font-weight-bold">Thriller</span>
            </div>
          </div>
        </a>

        <template>
          <div class="dropdown-header noti-title">
            <h6 class="text-overflow m-0">Welcome!</h6>
          </div>

          <a href="#!" class="dropdown-item">
            <i class="ni ni-settings-gear-65"></i>
            <span>Settings</span>
          </a>

          <a href="#!" class="dropdown-item">
            <i class="ni ni-support-16"></i>
            <span>Support</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="/" class="dropdown-item">
            <i class="ni ni-user-run"></i>
            <span>Logout</span>
          </a>
        </template>
      </base-dropdown>
    </ul> 

 -->

    <!-- Search form -->
    <form
      class="navbar-search form-inline mr-sm-3"
      :class="{
        'navbar-search-light': type === 'default',
        'navbar-search-dark': type === 'light',
      }"
      id="navbar-search-main"
    ></form>

    <div class="row col-12">
      <div class="col-md-2 col-7">
        <base-input addon-left-icon="ni ni-calendar-grid-58">
          <flat-picker
            slot-scope="{ focus, blur }"
            @on-open="focus"
            @on-close="blur"
            :config="{ allowInput: true, mode: 'range' }"
            class="form-control datepicker"
            v-model="dates.range"
          >
          </flat-picker>
        </base-input>
      </div>
      <div class="col-md-9 col-3">
        <span class="btn-inner--icon">
          <i
            class="mt-3 fas fa-sync-alt"
            style="color: white"
            @click="getdate()"
          >
          </i>
        </span>
      </div>
      <div class="col-md-1 col-2">
        <ul class="navbar-nav align-items-center ml-md-auto">
          <li class="nav-item d-xl-none">
            <div
              class="pr-3 sidenav-toggler"
              :class="{
                active: $sidebar.showSidebar,
                'sidenav-toggler-dark': type === 'default',
                'sidenav-toggler-light': type === 'light',
              }"
              @click="toggleSidebar"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </div>
          </li>
          <!-- <li class="nav-item d-sm-none">
        <a
          class="nav-link"
          href="#"
          data-action="search-show"
          data-target="#navbar-search-main"
        >
          <i class="ni ni-zoom-split-in"></i>
        </a>
      </li> -->
        </ul>

        <ul class="navbar-nav align-items-center ml-auto ml-md-0">
          <base-dropdown
            menu-on-right
            class="nav-item"
            tag="li"
            title-tag="a"
            title-classes="nav-link pr-0"
          >
            <a
              href="#"
              class="nav-link pr-0"
              @click.prevent
              slot="title-container"
            >
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img
                    alt="Image placeholder"
                    src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
                  />
                </span>
                <div class="media-body ml-2 d-none d-lg-block">
                  <span class="mb-0 text-sm font-weight-bold">Thriller</span>
                </div>
              </div>
            </a>

            <template>
              <div class="dropdown-header noti-title">
                <h6 class="text-overflow m-0">Welcome!</h6>
              </div>

              <a href="#!" class="dropdown-item">
                <i class="ni ni-settings-gear-65"></i>
                <span>Settings</span>
              </a>

              <a href="#!" class="dropdown-item">
                <i class="ni ni-support-16"></i>
                <span>Support</span>
              </a>
              <div class="dropdown-divider"></div>
              <a href="/" class="dropdown-item">
                <i class="ni ni-user-run"></i>
                <span>Logout</span>
              </a>
            </template>
          </base-dropdown>
        </ul>
      </div>
    </div>

    <modal
      :show.sync="modals.showModal"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-lg"
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
            <div class="col-md-12" style="width: 100%">
              <div class="row">
                <div class="col-md-6 col-md-6">
                  <base-input label="Report">
                    <multiselect
                      placeholder="Select Report"
                      v-model="cmbReport.value"
                      :options="cmbReport.data"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :hide-selected="false"
                      :preserve-search="true"
                      label="name"
                      track-by="name"
                      :preselect-first="true"
                      id="cmbReport"
                    >
                    </multiselect>
                  </base-input>
                </div>
                <div class="col-md-6">
                  <base-input label="Report Type">
                    <multiselect
                      placeholder="Select Report Type"
                      v-model="cmbReportType.value"
                      :options="cmbReportType.data"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :hide-selected="false"
                      :preserve-search="true"
                      label="name"
                      track-by="name"
                      :preselect-first="true"
                      id="cmbReportType"
                    >
                    </multiselect>
                  </base-input>
                </div>
              </div>
              <div v-show="defaulter">
                <div class="row" style="width: 100%">
                  <div
                    class="col-lg-3 col-md-6 col-sm-6"
                    style="border: 1px solid #fff"
                  >
                    <b-form-radio-group
                      size="sm"
                      v-model="selected.classFamily"
                      :options="options.classFamily"
                      buttons
                      name="radios-btn-default"
                    >
                    </b-form-radio-group>
                  </div>

                  <div class="col-lg-3 col-md-6 col-sm-6">
                    <b-form-radio-group
                      size="sm"
                      v-model="selected.schoolClass"
                      :options="options.schoolClass"
                      buttons
                      name="radios-btn-default"
                    >
                    </b-form-radio-group>
                  </div>

                  <div
                    class="col-lg-3 col-md-6 col-sm-6"
                    style="margin-top: 10px"
                  >
                    <b-form-radio-group
                      size="sm"
                      v-model="selected.gender"
                      :options="options.gender"
                      buttons
                      name="radios-btn-default"
                    >
                    </b-form-radio-group>
                  </div>

                  <div
                    class="col-lg-3 col-md-6 col-sm-6"
                    style="margin-top: 10px"
                  >
                    <b-form-radio-group
                      size="sm"
                      v-model="selected.status"
                      :options="options.status"
                      buttons
                      name="radios-btn-default"
                    >
                    </b-form-radio-group>
                  </div>
                </div>

                <div class="row" style="margin-top: 15px">
                  <div class="col-lg-4 col-md-6">
                    <base-input label="Department">
                      <multiselect
                        placeholder="Select Department"
                        v-model="cmbDepartment.value"
                        :options="cmbDepartment.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbDepartment"
                      >
                      </multiselect>
                    </base-input>
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <base-input label="Fee Type">
                      <multiselect
                        placeholder="Select Fee Type"
                        v-model="cmbFeeType.value"
                        :options="cmbFeeType.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbFeeType"
                      >
                      </multiselect>
                    </base-input>
                  </div>
                  <div class="col-lg-4 col-md-12">
                    <base-input
                      label="Balance Over"
                      class="mb-3"
                      name="fee"
                      type="number"
                      placeholder="Balance Over"
                      v-model="balanceOver"
                      v-bind:error="nameError"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-6 col-md-12">
                    <div class="row">
                      <div class="col-md-6">
                        <base-input label="Class">
                          <multiselect
                            placeholder="Select Class"
                            v-model="cmbClass.value"
                            :options="cmbClass.data"
                            :close-on-select="true"
                            :clear-on-select="false"
                            :hide-selected="false"
                            :preserve-search="true"
                            label="name"
                            track-by="name"
                            :preselect-first="true"
                            id="cmbClass"
                          >
                          </multiselect>
                        </base-input>
                      </div>
                      <div class="col-md-6">
                        <base-input label="Sec">
                          <multiselect
                            placeholder="Select Sec"
                            v-model="cmbSec.value"
                            :options="cmbSec.data"
                            :close-on-select="true"
                            :clear-on-select="false"
                            :hide-selected="false"
                            :preserve-search="true"
                            label="name"
                            track-by="name"
                            :preselect-first="true"
                            id="cmbSec"
                          >
                          </multiselect>
                        </base-input>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-12 col-sm-12">
                    <div class="row">
                      <div class="col-md-6">
                        <base-input label="From">
                          <flat-picker
                            slot-scope="{ focus, blur }"
                            @on-open="focus"
                            @on-close="blur"
                            v-model="fromDate"
                            placeholder="From"
                            :config="{ allowInput: true }"
                            class="form-control datepicker"
                          >
                          </flat-picker>
                        </base-input>
                      </div>

                      <div class="col-md-6">
                        <base-input label="To">
                          <flat-picker
                            slot-scope="{ focus, blur }"
                            @on-open="focus"
                            @on-close="blur"
                            v-model="toDate"
                            placeholder="To"
                            :config="{ allowInput: true }"
                            class="form-control datepicker"
                          >
                          </flat-picker>
                        </base-input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <base-button :disabled="saving" type="primary" class="col"
                ><i v-bind:class="sign"></i> {{ optionName }}</base-button
              >
            </div>
          </form>
        </template>
      </card>
    </modal>
  </base-nav>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import { BaseNav, Modal } from "@/components";
import axios from "axios";
import qs from "qs";
import Vue from "vue";
import Multiselect from "vue-multiselect";
import router from "vue";
import swal from "sweetalert2";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";
import { BFormRadioGroup } from "bootstrap-vue";

Vue.component("b-form-radio-group", BFormRadioGroup);

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal,
    flatPicker,
    Multiselect,
  },
  props: {
    type: {
      type: String,
      default: "default", // default|light
      description:
        "Look of the dashboard navbar. Default (Green) or light (gray)",
    },
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },

    selectedCampus: {
      //onChange
      get() {
        return this.$store.state.selectedCampus;
      },
      set(value) {
        if (value.id == 0) {
          this.$store.commit("cID", 0);
          this.$store.commit("selectedCampus", "");
          this.gotoIns();
        } else {
          this.$store.commit("selectedCampus", value);
          this.$store.commit("cID", value.id);
          this.loadClientID(true);
        }
      },
    },
  },
  mounted() {
    //cmbCampus
    var url =
      this.$store.state.domain +
      "/Institute/GetAll?_db=" +
      this.$store.state.db;
    axios
      .get(url)
      .then((response) => {
        if (response.data.status === "error") {
          //console.log.log("Error on getting cmbCampus: ", response.data);
        } else {
          if (!this.$store.state.campusLoaded) {
            this.$store.state.campusOptions = [];
            let i = 0;
            response.data.data.forEach((element) => {
              this.$store.state.campusOptions.push({
                id: element.id,
                name: element.SMSTitle,
              });
              if (i === 0) {
                this.$store.commit("selectedCampus", {
                  id: element.id,
                  name: element.SMSTitle,
                });
                this.$store.commit("cID", element.id);
                this.$store.commit("campusLoaded", true);
                this.loadClientID(false);
              }
              i++;
            });

            this.$store.state.campusOptions.push({
              id: 0,
              name: "Add new campus",
              $isDisabled: false,
            });
          }
        }
      })
      .catch(function (error) {
        //console.log.log("Server Error on getting cmbDepartment: ", error);
      });
  },
  data() {
    return {
      dates: {
        range: "",
      },
      splitDate: {
        splitedDate: "",
        from: "",
        to: "",
      },
      file: "",
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",
      value: this.$store.state.campusValue,

      defaulter: true,

      cmbReport: {
        value: null,
        data: [],
      },

      cmbReportType: {
        value: null,
        data: [],
      },
      cmbDepartment: {
        value: null,
        data: [],
      },
      cmbFeeType: {
        value: null,
        data: [],
      },
      cmbClass: {
        value: null,
        data: [],
      },
      cmbSec: {
        value: null,
        data: [],
      },
      fromDate: null,
      toDate: null,
      balanceOver: 0,
      modals: {
        showModal: false,
      },

      selected: {
        classFamily: "Class Wise",
        schoolClass: "Whole School",
        gender: "All",
        status: "Present",
      },
      options: {
        classFamily: [
          { text: "Class Wise", value: "Class Wise" },
          { text: "Family Wise", value: "Family Wise" },
        ],
        schoolClass: [
          { text: "Whole School", value: "Whole School" },
          { text: "Selected Class", value: "false" },
        ],
        gender: [
          { text: "All", value: "All" },
          { text: "Male", value: "Male" },
          { text: "Female", value: "Female" },
        ],

        status: [
          { text: "Present", value: "Present" },
          { text: "Left", value: "Left" },
          { text: "Other", value: "Other" },
        ],
      },

      optionName: "Show",
      saving: false,
      sign: "fas fa-edit",
    };
  },
  methods: {
    getdate() {
      this.splitDate.splitedDate = this.dates.range.split(" ");
      this.splitDate.from = this.splitDate.splitedDate[0];
      this.splitDate.to = this.splitDate.splitedDate[2];
      //console.log.log(this.splitDate.from);
      //console.log.log(this.splitDate.to);
    },
    reloadPage() {
      window.location.reload();
    },
    loadClientID(refresh) {
      //console.log.log(this.$store.state.db + "_" + this.$store.state.cID);
      var url =
        this.$store.state.domain +
        "/Institute/GetClientID?_db=" +
        this.$store.state.db +
        "_" +
        this.$store.state.cID;
      axios.get(url).then((response) => {
        if (response.data.status === "success") {
          this.$store.commit("clientID", response.data.data);
          if (refresh) this.$router.go(this.$router.currentRoute);
        }
      });
    },
    Upload() {
      //click
      var elem = this.$refs.file;
      elem.click();
    },
    HandleUpload(event) {
      this.file = this.$refs.file.files[0];
      //console.log.log("file", this.file);
      let formData = new FormData();
      formData.append("files", this.file);
      var url =
        this.$store.state.domain +
        "/Uploader/UploadAndImport?_db=" +
        this.$store.state.db +
        "&cID=" +
        this.$store.state.cID +
        "&clientID=" +
        this.$store.state.clientID;
      //console.log.log(url);
      axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          //File Uploaded Successfully!
          //this.$notify({verticalAlign: 'bottom', horizontalAlign: 'center', message: 'Uploaded! <br />File is uploaded. You will be notified when it is processed.', type: 'success', icon: 'fa fa-check', timeout: this.$store.state.timeout });
          //console.log.log(response);
        })
        .catch(function (err) {
          //console.log.log(err);
          //this.$notify({verticalAlign: 'bottom', horizontalAlign: 'center', message: 'Request Error! <br />' + response.data.message, type: 'danger', icon: 'fa fa-ban', timeout: 0 });
        });
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    onSelect(option, id) {},
    gotoIns() {
      this.$router.push("ins");
    },

    reportModal() {
      //console.log.log("HEREEE");
      this.modals.showModal = true;
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
