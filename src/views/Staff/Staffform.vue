<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Staff Information</h6>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-lg-6">
          <div class="card-wrapper">
            <!-- Input groups -->
            <card>
              <!-- Card header -->
              <h3 slot="header" class="mb-0">Personal Information</h3>
              <!-- Card body -->
              <form>
                <!-- Input groups with icon -->
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      placeholder="Enter Name"
                      label="Name :"
                      v-model="myObj.name"
                    ></base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      placeholder="Enter Short Name"
                      label="Short Name :"
                      v-model="myObj.shortName"
                    ></base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input label="Gender">
                      <el-select
                        v-model="myObj.Gender"
                        filterable
                        placeholder="Gender"
                      >
                        <el-option label="Male" value="Male"> </el-option>
                        <el-option label="Female" value="Female"> </el-option>
                      </el-select>
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input label="Maritial Status :">
                      <el-select
                        v-model="myObj.maritalStatus"
                        filterable
                        placeholder="Maritial"
                      >
                        <el-option label="Single" value="Single"> </el-option>
                        <el-option label="Married" value="Married"> </el-option>
                      </el-select>
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      placeholder="Enter father / husband of"
                      label="Father / Husband of :"
                      v-model="myObj.FatherName"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      placeholder="Enter Phone No "
                      label="Phone No :"
                      type="number"
                      v-model="myObj.Phone"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      placeholder="Enter Mobile No "
                      label="Mobile No :"
                      type="number"
                      v-model="myObj.Mob"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      label="Email :"
                      type="email"
                      v-model="myObj.Email"
                    >
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input label="Date of Birth">
                      <flat-picker
                        slot-scope="{ focus, blur }"
                        @on-open="focus"
                        @on-close="blur"
                        :config="{ allowInput: true }"
                        class="form-control datepicker"
                        v-model="myObj.DOB"
                      >
                      </flat-picker>
                    </base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <base-input label="Blood group">
                      <multiselect
                        placeholder="Select blood group"
                        v-model="bg.value"
                        :options="bg.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbBloodGroup"
                      >
                      </multiselect>
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input label="Health">
                      <el-select
                        v-model="myObj.Health"
                        filterable
                        placeholder="Health"
                      >
                        <el-option label="Excellent" value="Excellent">
                        </el-option>
                        <el-option label="Good" value="Good"> </el-option>
                        <el-option label="Average" value="Average"> </el-option>
                        <el-option label="Poor" value="Poor"> </el-option>
                      </el-select>
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      label="NIC No :"
                      type="number"
                      v-model="myObj.NIC"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input label="Religion">
                      <multiselect
                        placeholder="Select religion"
                        v-model="rel.value"
                        :options="rel.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbReligion"
                      >
                      </multiselect>
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <base-input label="Address">
                      <textarea
                        v-model="myObj.Address"
                        class="form-control"
                        id="exampleFormControlTextarea3"
                        rows="2"
                      ></textarea>
                    </base-input>
                  </div>
                </div>
              </form>
            </card>
            <!-- Dropdowns -->

            <card>
              <!-- Card header -->
              <h3 slot="header" class="mb-0">Qualification & Experience</h3>
              <!-- Card body -->
              <form>
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      placeholder="Enter Qualification"
                      label="Qualification :"
                      v-model="myObj.Qualification"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <base-input label="Professional Educational Details :">
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea3"
                        rows="3"
                        v-model="myObj.ProEduDetails"
                      ></textarea>
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <base-input label="Professional Experience Details :">
                      <textarea
                        v-model="myObj.ProXpDetails"
                        class="form-control"
                        id="exampleFormControlTextarea3"
                        rows="3"
                      ></textarea>
                    </base-input>
                  </div>
                </div>
              </form>
            </card>

            <card>
              <!--Card Header-->
              <h3 slot="header" class="mb-0">Emergency</h3>
              <form>
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      v-model="myObj.emergencyName"
                      placeholder="Enter Name"
                      label="Name :"
                    >
                    </base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.emergencyCell"
                      placeholder="Enter Cell No"
                      label="Cell No :"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.emergencyRelation"
                      placeholder="Enter Relation"
                      label="Relation :"
                    >
                    </base-input>
                  </div>
                </div>
              </form>
            </card>

            <card hidden>
              <!--Card Header-->
              <h3 slot="header" class="mb-0">Schedule</h3>
              <!--Card Body-->
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <base-button
                      block
                      type="primary"
                      class="mb-3"
                      @click="modals.modal3 = true"
                    >
                      Add Timing
                    </base-button>

                    <modal
                      :show.sync="modals.modal3"
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
                            <base-input label="Day">
                              <el-select
                                v-model="myObj.day"
                                filterable
                                placeholder="Enter Day"
                              >
                                <el-option label="Monday" value="Monday">
                                </el-option>
                                <el-option label="Tuesday" value="Tuesday">
                                </el-option>
                                <el-option label="Wednesday" value="Wednesday">
                                </el-option>
                                <el-option label="Thursday" value="Thursday">
                                </el-option>
                                <el-option label="Friday" value="Friday">
                                </el-option>
                                <el-option label="Saturday" value="Saturday">
                                </el-option>
                                <el-option label="Sunday" value="Sunday">
                                </el-option>
                              </el-select>
                            </base-input>

                            <base-input label="Daily Join at :">
                              <flat-picker
                                slot-scope="{ focus, blur }"
                                @on-open="focus"
                                @on-close="blur"
                                :config="{ allowInput: true }"
                                class="form-control datepicker"
                                v-model="dates.simple"
                              >
                              </flat-picker>
                            </base-input>

                            <base-input label="Daily Join at :">
                              <flat-picker
                                slot-scope="{ focus, blur }"
                                @on-open="focus"
                                @on-close="blur"
                                :config="{ allowInput: true }"
                                class="form-control datepicker"
                                v-model="dates.simple"
                              >
                              </flat-picker>
                            </base-input>

                            <div>
                              <base-button type="primary" class="col"
                                ><i v-bind:class="sign"></i> Add</base-button
                              >
                            </div>
                          </form>
                        </template>
                      </card>
                    </modal>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <el-table
                      :data="queriedData"
                      row-key="id"
                      header-row-class-name="thead-light"
                      @sort-change="sortChange"
                      @selection-change="selectionChange"
                    >
                      <el-table-column label="Days"> </el-table-column>

                      <el-table-column label="Daily Join's"> </el-table-column>

                      <el-table-column
                        min-width="180px"
                        align="right"
                        label="Daliy Leave"
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
                </div>
              </form>
            </card>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card-wrapper">
            <card>
              <!--Card Header-->
              <h3 slot="header" class="mb-0">Appointment Information</h3>
              <!--Card Body-->
              <form>
                <!-- Input groups with icon -->

                <div class="row">
                  <div class="col-md-6">
                    <base-input label="Appointed On :">
                      <flat-picker
                        slot-scope="{ focus, blur }"
                        @on-open="focus"
                        @on-close="blur"
                        :config="{ allowInput: true }"
                        class="form-control datepicker"
                        v-model="myObj.AppointedOn"
                      >
                      </flat-picker>
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input label="Will Teach?">
                      <multiselect
                        placeholder="Will Teach?"
                        v-model="cmbTeach.value"
                        :options="cmbTeach.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbTeach"
                      >
                      </multiselect>
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input label="Joining Date :">
                      <flat-picker
                        slot-scope="{ focus, blur }"
                        @on-open="focus"
                        @on-close="blur"
                        :config="{ allowInput: true }"
                        class="form-control datepicker"
                        v-model="myObj.joiningDate"
                      >
                      </flat-picker>
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input label="Probation Period:">
                      <flat-picker
                        slot-scope="{ focus, blur }"
                        @on-open="focus"
                        @on-close="blur"
                        :config="{ allowInput: true, mode: 'range' }"
                        class="form-control datepicker"
                        v-model="myObj.probationPeriod"
                      >
                      </flat-picker>
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input label="Department">
                      <multiselect
                        placeholder="Select Department"
                        v-model="dep.value"
                        :options="dep.data"
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

                  <div class="col-md-6">
                    <base-input label="Designation" v-model="myObj.Designation">
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <base-input label="Good at" v-model="myObj.GoodAT">
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input label="Status">
                      <multiselect
                        placeholder="Select Status"
                        v-model="tStatus.value"
                        :options="tStatus.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbTeacherStatus"
                      >
                      </multiselect>
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input label="Leave Date :">
                      <flat-picker
                        slot-scope="{ focus, blur }"
                        @on-open="focus"
                        @on-close="blur"
                        :config="{ allowInput: true }"
                        class="form-control datepicker"
                        v-model="myObj.LeaveDate"
                      >
                      </flat-picker>
                    </base-input>
                  </div>
                </div>
              </form>
            </card>

            <card>
              <!--Card Header-->
              <h3 slot="header" class="mb-0">Salary Information</h3>
              <!--Card Body-->

              <form>
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.appointmentSalary"
                      placeholder="Enter Appointment Salary"
                      label="Appointment Salary"
                      type="number"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.basicSalary"
                      placeholder="Enter Basic Salary"
                      label="Basic Salary"
                      type="number"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <el-tooltip
                      content="Transport, Medical Etc :"
                      placement="top"
                    >
                      <base-input
                        v-model="myObj.Allowances"
                        placeholder="Enter Total Allowance"
                        label="Total Allowance :"
                        type="number"
                      >
                      </base-input>
                    </el-tooltip>
                  </div>

                  <div class="col-md-6">
                    <el-tooltip content="House Rent Allowance:" placement="top">
                      <base-input
                        v-model="myObj.houseRent"
                        placeholder="Enter House Rent Allowance"
                        label="House Rent Allowance :"
                        type="number"
                      >
                      </base-input>
                    </el-tooltip>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.Bonus"
                      placeholder="Enter Special Bonus"
                      label="Special Bonus :"
                      type="number"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.attendanceAllowance"
                      placeholder="Enter Attd Allowance"
                      label="Attd Allowance :"
                      type="number"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      v-model="myObj.bankAcnt"
                      placeholder="Enter Account Number"
                      label="Account Number :"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      v-model="myObj.bankTitle"
                      placeholder="Enter Account Title"
                      label="Account Title :"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.sickLeavesAllowed"
                      placeholder="Enter Sick Leave Allowed"
                      label="Sick Leave Allowed :"
                      type="number"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.leavesAllowed"
                      placeholder="Enter Leave Allowed"
                      label="Leave Allowed :"
                      type="number"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.targetDeposit"
                      placeholder="Enter Total Deposit"
                      label="Total Deposit :"
                      type="number"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.monthlyDeposit"
                      placeholder="Enter Monthly Deposit"
                      label="Monthly Deposit :"
                      type="number"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <base-input label="Pay Mode :">
                      <el-select
                        v-model="myObj.payMode"
                        filterable
                        placeholder="Enter Pay Mode"
                      >
                        <el-option
                          v-for="option in selectOptions"
                          :key="option.label"
                          :label="option.label"
                          :value="option.value"
                        >
                        </el-option>
                      </el-select>
                    </base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.eobiDeduction"
                      placeholder="Enter Eobi Deduction"
                      label="Eobi Deduction :"
                      type="number"
                    >
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.pfDeduction"
                      placeholder="Enter Staff Welfare Fund"
                      label="Staff Welfare Fund :"
                      type="number"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input label="Leave Deduction">
                      <el-select
                        v-model="myObj.leaveDeduction"
                        filterable
                        placeholder="Leave Deduction"
                      >
                        <el-option label="Monthly" value="Monthly"> </el-option>
                        <el-option label="Yearly" value="Yearly"> </el-option>
                      </el-select>
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-6">
                        <base-input label="Attd Allowance During Probation">
                          <base-switch
                            v-model="myObj.allowanceDuringProbation"
                            style="margin-top: 0px"
                          ></base-switch>
                        </base-input>
                      </div>

                      <div class="col-md-6">
                        <base-input label="Leave allowed during probation">
                          <base-switch
                            v-model="myObj.leavesDuringProbation"
                            style="margin-top: 0px"
                          ></base-switch>
                        </base-input>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </card>

            <card>
              <!--Card Header-->
              <h3 slot="header" class="mb-0">Fusion App Credentials</h3>
              <!--Card Body-->
              <form>
                <div class="row">
                  <div class="col-md-12">
                    <el-table
                      :data="credData"
                      row-key="1"
                      header-row-class-name="thead-light"
                    >
                      <el-table-column
                        v-for="column in credCols"
                        :key="column.id"
                        v-bind="column"
                      >
                      </el-table-column>
                    </el-table>
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
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import HtmlEditor from "@/components/Inputs/HtmlEditor";
import TagsInput from "@/components/Inputs/TagsInput";
import DropzoneFileUpload from "@/components/Inputs/DropzoneFileUpload";
import BaseSlider from "@/components/BaseSlider";
import Multiselect from "vue-multiselect";
import qs from "qs";
import axios from "axios";
import { teal } from "color-name";
import { Table, TableColumn, Select, Option } from "element-ui";

