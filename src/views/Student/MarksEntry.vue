<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Marks Entry</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
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
              <base-input label="Current Class">
                <multiselect
                  placeholder="Select current class"
                  v-model="cmbCurrentClass.value"
                  :options="cmbCurrentClass.data"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :hide-selected="false"
                  :preserve-search="true"
                  label="name"
                  track-by="name"
                  :preselect-first="true"
                  @select="loadSecCurrent"
                  id="cmbCurrentClass"
                >
                </multiselect>
              </base-input>

              <base-input label="Section (current)">
                <multiselect
                  placeholder="Section (current)"
                  v-model="cmbCurrentSec.value"
                  :options="cmbCurrentSec.data"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :hide-selected="false"
                  :preserve-search="true"
                  label="name"
                  track-by="name"
                  :preselect-first="true"
                  id="cmbCurrentSec"
                >
                </multiselect>
              </base-input>

              <base-input label="Faculty (current)">
                <multiselect
                  placeholder="Select faculty (current)"
                  v-model="cmbFacultyCurrent.value"
                  :options="cmbFacultyCurrent.data"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :hide-selected="false"
                  :preserve-search="true"
                  label="name"
                  track-by="name"
                  :preselect-first="true"
                  id="cmbFacultyCurrent"
                >
                </multiselect>
              </base-input>

              <base-input label="Exam Type">
                <el-select
                  v-model="myObj.examtype"
                  filterable
                  placeholder="Exam Type"
                >
                  <el-option label="-" value="-"> </el-option>
                  <el-option label="-" value="-"> </el-option>
                </el-select>
              </base-input>
              <base-input label="Subject:">
                <multiselect
                  placeholder="Select subject"
                  v-model="cmbSubject.value"
                  :options="cmbSubject.data"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :hide-selected="false"
                  :preserve-search="true"
                  label="name"
                  track-by="name"
                  :multiple="true"
                  :preselect-first="true"
                  @select="UpdateValue"
                  id="cmbSubject"
                >
                </multiselect>
              </base-input>
              <base-input label="Load Section">
                <el-select
                  v-model="myObj.examtype"
                  filterable
                  placeholder="Load Section"
                >
                  <el-option label="-" value="-"> </el-option>
                  <el-option label="-" value="-"> </el-option>
                </el-select>
              </base-input>

              <div>
                <base-button
                  :disabled="saving"
                  @click="Save()"
                  type="primary"
                  class="col"
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
              class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
              <div style="margin-bottom: 5px">
                <base-button icon type="primary" @click="AddModal()">
                  <span class="btn-inner--icon"
                    ><i class="fas fa-plus"></i
                  ></span>
                  <span class="btn-inner--text">Enter Marks</span>
                </base-button>

                <base-button
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
              <el-table-column label="Name"> </el-table-column>
              <el-table-column label="Father Name"> </el-table-column>
              <el-table-column label="Total Marks" type="number">
              </el-table-column>

              <el-table-column
                min-width="180px"
                align="right"
                label="Obtained Marks"
              >
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
import Multiselect from "vue-multiselect";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  mixins: [clientPaginationMixin],
  components: {
    BasePagination,
    Multiselect,
    flatPicker,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },

  created() {
    this.fillDropdowns();
    this.populateData();

    if (this.$store.state.sID === 0) {
      this.sign = "fas fa-user-plus";
      if (this.$store.state.register) this.optionName = "Register student";
      else this.optionName = "Add student";
    } else {
      this.optionName = "Edit record";
      this.sign = "far fa-edit";
    }

    if (this.$store.state.register) this.adLabel = "registration";
    else this.adLabel = "admission";
  },

  data() {
    return {
      propsToSearch: ["G.R No"],

      tableColumns: [
        {
          type: "selection",
        },
        {
          prop: "gr",
          label: "G.R No",
          minWidth: 100,
          sortable: true,
        },
      ],
      tableData: [],
      selectedRows: [],
      modals: {
        showModal: false,
      },

      sign: "far fa-edit",
      optionName: "Save",
      saving: false,
      bg: {
        value: { id: null, name: null },
        data: [],
      },
      pob: {
        value: { id: null, name: null },
        data: [],
      },
      mt: {
        value: { id: null, name: null },
        data: [],
      },
      nt: {
        value: { id: null, name: null },
        data: [],
      },
      religion: {
        value: { id: null, name: null },
        data: [],
      },
      area: {
        value: { id: null, name: null },
        data: [],
      },
      cmbLastClass: {
        value: { id: null, name: null },
        data: [],
      },
      cmbBatch: {
        value: { id: null, name: null },
        data: [],
      },
      cmbClassAdmitted: {
        value: { id: null, name: null },
        data: [],
      },
      cmbSecAdmitted: {
        value: { id: null, name: null },
        data: [],
      },
      cmbFacultyAdmitted: {
        value: { id: null, name: null },
        data: [],
      },
      cmbCurrentClass: {
        value: { id: null, name: null },
        data: [],
      },
      cmbCurrentSec: {
        value: { id: null, name: null },
        data: [],
      },
      cmbFacultyCurrent: {
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
      cmbAdmissionBased: {
        value: { id: null, name: null },
        data: [],
      },
      cmbFeeStatus: {
        value: { id: null, name: null },
        data: [],
      },
      cmbCC: {
        value: { id: null, name: null },
        data: [],
      },
      cmbTransporter: {
        value: { id: null, name: null },
        data: [],
      },
      cmbSubject: {
        value: null,
        data: [],
      },
      cmbPayMode: {
        value: { id: 1, name: "Monthly" },
        data: [
          { id: 1, name: "Monthly" },
          { id: 2, name: "Bi-monthly" },
          { id: 3, name: "Quaterly" },
          { id: 4, name: "Bi-Annually" },
          { id: 5, name: "Annually" },
        ],
      },
      myObj: {
        id: 0,
        FCode: 0,
        GRNo: "",
        Studentname: "",
        Gender: "Male",
        ShortName: "",
        FatherName: "",
        dobInWords: "",
        DOB: null,
        BloodGrp: "",
        PlaceofBirth: "",
        Religion: "",
        mTongue: "",
        Nationality: "",
        HomeAddress: "",
        permanentAddress: "",
        Area: "",
        StudentNo: "",
        lastInstitute: "",
        lastClass: "",
        mediumInstruction: "",
        session: "",
        lastResult: "",
        physicalHandicap: "",
        NIC: "",
        FatherEducation: "",
        FOccupation: "",
        MonthlyIncome: "",
        OfcNumber: "",
        Mob: "",
        OfcAddress: "",
        Fax: "",
        Email: "",
        f_Employer: "",
        dateOfReg: null,
        dateofAdd: null,
        BForm: "",
        batch: "",
        ClassAdmitted: "",
        Sec: "",
        facultyAdmitted: "",
        CurrentClass: "",
        CurrentSection: "",
        facultyCurrent: "",
        RollNum: "",
        Enrolment: "",
        AddbasedOn: "",
        payMode: "",
        TuitorMob: "",
        reAdmissionDate: null,
        feeSessionID: "",
        FeeStatus: "",
        concessionCategory: "",
        monthlyFee: "",
        customDueDate: "",
        driverID: "",
        emergency_name: "",
        emergencyNum: "",
        relation: "",
        M_Name: "",
        M_Occupation: "",
        PhoneNum: "",
        HomeMobile: "",
        M_CNIC: "",
        M_Qualification: "",
        m_employer: "",
        motherEmail: "",
        g_name: "",
        g_occupation: "",
        g_office_num: "",
        g_mob: "",
        g_cnic: "",
        g_email: "",
        g_employer: "",
        g_qualification: "",
        Pic: null,
        DiscountOn: null,
        vanCode: null,
        VanFee: null,
        LastInsDetails: null,
        Nazra: null,
        Islamiyat: null,
        Status: null,
        AddBy: null,
        EditBy: null,
        ModificationTime: null,
        LeavingDate: null,
        Cause: null,
        classAtTheTimeofRemoval: null,
        SecAtTheTimeofRemoval: null,
        batchLevel: null,
        joinDate: null,
        BiometricCardNumber: null,
        feeCategory: null,
        isSynced: null,
        vanIn: false,
        vanOut: false,
        timelyDiscount: 0,
        refpercentage: null,
        campusID: 1,
      },
      current_session: 0,
      statusDiscount: "Fee status",
      ccDiscount: "Concession category",
      isFeeDisabled: false,
      actualFee: "Fee session",
      fields: "",
      adLabel: "",
      lblCls: "",
      lblSec: "",
      lblFaculty: "",
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
      credData: [],
      credCols: [
        {
          id: 1,
          prop: "type",
          label: "User",
          minWidth: 180,
          sortable: false,
        },
        {
          id: 2,
          prop: "username",
          label: "Username",
          minWidth: 180,
          sortable: false,
        },
        {
          id: 3,
          prop: "pw",
          label: "Password",
          minWidth: 180,
          sortable: false,
        },
      ],
    };
  },

  methods: {
    loadFee() {
      //console.log.log('Load fee')
      if (
        this.cmbCurrentClass.value === null ||
        this.cmbCurrentClass.value.id === null
      )
        return;

      if (
        this.cmbFeeSession.value === null ||
        this.cmbFeeSession.value.id === null
      )
        return;

      if (
        this.cmbFeeStatus.value === null ||
        this.cmbFeeStatus.value.id === null
      )
        return;

      if (this.cmbCC.value === null || this.cmbCC.value.id === null) return;

      var url =
        this.$store.state.domain +
        "/Fee/CalculateFee?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&clsID=" +
        this.cmbCurrentClass.value.id +
        "&sessionID=" +
        this.cmbFeeSession.value.id +
        "&feeStatus=" +
        this.cmbFeeStatus.value.id +
        "&cc=" +
        this.cmbCC.value.id;
      axios
        .get(url)
        .then((response) => {
          ////console.log.log('calculated fee', response.data);

          if (response.data.status === "success") {
            this.actualFee = "Fee session (Rs." + response.data.actualFee + ")";
            this.myObj.monthlyFee = response.data.netFee;
            this.statusDiscount =
              "Fee status (Rs." + response.data.feeStatus + ")";

            if (response.data.ccDiscount > 0)
              this.ccDiscount =
                "Concession category (Rs." +
                response.data.ccDiscount +
                " off.)";
            else this.ccDiscount = "Concession category";

            if (this.cmbFeeStatus.value.id === 0) {
              this.statusDiscount =
                "Fee status (Rs." + this.myObj.monthlyFee + ")";
            }
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting load fee: ', error);
        });
    },

    loadSecCurrent(option, id) {
      this.cmbCurrentClass.value = { id: option.id, name: option.name };
      //console.log.log('updatting Class', this.cmbCurrentClass.value);

      this.cmbCurrentSec.data = [];
      this.cmbCurrentSec.value = { id: null, name: null };
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
            //console.log.log('Error on getting sec a: ', response.data);
          } else {
            var i = 0;

            response.data.data.forEach((element) => {
              ////console.log.log(element);
              this.cmbCurrentSec.data.push({
                id: element.id,
                name: element.sec,
              });

              if (i === 0 && this.$store.state.sID === 0) {
                this.cmbCurrentSec.value = {
                  id: element.id,
                  name: element.sec,
                };
              } else if (element.sec === this.myObj.CurrentSection) {
                this.cmbCurrentSec.value = {
                  id: element.id,
                  name: element.sec,
                };
              }

              i++;
            });

            this.loadFee();
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting fee calc: ', error);
        });
    },

    fillDropdowns() {
      var url =
        this.$store.state.domain +
        "/Subjects/Filldropdown?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Subjects: ', response.data);
          } else {
            var i = 0;
            response.data.data.forEach((element) => {
              this.cmbSubject.data.push({ id: element.id, name: element.name });

              if (i === 0) {
                this.cmbSubject.value = { id: element.id, name: element.name };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Faculty: ', error);
        });
      //cmbBloodGroup
      var url =
        this.$store.state.domain +
        "/BloodGroup?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting blood group: ', response.data);
          } else {
            var i = 0;
            response.data.data.forEach((element) => {
              this.bg.data.push({ id: element.id, name: element.BloodGroup });

              if (i === 0 && this.$store.state.sID === 0)
                this.bg.value = { id: element.id, name: element.BloodGroup };

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting bg: ', error);
        });

      //PlaceofBirth
      var url =
        this.$store.state.domain +
        "/PlaceofBirth?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting PlaceofBirth: ', response.data);
          } else {
            var i = 0;
            response.data.data.forEach((element) => {
              this.pob.data.push({
                id: element.id,
                name: element.PlaceOfBirth,
              });

              if (i === 0 && this.$store.state.sID === 0) {
                //console.log.log('setting pob');
                this.pob.value = { id: element.id, name: element.PlaceOfBirth };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting pob: ', error);
        });

      //Religion
      var url =
        this.$store.state.domain +
        "/Religion?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Religion: ', response.data);
          } else {
            var i = 0;

            response.data.data.forEach((element) => {
              ////console.log.log(element);
              this.religion.data.push({
                id: element.id,
                name: element.Religion,
              });

              if (i === 0 && this.$store.state.sID === 0)
                this.religion.value = {
                  id: element.id,
                  name: element.Religion,
                };

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Religion: ', error);
        });

      //Nationality
      var url =
        this.$store.state.domain +
        "/Nationality?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Nationality: ', response.data);
          } else {
            var i = 0;

            response.data.data.forEach((element) => {
              ////console.log.log(element);
              this.nt.data.push({ id: element.id, name: element.Nationality });

              if (i === 0 && this.$store.state.sID === 0)
                this.nt.value = { id: element.id, name: element.Nationality };

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Nationality: ', error);
        });

      //MT
      var url =
        this.$store.state.domain +
        "/MotherTongue?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting MotherTongue: ', response.data);
          } else {
            var i = 0;

            response.data.data.forEach((element) => {
              ////console.log.log(element);
              this.mt.data.push({ id: element.id, name: element.MotherTongue });

              if (i === 0 && this.$store.state.sID === 0)
                this.mt.value = { id: element.id, name: element.MotherTongue };

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting MotherTongue: ', error);
        });

      //Area
      var url =
        this.$store.state.domain +
        "/Area?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Area: ', response.data);
          } else {
            var i = 0;

            response.data.data.forEach((element) => {
              ////console.log.log(element);
              this.area.data.push({
                id: element.id,
                name: element.StudentArea,
              });

              if (i === 0 && this.$store.state.sID === 0) {
                this.area.value = { id: element.id, name: element.StudentArea };
                //console.log.log('Area set to: ', this.area.value)
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Area: ', error);
        });

      //Classes
      var url =
        this.$store.state.domain +
        "/ClassandSectionInfo?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Class: ', response.data);
          } else {
            var i = 0;
            response.data.data.forEach((element) => {
              //console.log.log(element.ClassShortName)
              this.cmbClassAdmitted.data.push({
                id: element.id,
                name: element.Class,
              });
              this.cmbCurrentClass.data.push({
                id: element.id,
                name: element.Class,
              });

              if (i === 0 && this.$store.state.sID === 0) {
                //this.cmbClassAdmitted.value = { id: element.id, name: element.Class };
                //this.cmbCurrentClass.value = { id: element.id, name: element.Class };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Class: ', error);
        });

      //Faculty
      var url =
        this.$store.state.domain +
        "/Faculty?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Faculty: ', response.data);
          } else {
            var i = 0;

            response.data.data.forEach((element) => {
              this.cmbFacultyAdmitted.data.push({
                id: element.id,
                name: element.faculty,
              });
              this.cmbFacultyCurrent.data.push({
                id: element.id,
                name: element.faculty,
              });

              if (i === 0 && this.$store.state.sID === 0) {
                this.cmbFacultyAdmitted.value = {
                  id: element.id,
                  name: element.faculty,
                };
                this.cmbFacultyCurrent.value = {
                  id: element.id,
                  name: element.faculty,
                };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Faculty: ', error);
        });

      //Current session
      var current_sess = 0;
      var url =
        this.$store.state.domain +
        "/Fill/GetSettings?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&type=current_session";
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "success") {
            this.current_session = response.data.data;
          }

          //Session
          var url =
            this.$store.state.domain +
            "/Fill/Sessions?cID=" +
            this.$store.state.cID +
            "&_db=" +
            this.$store.state.db;
          axios
            .get(url)
            .then((response) => {
              if (response.data.status === "error") {
                //console.log.log('Error on getting Session: ', response.data);
              } else {
                response.data.data.forEach((element) => {
                  this.cmbSession.data.push({
                    id: element.id,
                    name: element.session,
                  });
                  this.cmbFeeSession.data.push({
                    id: element.id,
                    name: element.session,
                  });

                  if (
                    element.id == this.current_session &&
                    this.$store.state.sID === 0
                  ) {
                    this.cmbSession.value = {
                      id: element.id,
                      name: element.session,
                    };
                    this.cmbFeeSession.value = {
                      id: element.id,
                      name: element.session,
                    };
                  }
                });
              }
            })
            .catch(function (error) {
              //console.log.log('Server Error on getting Session: ', error);
            });
        })
        .catch(function (error) {});

      //Batch
      var url =
        this.$store.state.domain +
        "/Fill/Batch?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Batch: ', response.data);
          } else {
            var i = 0;

            response.data.data.forEach((element) => {
              this.cmbBatch.data.push({ id: element.id, name: element.batch });

              if (i === 0 && this.$store.state.sID === 0) {
                //this.cmbBatch.value = { id: element.id, name: element.batch };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Batch: ', error);
        });

      //AddBasecOn
      var url =
        this.$store.state.domain +
        "/AdmissionBasedOn?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting AdmissionBasedOn: ', response.data);
          } else {
            var i = 0;

            response.data.data.forEach((element) => {
              this.cmbAdmissionBased.data.push({
                id: element.id,
                name: element.AdmissionBasedOn,
              });

              if (i === 0 && this.$store.state.sID === 0) {
                this.cmbAdmissionBased.value = {
                  id: element.id,
                  name: element.AdmissionBasedOn,
                };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting AdmissionBasedOn: ', error);
        });

      //Fee status
      var url =
        this.$store.state.domain +
        "/DiscountPercentage?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting FeeStatus: ', response.data);
          } else {
            var i = 0;

            response.data.data.forEach((element) => {
              this.cmbFeeStatus.data.push({
                id: element.id,
                name: element.name,
              });

              if (i === 0 && this.$store.state.sID === 0) {
                this.cmbFeeStatus.value = {
                  id: element.id,
                  name: element.name,
                };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting FeeStatus: ', error);
        });

      //Concession Category
      var url =
        this.$store.state.domain +
        "/ConcessionCategory?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting cc: ', response.data);
          } else {
            var i = 0;

            response.data.data.forEach((element) => {
              this.cmbCC.data.push({ id: element.id, name: element.category });

              if (i === 0 && this.$store.state.sID === 0) {
                this.cmbCC.value = { id: element.id, name: element.category };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting cc: ', error);
        });

      //Transporter
      var url =
        this.$store.state.domain +
        "/Drivers?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting tt: ', response.data);
          } else {
            var i = 0;

            response.data.data.forEach((element) => {
              this.cmbTransporter.data.push({
                id: element.id,
                name: element.driverName,
              });

              if (i === 0 && this.$store.state.sID === 0) {
                this.cmbTransporter.value = {
                  id: element.id,
                  name: element.driverName,
                };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting tt: ', error);
        });
    },
    populateData() {
      var url =
        this.$store.state.domain +
        "/Registration/Find?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&sID=" +
        this.$store.state.sID;
      axios
        .get(url)
        .then((response) => {
          ////console.log.log('Resp', response.data);

          if (response.data.status === "success") {
            this.myObj = response.data.data;

            this.bg.value = response.data.bg;
            this.pob.value = response.data.pob;
            this.mt.value = response.data.mt;
            this.nt.value = response.data.nt;
            this.religion.value = response.data.religion;
            this.area.value = response.data.area;
            this.cmbSession.value = response.data.cmbSession;
            this.cmbBatch.value = response.data.cmbBatch;
            this.cmbClassAdmitted.value = response.data.cmbClassAdmitted;
            this.loadSecA(this.cmbClassAdmitted.value, "cmbcmbClassAdmitted");
            this.cmbCurrentClass.value = response.data.cmbCurrentClass;
            this.loadSecCurrent(this.cmbCurrentClass.value, "cmbCurrentClass");
            this.cmbFacultyAdmitted.value = response.data.cmbFacultyAdmitted;
            this.cmbFacultyCurrent.value = response.data.cmbFacultyCurrent;
            this.cmbAdmissionBased.value = response.data.cmbAdmissionBased;
            this.cmbFeeSession.value = response.data.cmbFeeSession;
            this.cmbFeeStatus.value = response.data.cmbFeeStatus;
            this.cmbCC.value = response.data.cmbCC;
            this.cmbTransporter.value = response.data.cmbTransporter;

            if (this.myObj.feeStatus === 0) this.isFeeDisabled = false;
            else this.isFeeDisabled = true;

            this.loadFee();

            //Dates formatting
            if (this.myObj.DOB !== null)
              this.myObj.DOB = moment(this.myObj.DOB).format("YYYY-MM-DD");
            if (this.myObj.dateofAdd !== null)
              this.myObj.dateofAdd = moment(this.myObj.dateofAdd).format(
                "YYYY-MM-DD"
              );
            if (this.myObj.dateOfReg !== null)
              this.myObj.dateOfReg = moment(this.myObj.dateOfReg).format(
                "YYYY-MM-DD"
              );
            if (this.myObj.reAdmissionDate !== null)
              this.myObj.reAdmissionDate = moment(
                this.myObj.reAdmissionDate
              ).format("YYYY-MM-DD");
            if (this.myObj.joinDate !== null)
              this.myObj.joinDate = moment(this.myObj.joinDate).format(
                "YYYY-MM-DD"
              );

            this.credData = [];
            response.data.credsData.forEach((element) => {
              this.credData.push({
                type: (element.type + "")
                  .replace("1", "Father")
                  .replace("2", "Mother")
                  .replace("3", "Student"),
                username: element.username,
                pw: element.pw,
              });
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on population: ', error);
        });
    },

    Save() {
      this.fields = "";
      if (this.myObj.FCode === null || this.myObj.FCode.length === 0) {
        this.fields += "Family code.<br />";
      }
      if (this.myObj.GRNo === null || this.myObj.GRNo.length === 0) {
        this.fields += "GR No.<br />";
      }
      if (
        this.myObj.Studentname === null ||
        this.myObj.Studentname.length === 0
      ) {
        this.fields += "Student name.<br />";
      }
      if (this.myObj.ShortName === null || this.myObj.ShortName.length === 0) {
        this.fields += "Student short name.<br />";
      }
      if (
        this.myObj.FatherName === null ||
        this.myObj.FatherName.length === 0
      ) {
        this.fields += "Father name.<br />";
      }
      if (this.myObj.DOB === null) {
        this.fields += "Date of birth.<br />";
      }
      if (this.bg.value === null) {
        this.fields += "Blood group.<br />";
      } else {
        this.myObj.BloodGrp = this.bg.value.id;
      }
      if (this.pob.value === null) {
        this.fields += "Place of birth.<br />";
      } else {
        this.myObj.PlaceofBirth = this.pob.value.id;
      }
      if (this.religion.value === null) {
        this.fields += "Religion.<br />";
      } else {
        this.myObj.Religion = this.religion.value.id;
      }
      if (this.mt.value === null) {
        this.fields += "Mother tongue.<br />";
      } else {
        this.myObj.mTongue = this.mt.value.id;
      }
      if (this.nt.value === null) {
        this.fields += "Nationality.<br />";
      } else {
        this.myObj.Nationality = this.nt.value.id;
      }
      if (this.area.value === null) {
        this.fields += "Locality.<br />";
      } else {
        this.myObj.Area = this.area.value.id;
      }
      if (this.cmbSession.value === null) {
        this.fields += "Session.<br />";
      } else {
        this.myObj.session = this.cmbSession.value.id;
      }
      if (this.myObj.dateOfReg === null) {
        this.fields += "Date of registration.<br />";
      }
      if (this.myObj.dateofAdd === null) {
        this.fields += "Date of admission.<br />";
      }
      if (this.cmbBatch.value === null || this.cmbBatch.value.id === null) {
        this.fields += "Batch.<br />";
      } else {
        this.myObj.batch = this.cmbBatch.value.id;
      }
      if (
        this.cmbClassAdmitted.value === null ||
        this.cmbClassAdmitted.value.id === null
      ) {
        this.fields += "Class at the time of " + this.adLabel + ".<br />";
      } else {
        this.myObj.ClassAdmitted = this.cmbClassAdmitted.value.id;
      }
      if (
        this.cmbSecAdmitted.value === null ||
        this.cmbSecAdmitted.value.id === null
      ) {
        this.fields += "Section at the time of " + this.adLabel + ".<br />";
      } else {
        this.myObj.Sec = this.cmbSecAdmitted.value.name;
      }
      if (
        this.cmbFacultyAdmitted.value === null ||
        this.cmbFacultyAdmitted.value.id === null
      ) {
        this.fields += "Faculty at the time of " + this.adLabel + ".<br />";
      } else {
        this.myObj.facultyAdmitted = this.cmbFacultyAdmitted.value.id;
      }
      if (
        this.cmbCurrentClass.value === null ||
        this.cmbCurrentClass.value.id === null
      ) {
        this.fields += "Current class.<br />";
      } else {
        this.myObj.CurrentClass = this.cmbCurrentClass.value.id;
      }
      if (
        this.cmbCurrentSec.value === null ||
        this.cmbCurrentSec.value.id === null
      ) {
        this.fields += "Current section.<br />";
      } else {
        this.myObj.CurrentSection = this.cmbCurrentSec.value.name;
      }
      if (
        this.cmbFacultyCurrent.value === null ||
        this.cmbFacultyCurrent.value.id === null
      ) {
        this.fields += "Current Faculty.<br />";
      } else {
        this.myObj.facultyCurrent = this.cmbFacultyCurrent.value.id;
      }
      if (
        this.cmbAdmissionBased.value === null ||
        this.cmbAdmissionBased.value.id === null
      ) {
        this.fields += "Admission reference.<br />";
      } else {
        this.myObj.AddbasedOn = this.cmbAdmissionBased.value.id;
      }
      if (
        this.cmbPayMode.value === null ||
        this.cmbPayMode.value.name === null
      ) {
        this.fields += "Pay mode.<br />";
      } else {
        this.myObj.payMode = this.cmbPayMode.value.name;
      }
      if (
        this.cmbFeeSession.value === null ||
        this.cmbFeeSession.value.id === null
      ) {
        this.fields += "Fee session.<br />";
      } else {
        this.myObj.feeSessionID = this.cmbFeeSession.value.id;
      }
      if (
        this.cmbFeeStatus.value === null ||
        this.cmbFeeStatus.value.id === null
      ) {
        this.fields += "Fee session.<br />";
      } else {
        this.myObj.FeeStatus = this.cmbFeeStatus.value.id;
      }
      if (this.cmbCC.value === null || this.cmbCC.value.id === null) {
        this.fields += "Concession Category.<br />";
      } else {
        this.myObj.concessionCategory = this.cmbCC.value.id;
      }
      if (
        this.myObj.customDueDate === null ||
        this.myObj.customDueDate.length === 0
      ) {
        this.fields += "Fee due date.<br />";
      }
      if (
        this.myObj.monthlyFee === null ||
        this.myObj.monthlyFee.length === 0
      ) {
        this.fields += "Fee amount.<br />";
      }
      if (
        this.cmbTransporter.value === null ||
        this.cmbTransporter.value.id === null
      ) {
        this.fields += "Transporter.<br />";
      } else {
        this.myObj.driverID = this.cmbTransporter.value.id;
      }

      if (this.fields.length > 0)
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Please define following field:<br />" + this.fields,
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
      else {
        if (this.myObj.monthlyFee < 0) {
          this.$notify({
            verticalAlign: "top",
            horizontalAlign: "right",
            message: "Error:<br />Fee amount cannot be less than 0.",
            type: "danger",
            icon: "fa fa-ban",
            timeout: 0,
          });
          return;
        }
        if (this.myObj.timelyDiscount < 0) {
          this.$notify({
            verticalAlign: "top",
            horizontalAlign: "right",
            message: "Error:<br />Timely discount cannot be less than 0.",
            type: "danger",
            icon: "fa fa-ban",
            timeout: 0,
          });
          return;
        }
        if (this.myObj.customDueDate < 1 || this.myObj.customDueDate > 31) {
          this.$notify({
            verticalAlign: "top",
            horizontalAlign: "right",
            message: "Error:<br />Invalid fee due date.",
            type: "danger",
            icon: "fa fa-ban",
            timeout: 0,
          });
          return;
        } else {
          //Validation done
          this.sign = "fas fa-circle-notch fa-spin";
          this.saving = true;
          this.optionName = "Saving";

          if (this.$store.state.sID === 0) {
            //Add
            var msgText = "added.";
            var msgText2 = "add";
            this.myObj.AddBy = this.$store.state.uID;
            this.myObj.Status = "Present";
            if (this.$store.state.register) {
              this.myObj.Status = "Register";
              msgText = "registered.";
              msgText2 = "register";
            }

            var url =
              this.$store.state.domain +
              "/Registration/Create?_db=" +
              this.$store.state.db +
              "&cID=" +
              this.$store.state.cID +
              "&clientID=" +
              this.$store.state.clientID;

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
                    verticalAlign: "top",
                    horizontalAlign: "right",
                    message: "Request Error! <br />" + response.data.data,
                    type: "danger",
                    icon: "fa fa-ban",
                    timeout: 0,
                  });
                } else {
                  swal({
                    title:
                      'New student "' + this.myObj.Studentname + " " + msgText,
                    text: "Do you want to " + msgText2 + " another student?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn btn-success btn-fill",
                    cancelButtonClass: "btn btn-danger btn-fill",
                    confirmButtonText: "Yes, Please!",
                    buttonsStyling: false,
                  }).then((result) => {
                    if (result.value) {
                      this.$router.go(this.$router.currentRoute);
                    }
                  });
                }
              })
              .finally(() => {
                this.sign = "fas fa-user-plus";
                this.saving = false;

                if (this.$store.state.register) {
                  this.optionName = "Register student";
                } else {
                  this.optionName = "Add student";
                }
              });
          } else {
            //Edit
            this.myObj.EditBy = this.$store.state.uID;
            var url =
              this.$store.state.domain +
              "/Registration/Edit?_db=" +
              this.$store.state.db +
              "&cID=" +
              this.$store.state.cID +
              "&clientID=" +
              this.$store.state.clientID;
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
                    verticalAlign: "top",
                    horizontalAlign: "right",
                    message:
                      'Saved! <br />Student "' +
                      this.myObj.Studentname +
                      '" saved.',
                    type: "success",
                    icon: "fa fa-check",
                    timeout: this.$store.state.timeout,
                  });

                  this.credData = [];
                  response.data.data.forEach((element) => {
                    this.credData.push({
                      type: (element.type + "")
                        .replace("1", "Father")
                        .replace("2", "Mother")
                        .replace("3", "Student"),
                      username: element.username,
                      pw: element.pw,
                    });
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
      }
    },

    GetError() {
      return this.nameError;
      return this.prefixError;
    },
    AddModal() {
      this.saving = false;
      this.myObj.id = 0;
      this.myObj.department = "";
      this.myObj.prefix = "";
      this.shouldAdd = true;
      this.optionName = "Add";
      this.modals.showModal = true;
      this.sign = "fas fa-user-plus";
    },
    editRecord(index, row) {
      this.eIndex = index;
      this.saving = false;
      this.myObj.id = row.id;
      this.myObj.department = row.department;
      this.myObj.prefix = row.prefix;
      this.myObj.addBy = row.addBy;

      this.shouldAdd = false;
      this.optionName = "Edit";
      this.modals.showModal = true;
      this.sign = "far fa-edit";

      //console.log.log('Row: ', row);
    },
    handleDelete(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to delete department " + row.department + "?",
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
            "/StudentDepartments/Delete?id=" +
            row.id +
            "&_db=" +
            this.$store.state.db;
          //console.log.log('Remove: ' + url);
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
                  message:
                    'Saved! <br />Department "' + row.department + '" removed.',
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
