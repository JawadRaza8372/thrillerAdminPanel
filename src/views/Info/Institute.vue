<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">{{ $route.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-lg-3"></div>
        <div class="col-lg-6">
          <div class="card-wrapper">
            <!-- Input groups -->
            <card>
              <!-- Card header -->
              <h3 slot="header" class="mb-0">Institute Info</h3>
              <!-- Card body -->
              <form>
                <!-- Input groups with icon -->
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      placeholder="Enter institute name"
                      label="Institute name"
                      v-model="myObj.SchoolName"
                      :error="this.nameError"
                    ></base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      placeholder="Enter campus name"
                      label="Campus name"
                      :error="this.campusError"
                      v-model="myObj.SMSTitle"
                    ></base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      placeholder="Enter address"
                      label="Address"
                      v-model="myObj.Addresss"
                      :error="this.addressError"
                    ></base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      placeholder="Enter phone no."
                      type="number"
                      label="Phone no."
                      v-model="myObj.Phone"
                    ></base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input
                      placeholder="Enter mobile no."
                      type="number"
                      label="Mobile no."
                      v-model="myObj.Mob"
                    ></base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      placeholder="Enter email"
                      type="email"
                      label="Email"
                      v-model="myObj.Email"
                    ></base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input
                      placeholder="Enter website"
                      label="Website"
                      v-model="myObj.Website"
                    ></base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      placeholder="Enter bank name"
                      label="Bank name"
                      v-model="myObj.BankName"
                    ></base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input
                      placeholder="Enter account no."
                      label="Account no."
                      v-model="myObj.BankAcntNumber"
                    ></base-input>
                  </div>
                  <div class="col-md-12">
                    <base-input
                      placeholder="Enter bank address"
                      label="Bank address"
                      v-model="myObj.BankAddress"
                    ></base-input>
                  </div>
                </div>
              </form>
            </card>

            <base-button
              :disabled="saving"
              size="lg"
              type="primary"
              class="fixedbutton"
              @click="Save()"
            >
              <i v-bind:class="sign"></i> {{ optionName }}
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Select, Option } from "element-ui";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import HtmlEditor from "@/components/Inputs/HtmlEditor";
import TagsInput from "@/components/Inputs/TagsInput";
import DropzoneFileUpload from "@/components/Inputs/DropzoneFileUpload";
import BaseSlider from "@/components/BaseSlider";
import axios from "axios";
import qs from "qs";