import swal from "sweetalert2";
import Vue from "vue";
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import moment from "moment";

export default {
  name: "form-components",
  components: {
    HtmlEditor,
    Multiselect,
    TagsInput,
    DropzoneFileUpload,
    BaseSlider,
    flatPicker,
    [Select.name]: Select,
    [Option.name]: Option,
    RouteBreadCrumb,

    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  created() {
    if (this.$store.state.tID === 0) {
      this.sign = "fas fa-user-plus";
      this.optionName = "Add staff";
    } else {
      this.optionName = "Edit record";
      this.sign = "far fa-edit";
    }

    this.fillCmb();
    this.populateData();
  },
  data() {
    return {
      modals: {
        modal0: false,
        modal1: false,
        modal2: false,
        modal3: false,
      },

      tableColumns: {
        value: { id: 1, name: "Monday" },

        days: [
          { id: 1, name: "Monday" },
          { id: 2, name: "Tuesday" },
          { id: 2, name: "Wednesday" },
          { id: 4, name: "Thursday" },
          { id: 5, name: "Friday" },
          { id: 6, name: "Saturday" },
          { id: 7, name: "Sunday" },
        ],
        label: "Days",
        minWidth: 885,
        sortable: true,
      },
      credData: [],
      credCols: [
        {
          id: 2,
          prop: "username",
          label: "Username",
          minWidth: 200,
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
      saving: false,
      optionName: "Save Staff Information",
      dep: {
        value: { id: null, name: null },
        data: [],
      },
      bg: {
        value: { id: null, name: null },
        data: [],
      },

      rel: {
        value: { id: null, name: null },
        data: [],
      },
      tStatus: {
        value: { id: null, name: null },
        data: [],
      },
      cmbTeach: {
        value: { id: 1, name: "Yes" },
        data: [
          { id: 1, name: "Yes" },
          { id: 2, name: "No" },
        ],
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
        name: "",
        shortName: "",
        Gender: "",
        maritalStatus: "",
        FatherName: "",
        Phone: "",
        Mob: "",
        Email: "",
        DOB: null,
        NIC: "",
        BloodGrp: null,
        Health: "",
        EyeSight: "",
        Address: "",
        Pic: "",
        Qualification: "",
        ProEduDetails: "",
        ProXpDetails: "",
        AppointedOn: null,
        Teach: null,
        Department: null,
        Designation: "",
        GoodAT: "",
        Status: null,
        LeaveDate: null,
        basicSalary: "",
        Allowances: "",
        Bonus: "",
        bankAcnt: "",
        JoinsAt: "",
        leaveAt: "",
        FridayLeavesAt: "",
        AddBy: "",
        EditBy: "",
        ModificationTime: null,
        bankTitle: "",
        rfidNo: "",
        targetDeposit: "",
        remainingDeposit: "",
        monthlyDeposit: "",
        isSynced: null,
        payMode: "",
        eobiDeduction: "",
        pfDeduction: "",
        religion: null,
        appointmentSalary: "",
        emergencyName: "",
        emergencyCell: "",
        emergencyRelation: "",
        joiningDate: null,
        probationPeriod: "",
        houseRent: "",
        attendanceAllowance: "",
        leavesAllowed: "",
        sickLeavesAllowed: "",
        leavesDuringProbation: null,
        allowanceDuringProbation: null,
        leaveDeduction: "",
        campusID: 1,
      },
      current_session: 0,
      statusDiscount: "Fee status",
      ccDiscount: "Concession category",
      isFeeDisabled: false,

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
    fillCmb() {
      //cmbstaff Department

      var url =
        this.$store.state.domain +
        "/StaffDepartments?cID=" +
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
            //this.$notify({verticalAlign: 'bottom', horizontalAlign: 'center', message: 'Request Error! <br />' + response.data.status.data, type: 'danger', icon: 'fa fa-ban',timeout: $store.state.timeout });
          } else {
            var i = 0;
            response.data.data.forEach((element) => {
              this.dep.data.push({ id: element.id, name: element.department });

              if (i === 0 || this.$store.state.sID === 0)
                this.dep.value = { id: element.id, name: element.department };

              i++;
            });
          }
        })
        .catch(function (error) {
          // handle error
          //this.$notify({verticalAlign: 'bottom', horizontalAlign: 'center', message: 'Request Error! <br />', type: 'danger', icon: 'fa fa-ban', timeout: $store.state.timeout });
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

              if (i === 0 || this.$store.state.sID === 0)
                this.bg.value = { id: element.id, name: element.BloodGroup };

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting bg: ', error);
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
              this.rel.data.push({ id: element.id, name: element.Religion });

              if (i === 0 || this.$store.state.sID === 0)
                this.rel.value = { id: element.id, name: element.Religion };

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Religion: ', error);
        });

      //TeacherStatus
      var url =
        this.$store.state.domain +
        "/TeacherStatus?cID=" +
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
              this.tStatus.data.push({ id: element.id, name: element.status });

              if (i === 0 || this.$store.state.sID === 0) {
                this.tStatus.value = { id: element.id, name: element.status };
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
        "/Staff/Find?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&tID=" +
        this.$store.state.tID;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "success") {
            this.myObj = response.data.data;

            this.bg.value = response.data.bg;
            this.rel.value = response.data.rel;
            this.dep.value = response.data.dep;
            this.tStatus.value = response.data.tStatus;
            if (this.myObj.Teach === true) {
              this.cmbTeach.value = { id: 1, name: "Yes" };
            } else {
              this.cmbTeach.value = { id: 2, name: "No" };
            }

            this.credData = [];
            response.data.credsData.forEach((element) => {
              this.credData.push({
                type: (element.type + "").replace("4", "Employee"),
                username: element.username,
                pw: element.pw,
              });
            });

            //Dates formatting
            if (this.myObj.DOB !== null)
              this.myObj.DOB = moment(this.myObj.DOB).format("YYYY-MM-DD");
            if (this.myObj.AppointedOn !== null)
              this.myObj.AppointedOn = moment(this.myObj.AppointedOn).format(
                "YYYY-MM-DD"
              );
            if (this.myObj.joiningDate !== null)
              this.myObj.joiningDate = moment(this.myObj.joiningDate).format(
                "YYYY-MM-DD"
              );
            if (this.myObj.LeaveDate !== null)
              this.myObj.LeaveDate = moment(this.myObj.LeaveDate).format(
                "YYYY-MM-DD"
              );
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on population: ', error);
        });
    },
    Save() {
      this.fields = "";

      if (this.myObj.name === null || this.myObj.name.length === 0) {
        this.fields += "Name.<br />";
      }
      if (this.myObj.shortName === null || this.myObj.shortName.length === 0) {
        this.fields += "Short name.<br />";
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

      if (this.rel.value === null) {
        this.fields += "Religion.<br />";
      } else {
        this.myObj.religion = this.rel.value.id;
      }
      if (this.cmbTeach.value.id === 1) {
        this.myObj.Teach = true;
      } else {
        this.myObj.Teach = false;
      }

      if (this.myObj.AppointedOn === null) {
        this.fields += "Appointed Date.<br />";
      }
      if (this.myObj.joiningDate === null) {
        this.fields += "Joining Date.<br />";
      }
      if (this.dep.value === null || this.dep.value.id === null) {
        this.fields += "Department.<br />";
      } else {
        this.myObj.Department = this.dep.value.id;
      }

      if (this.tStatus.value === null || this.tStatus.value.id === null) {
        this.fields += "Status.<br />";
      } else {
        this.myObj.Status = this.tStatus.value.id;
      }

      if (
        this.myObj.Qualification === null ||
        this.myObj.Qualification.length === 0
      ) {
        this.fields += "Qualification.<br />";
      }
      if (
        this.myObj.ProEduDetails === null ||
        this.myObj.ProEduDetails.length === 0
      ) {
        this.fields += "Professional Education Details.<br />";
      }

      if (
        this.myObj.appointmentSalary === null ||
        this.myObj.appointmentSalary.length === 0
      ) {
        this.fields += "Appointment Salary.<br />";
      }
      if (
        this.myObj.basicSalary === null ||
        this.myObj.basicSalary.length === 0
      ) {
        this.fields += "Basic Salary.<br />";
      }
      if (
        this.myObj.Allowances === null ||
        this.myObj.Allowances.length === 0
      ) {
        this.fields += "Allowances.<br />";
      }
      if (
        this.myObj.leavesAllowed === null ||
        this.myObj.leavesAllowed.length === 0
      ) {
        this.fields += "Leave Allowed.<br />";
      }
      if (
        this.myObj.sickLeavesAllowed === null ||
        this.myObj.sickLeavesAllowed.length === 0
      ) {
        this.fields += "Sick Leaves Allowed.<br />";
      }
      if (
        this.myObj.leaveDeduction === null ||
        this.myObj.leaveDeduction.length === 0
      ) {
        this.fields += "Leave Deduction Mode.<br />";
      }

      if (this.fields.length > 0)
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Please define following field:<br />" + this.fields,
          type: "danger",
          icon: "fa fa-ban",
          timeout: this.$store.state.timeout,
        });
      else {
        this.sign = "fas fa-circle-notch fa-spin";
        this.saving = true;
        this.optionName = "Saving";

        if (this.$store.state.tID === 0) {
          //Add
          var url =
            this.$store.state.domain +
            "/Staff/Create?_db=" +
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
                  timeout: $store.state.timeout,
                });
              } else {
                this.credData = [];
                response.data.credsData.forEach((element) => {
                  this.credData.push({
                    type: (element.type + "").replace("4", "Employee"),
                    username: element.username,
                    pw: element.pw,
                  });
                });
                this.$notify({
                  verticalAlign: "top",
                  horizontalAlign: "right",
                  message:
                    'Saved! <br />New Staff "' + this.myObj.name + '" saved.',
                  type: "success",
                  icon: "fa fa-check",
                  timeout: this.$store.state.timeout,
                });
              }
            })
            .finally(() => {
              this.sign = "fas fa-check";
              this.saving = false;
              this.optionName = "Saved";
            });
        } else {
          //Edit

          this.myObj.EditBy = this.$store.state.uID;
          var url =
            this.$store.state.domain +
            "/Staff/Edit?_db=" +
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
                  timeout: $store.state.timeout,
                });
              } else {
                this.credData = [];
                response.data.credsData.forEach((element) => {
                  this.credData.push({
                    type: (element.type + "").replace("4", "Employee"),
                    username: element.username,
                    pw: element.pw,
                  });
                });
                this.$notify({
                  verticalAlign: "top",
                  horizontalAlign: "right",
                  message:
                    'Saved! <br />Staff "' + this.myObj.name + '" saved.',
                  type: "success",
                  icon: "fa fa-check",
                  timeout: this.$store.state.timeout,
                });
              }
            })
            .finally(() => {
              this.sign = "fas fa-check";
              this.saving = false;
              this.optionName = "Saved";
            });
        }
      }
    },
  },
};
</script>