export default {
  name: "form-components",

  components: {
    HtmlEditor,
    TagsInput,
    DropzoneFileUpload,
    BaseSlider,
    flatPicker,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  created() {
    //Grid
    if (this.$store.state.cID > 0) {
      var urlGrid =
        this.$store.state.domain +
        "/Institute?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      //console.log.log('Url', urlGrid);
      axios
        .get(urlGrid)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Grid: ', response.data);
          } else {
            ////console.log.log(response.data.data);
            this.myObj = response.data.data;
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Grid: ', error);
        });
    } else {
      this.optionName = "Add new campus";
    }
  },
  data() {
    return {
      myObj: {
        id: 0,
        SchoolName: "",
        Addresss: "",
        Phone: "",
        Mob: "",
        Email: "",
        Website: "",
        BankName: "",
        BankAddress: "",
        BankAcntNumber: "",
        WorkingDays: null,
        PeriodsInaDay: null,
        PeriodsDuration: null,
        BreakStartsAt: null,
        BreakDuration: null,
        SchoolStartsAt: null,
        SchoolClosesAt: null,
        SMSTitle: "",
      },
      saving: false,
      sign: "far fa-edit",
      optionName: "Save",
      nameError: false,
      campusError: false,
      addressError: false,
      selectOptions: [
        {
          label: "Alerts",
          value: "Alerts",
        },
        {
          label: "Badges",
          value: "Badges",
        },
        {
          label: "Buttons",
          value: "Buttons",
        },
        {
          label: "Cards",
          value: "Cards",
        },
        {
          label: "Forms",
          value: "Forms",
        },
        {
          label: "Modals",
          value: "Modals",
        },
      ],
      selects: {
        simple: "Badges",
        multiple: ["Alerts", "Buttons"],
      },
      dates: {
        simple: new Date(),
        range: "2019-04-19 to 2019-04-24",
      },
      inputs: {
        tags: ["BUCHAREST", "IASI", "TIMISOARA"],
        fileSingle: [],
        fileMultiple: [],
      },
      switches: {
        off: false,
        primary: true,
        default: true,
        danger: true,
        warning: true,
        success: true,
        info: true,
      },
      sliders: {
        simple: 50,
        range: [200, 400],
      },
    };
  },

  methods: {
    loadClientID() {
      //console.log.log('loading clientID ', this.$store.state.db + '_' + this.$store.state.cID);
      var url =
        this.$store.state.domain +
        "/Institute/GetClientID?_db=" +
        this.$store.state.db +
        "_" +
        this.$store.state.cID;
      axios.get(url).then((response) => {
        if (response.data.status === "success") {
          this.$store.commit("clientID", response.data.data);
          //console.log.log('clientID loade ', response.data.data);
        }
      });
    },
    LoadCmbCampus() {
      var url =
        this.$store.state.domain +
        "/Institute/GetAll?_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting cmbCampus: ', response.data);
          } else {
            this.$store.state.campusOptions = [];
            let i = 1;

            //console.log.log(response.data.data);
            response.data.data.forEach((element) => {
              this.$store.state.campusOptions.push({
                id: element.id,
                name: element.SMSTitle,
              });
              if (this.myObj.id === 0) {
                if (i === response.data.data.length) {
                  this.$store.commit("selectedCampus", {
                    id: element.id,
                    name: element.SMSTitle,
                  });
                  this.$store.commit("cID", element.id);
                  this.$store.commit("campusLoaded", true);
                }
              } else {
                if (element.SMSTitle === this.myObj.SMSTitle) {
                  this.$store.commit("selectedCampus", {
                    id: element.id,
                    name: element.SMSTitle,
                  });
                  this.$store.commit("cID", element.id);
                  this.$store.commit("campusLoaded", true);
                  this.$router.go(this.$router.currentRoute);
                }
              }

              i++;
            });
            this.$store.state.campusOptions.push({
              id: 0,
              name: "Add new campus",
              $isDisabled: false,
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting cmbDepartment: ', error);
        });
    },

    Save() {
      if (this.myObj.SchoolName === null || this.myObj.SchoolName.length === 0)
        this.nameError = "Enter institute name";
      else this.nameError = false;

      if (this.myObj.SMSTitle === null || this.myObj.SMSTitle.length === 0)
        this.campusError = "Enter campus name";
      else this.campusError = false;

      if (this.myObj.Addresss === null || this.myObj.Addresss.length === 0)
        this.addressError = "Enter institute address";
      else this.addressError = false;

      if (!this.nameError && !this.campusError && !this.addressError) {
        this.sign = "fas fa-circle-notch fa-spin";
        this.saving = true;
        this.optionName = "Saving";

        if (this.$store.state.cID === 0) {
          //Add
          var url =
            this.$store.state.domain +
            "/Institute/Create?_db=" +
            this.$store.state.db +
            "&cID=" +
            this.$store.state.cID;
          ////console.log.log(url);

          axios({
            method: "post",
            url: url,
            data: qs.stringify(this.myObj),
            validateStatus: (status) => {
              return true;
            },
          })
            .catch((error) => {
              //console.log.log('Server Error on saving: ', error);
            })
            .then((response) => {
              if (response.data.status === "error") {
                //console.log.log('Error saving: ', response.data);
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message: "Request Error! <br />" + response.data.data,
                  type: "danger",
                  icon: "fa fa-ban",
                  timeout: 0,
                });
              } else {
                this.myObj = response.data.data;
                this.$store.commit("cID", response.data.data.id);
                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message:
                    'Saved! <br />New campus "' +
                    this.myObj.SMSTitle +
                    '" added.',
                  type: "success",
                  icon: "fa fa-check",
                  timeout: this.$store.state.timeout,
                });
                this.LoadCmbCampus();
                this.loadClientID();
              }
            })
            .finally(() => {
              this.sign = "far fa-edit";
              this.saving = false;
              this.optionName = "Save";
            });
        } else {
          //Edit
          var url =
            this.$store.state.domain +
            "/Institute/Edit?_db=" +
            this.$store.state.db +
            "&cID=" +
            this.$store.state.cID;
          ////console.log.log(url);

          axios({
            method: "post",
            url: url,
            data: qs.stringify(this.myObj),
            validateStatus: (status) => {
              return true;
            },
          })
            .catch((error) => {
              //console.log.log('Server Error on saving: ', error);
            })
            .then((response) => {
              if (response.data.status === "error") {
                //console.log.log('Error saving: ', response.data);
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
                    'Saved! <br />Campus "' + this.myObj.SMSTitle + '" saved.',
                  type: "success",
                  icon: "fa fa-check",
                  timeout: this.$store.state.timeout,
                });
                this.LoadCmbCampus();
                this.$store.commit("selectedCampus", {
                  id: response.data.data.id,
                  name: response.data.data.SMSTitle,
                });
              }
            })
            .finally(() => {
              this.sign = "far fa-edit";
              this.saving = false;
              this.optionName = "Save";
            });
        }
      }
    },
  },
};
</script>

<style>
.fixedbutton {
  position: fixed;
  bottom: 0px;
  right: 0px;
  margin-right: 60px;
  margin-bottom: 30px;
}
</style>
