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

    <modal
      :show.sync="customModal"
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
              :preselect-first="true"
              @select="loadSecC"
              id="cmbClass"
            >
            </multiselect>
          </base-input>

          <base-input label="Section:">
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
              id="cmbSection"
            >
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
              id="cmbFaculty"
            >
            </multiselect>
          </base-input>

          <base-input label="Teacher:">
            <multiselect
              placeholder="Select teacher"
              v-model="cmbTeacher.value"
              :options="cmbTeacher.data"
              :close-on-select="true"
              :clear-on-select="false"
              :hide-selected="false"
              :preserve-search="true"
              label="name"
              track-by="name"
              :preselect-first="true"
              @select="UpdateValue"
              id="cmbTeacher"
            >
            </multiselect>
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

          <div>
            <base-button
              @click="EnrollCourses()"
              :disabled="savingC"
              type="primary"
              class="col"
              ><i v-bind:class="signC"></i> {{ optionC }}
            </base-button>
          </div>
        </template>
      </card>
    </modal>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-lg-6">
          <div class="card-wrapper">
            <!-- Input groups -->
            <card>
              <!-- Card header -->
              <h3 slot="header" class="mb-0">Student Information</h3>
              <!-- Card body -->
              <form>
                <!-- Input groups with icon -->
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      placeholder="Enter Family Code"
                      v-model="myObj.FCode"
                      label="Family Code :"
                      type="number"
                    ></base-input>
                  </div>
                  <div class="col-md-6">
                    <el-tooltip content="Already Admitted :" placement="top">
                      <base-input
                        v-model="myObj.GRNo"
                        placeholder="Enter G.R Number"
                        label="G.R No "
                      ></base-input>
                    </el-tooltip>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <base-input
                      v-model="myObj.Studentname"
                      label="Student name:"
                      placeholder="Enter student name"
                    ></base-input>
                  </div>
                  <div class="col-md-3">
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
                </div>
                <!-- Input groups with icon -->
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      v-model="myObj.ShortName"
                      placeholder="Enter Short Name"
                      label="Short Name :"
                    >
                    </base-input>
                  </div>
                  <div class="col-md-12">
                    <base-input
                      v-model="myObj.FatherName"
                      placeholder="Enter Father Name"
                      label="Father's Name:"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      v-model="myObj.dobInWords"
                      placeholder="Enter Date Of Birth"
                      label="Date of Birth (in words) :"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
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
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input label="Place of birth">
                      <multiselect
                        placeholder="Select place of birth"
                        v-model="pob.value"
                        :options="pob.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbPOB"
                      >
                      </multiselect>
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input label="Religion">
                      <multiselect
                        placeholder="Select religion"
                        v-model="religion.value"
                        :options="religion.data"
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
                  <div class="col-md-6">
                    <base-input label="Mother tongue">
                      <multiselect
                        placeholder="Select mother tongue"
                        v-model="mt.value"
                        :options="mt.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbMotherTongue"
                      >
                      </multiselect>
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input label="Nationality">
                      <multiselect
                        placeholder="Select nationality"
                        v-model="nt.value"
                        :options="nt.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbNationality"
                      >
                      </multiselect>
                    </base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      v-model="myObj.HomeAddress"
                      placeholder="Enter Current Address"
                      label="Current Address :"
                    >
                    </base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      v-model="myObj.permanentAddress"
                      placeholder="Enter Permanent Address"
                      label="Permanent Address :"
                    >
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input label="Locality">
                      <multiselect
                        placeholder="Select Locality"
                        v-model="area.value"
                        :options="area.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbArea"
                      >
                      </multiselect>
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.StudentNo"
                      placeholder="Enter Student Contact No."
                      type="text"
                      label="Student's contact No :"
                    >
                    </base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      v-model="myObj.lastInstitute"
                      placeholder="Enter Last Institute"
                      label="Last Institute"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.lastClass"
                      placeholder="Enter last class attended"
                      label="Last class attended"
                    >
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.mediumInstruction"
                      placeholder="Enter Medium"
                      label="Medium :"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
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
                    <base-input
                      v-model="myObj.lastResult"
                      placeholder="Last result of previous school"
                      label="Last result - (Previous school) :"
                    >
                    </base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      v-model="myObj.physicalHandicap"
                      placeholder="Enter Physical Handicap"
                      label="Physical Handicap :"
                    >
                    </base-input>
                  </div>
                </div>
              </form>
            </card>
            <!-- Dropdowns -->
            <card>
              <!-- Card header -->
              <h3 slot="header" class="mb-0">Father's Information</h3>
              <!-- Card body -->
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.NIC"
                      placeholder="Enter CNIC No"
                      label="CNIC No :"
                      type="text"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.FatherEducation"
                      placeholder="Enter Education"
                      label="Education :"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.FOccupation"
                      placeholder="Enter Occupation"
                      label="Occupation :"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.MonthlyIncome"
                      placeholder="Enter Monthly Income"
                      label="Monthly Income :"
                      type="number"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.OfcNumber"
                      placeholder="Enter Office No"
                      label="Office No :"
                      type="text"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.Mob"
                      placeholder="Enter Mobile No"
                      label="Mobile No :"
                      type="text"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      v-model="myObj.OfcAddress"
                      placeholder="Enter Office Address"
                      label="Office Address :"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.Fax"
                      placeholder="Enter Fax"
                      label="Fax :"
                      type="text"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.Email"
                      placeholder="Enter Email"
                      label="Email :"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      v-model="myObj.f_Employer"
                      placeholder="Enter Employer"
                      label="Employer :"
                    >
                    </base-input>
                  </div>
                </div>
              </form>
            </card>

            <card>
              <!--Card Header-->
              <h3 slot="header" class="mb-0">Guardian's Information</h3>
              <!--Card Body-->
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.g_name"
                      placeholder="Enter Name"
                      label="Name :"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.g_occupation"
                      placeholder="Enter Occupation"
                      label="Occupation :"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.g_office_num"
                      placeholder="Enter OFfice No"
                      label="Office No :"
                      type="text"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.g_mob"
                      placeholder="Enter Mobile No"
                      label="Mobile No :"
                      type="text"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.g_cnic"
                      placeholder="Enter CNIC No"
                      label="CNIC No :"
                      type="text"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.g_email"
                      placeholder="Enter Email"
                      label="Email :"
                      type="email"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.g_employer"
                      placeholder="Enter Employer"
                      label="Employer :"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.g_qualification"
                      placeholder="Enter Education"
                      label="Education :"
                    >
                    </base-input>
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
              <h3 slot="header" class="mb-0">Registration Information</h3>
              <!--Card Body-->
              <form>
                <!-- Input groups with icon -->

                <div class="row">
                  <div class="col-md-4">
                    <base-input label="Date of Registration">
                      <flat-picker
                        slot-scope="{ focus, blur }"
                        @on-open="focus"
                        @on-close="blur"
                        :config="{ allowInput: true }"
                        class="form-control datepicker"
                        v-model="myObj.dateOfReg"
                      >
                      </flat-picker>
                    </base-input>
                  </div>

                  <div class="col-md-4">
                    <base-input label="Date of Addmission">
                      <flat-picker
                        slot-scope="{ focus, blur }"
                        @on-open="focus"
                        @on-close="blur"
                        :config="{ allowInput: true }"
                        class="form-control datepicker"
                        v-model="myObj.dateofAdd"
                      >
                      </flat-picker>
                    </base-input>
                  </div>

                  <div class="col-md-4">
                    <base-input label="Date of Joining">
                      <flat-picker
                        slot-scope="{ focus, blur }"
                        @on-open="focus"
                        @on-close="blur"
                        :config="{ allowInput: true }"
                        class="form-control datepicker"
                        v-model="myObj.joinDate"
                      >
                      </flat-picker>
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      v-model="myObj.BForm"
                      placeholder="Enter B-Form"
                      label="B-Form :"
                      type="text"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-5">
                    <base-input label="Class at the time of admission">
                      <multiselect
                        placeholder="Select class admitted"
                        v-model="cmbClassAdmitted.value"
                        :options="cmbClassAdmitted.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        @select="loadSecA"
                        id="cmbClassAdmitted"
                      >
                      </multiselect>
                    </base-input>
                  </div>

                  <div class="col-md-3">
                    <base-input label="Section (admitted)">
                      <multiselect
                        placeholder="Section (admitted)"
                        v-model="cmbSecAdmitted.value"
                        :options="cmbSecAdmitted.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbSecAdmitted"
                      >
                      </multiselect>
                    </base-input>
                  </div>

                  <div class="col-md-4">
                    <base-input label="Faculty (admitted)">
                      <multiselect
                        placeholder="Select faculty (admitted)"
                        v-model="cmbFacultyAdmitted.value"
                        :options="cmbFacultyAdmitted.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbFacultyA"
                      >
                      </multiselect>
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-5">
                    <base-input label="Current class">
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
                  </div>

                  <div class="col-md-3">
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
                  </div>

                  <div class="col-md-4">
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
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.RollNum"
                      placeholder="Enter Roll No"
                      label="Roll No :"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.Enrolment"
                      placeholder="Enter Enrolment No."
                      label="Enrolment No.:"
                      type="text"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input label="Admission reference">
                      <multiselect
                        placeholder="Select admission reference"
                        v-model="cmbAdmissionBased.value"
                        :options="cmbAdmissionBased.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbAdmissionBased"
                      >
                      </multiselect>
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input label="Pay mode">
                      <multiselect
                        placeholder="Select pay mode"
                        v-model="cmbPayMode.value"
                        :options="cmbPayMode.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbPayMode"
                      >
                      </multiselect>
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.TuitorMob"
                      placeholder="Enter Tuitor No"
                      label="Tuitor No :"
                      type="text"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input label="Re-addmission date">
                      <flat-picker
                        slot-scope="{ focus, blur }"
                        @on-open="focus"
                        @on-close="blur"
                        :config="{ allowInput: true }"
                        class="form-control datepicker"
                        v-model="myObj.reAdmissionDate"
                      >
                      </flat-picker>
                    </base-input>
                  </div>
                </div>
              </form>
            </card>

            <card>
              <!--Card Header-->
              <h3 slot="header" class="mb-0">Courses</h3>

              <!--Card Body-->
              <form>
                <div class="row">
                  <div class="col-md-4">
                    <base-input label="Batch">
                      <multiselect
                        placeholder="Select batch"
                        v-model="cmbBatch.value"
                        :options="cmbBatch.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbBatch"
                      >
                      </multiselect>
                    </base-input>
                  </div>
                  <div class="col-md-4" style="margin-top: 28px">
                    <base-button @click="Enroll()" type="success" class="col"
                      >Enroll from batch
                    </base-button>
                  </div>
                  <div class="col-md-4" style="margin-top: 28px">
                    <base-button @click="customModal = true" class="col"
                      >Customize enrollment
                    </base-button>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <el-table
                      :data="coursesData"
                      row-key="1"
                      header-row-class-name="thead-light"
                    >
                      <el-table-column
                        v-for="column in coursesCols"
                        :key="column.id"
                        v-bind="column"
                      >
                      </el-table-column>

                      <el-table-column
                        min-width="180px"
                        align="right"
                        label="Options"
                      >
                        <div slot-scope="{ $index, row }" class="d-flex">
                          <base-button
                            @click.native="DeleteCourses($index, row)"
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

            <card>
              <!--Card Header-->
              <h3 slot="header" class="mb-0">Fee Information</h3>
              <!--Card Body-->

              <form>
                <div class="row">
                  <div class="col-md-4">
                    <base-input :label="this.actualFee">
                      <multiselect
                        placeholder="Select fee session"
                        v-model="cmbFeeSession.value"
                        :options="cmbFeeSession.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        @select="UpdateValue"
                        id="cmbFeeSession"
                      >
                      </multiselect>
                    </base-input>
                  </div>

                  <div class="col-md-3">
                    <base-input :label="this.statusDiscount">
                      <multiselect
                        placeholder="Select fee status"
                        v-model="cmbFeeStatus.value"
                        :options="cmbFeeStatus.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        @select="UpdateValue"
                        id="cmbFeeStatus"
                      >
                      </multiselect>
                    </base-input>
                  </div>

                  <div class="col-md-5">
                    <base-input :label="this.ccDiscount">
                      <multiselect
                        placeholder="Select concession category"
                        v-model="cmbCC.value"
                        :options="cmbCC.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        @select="UpdateValue"
                        id="cmbCC"
                      >
                      </multiselect>
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <base-input
                      :disabled="isFeeDisabled"
                      v-on:keyup="feeChange"
                      placeholder="Fee Amount"
                      label="Fee Amount :"
                      v-model="myObj.monthlyFee"
                      type="number"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-3">
                    <base-input
                      v-model="myObj.customDueDate"
                      placeholder="Due date - (Date only)"
                      label="Fee due date:"
                      type="number"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-5">
                    <base-input
                      v-model="myObj.timelyDiscount"
                      placeholder="Timely discount"
                      label="Timely discount:"
                      type="number"
                    >
                    </base-input>
                  </div>
                </div>
              </form>
            </card>

            <card>
              <!--Card Header-->
              <h3 slot="header" class="mb-0">Transporter Details</h3>
              <form>
                <div class="row">
                  <div class="col-md-8">
                    <base-input label="Transporter">
                      <multiselect
                        placeholder="Select transporter"
                        v-model="cmbTransporter.value"
                        :options="cmbTransporter.data"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :hide-selected="false"
                        :preserve-search="true"
                        label="name"
                        track-by="name"
                        :preselect-first="true"
                        id="cmbTransporter"
                      >
                      </multiselect>
                    </base-input>
                  </div>

                  <div class="col-md-2">
                    <base-input label="Arrive">
                      <base-switch
                        style="margin-top: 7px"
                        v-model="myObj.vanIn"
                      ></base-switch>
                    </base-input>
                  </div>

                  <div class="col-md-2">
                    <base-input label="Depart">
                      <base-switch
                        style="margin-top: 7px"
                        v-model="myObj.vanOut"
                      ></base-switch>
                    </base-input>
                  </div>
                </div>
              </form>
            </card>

            <card>
              <!--Card Header-->
              <h3 slot="header" class="mb-0">Emergency Contact Details</h3>
              <form>
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      v-model="myObj.emergency_name"
                      placeholder="Enter Name"
                      label="Name :"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.relation"
                      placeholder="Enter Relation"
                      label="Relation :"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.emergencyNum"
                      placeholder="Enter Emergency No"
                      label="Emergency No :"
                      type="text"
                    >
                    </base-input>
                  </div>
                </div>
              </form>
            </card>

            <card>
              <!--Card Header-->
              <h3 slot="header" class="mb-0">Mother's Information</h3>
              <!--Card Body-->
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.M_Name"
                      placeholder="Enter Name"
                      label="Name :"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.M_Occupation"
                      placeholder="Enter Occupation"
                      label="Occupation :"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.PhoneNum"
                      placeholder="Enter Phone No"
                      label="Phone No :"
                      type="text"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.HomeMobile"
                      placeholder="Enter Mobile No"
                      label="Mobile No :"
                      type="text"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.M_CNIC"
                      placeholder="Enter CNIC No"
                      label="CNIC No :"
                      type="text"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.M_Qualification"
                      placeholder="Enter Education"
                      label="Education :"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.m_employer"
                      placeholder="Enter Employer"
                      label="Employer :"
                    >
                    </base-input>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-model="myObj.motherEmail"
                      placeholder="Enter Email"
                      label="Email :"
                      type="email"
                    >
                    </base-input>
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
import qs from "qs";
import axios from "axios";
import Multiselect from "vue-multiselect";
import { teal } from "color-name";
import moment from "moment";
import swal from "sweetalert2";
import { Table, TableColumn, Select, Option } from "element-ui";

export default {
  name: "form-components",
  components: {
    Multiselect,
    HtmlEditor,
    TagsInput,
    DropzoneFileUpload,
    BaseSlider,
    flatPicker,
    [Select.name]: Select,
    [Option.name]: Option,

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
      cmbTeacher: {
        value: null,
        data: [],
      },
      cmbSubject: {
        value: null,
        data: [],
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
        courses: [],
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
      coursesData: [],
      coursesCols: [
        {
          prop: "Subject",
          label: "Subject",
          minWidth: 180,
          sortable: true,
        },
        {
          prop: "Teacher",
          label: "Teacher",
          minWidth: 180,
          sortable: true,
        },
        {
          prop: "Class",
          label: "Class",
          minWidth: 220,
          sortable: true,
        },
      ],
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
      customModal: false,
      optionC: "Enroll",
      savingC: false,
      signC: "fas fa-edit",
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
        this.cmbCC.value.id +
        "&sID=" +
        this.$store.state.sID;
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

    loadSecA(option, id) {
      this.cmbSecAdmitted.data = [];
      this.cmbSecAdmitted.value = { id: null, name: null };
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
              this.cmbSecAdmitted.data.push({
                id: element.id,
                name: element.sec,
              });

              if (i === 0 && this.$store.state.sID === 0) {
                this.cmbSecAdmitted.value = {
                  id: element.id,
                  name: element.sec,
                };
              } else if (element.sec === this.myObj.Sec) {
                this.cmbSecAdmitted.value = {
                  id: element.id,
                  name: element.sec,
                };
              }

              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Area: ', error);
        });
    },

    loadSecC(option, id) {
      this.cmbSection.data = [];
      this.cmbSection.value = { id: null, name: null };
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
              this.cmbSection.data.push({ id: element.id, name: element.sec });

              if (i === 0) {
                this.cmbSection.value = { id: element.id, name: element.sec };
              }
              i++;
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Area: ', error);
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
              this.cmbClass.data.push({ id: element.id, name: element.Class });

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
              this.cmbFaculty.data.push({
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

      //Teacher
      var url =
        this.$store.state.domain +
        "/Staff/Filldropdown?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db;
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "error") {
            //console.log.log('Error on getting Teacher: ', response.data);
          } else {
            response.data.data.forEach((element) => {
              this.cmbTeacher.data.push({ id: element.id, name: element.name });
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Techers: ', error);
        });

      //Subjects
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
            response.data.data.forEach((element) => {
              this.cmbSubject.data.push({ id: element.id, name: element.name });
            });
          }
        })
        .catch(function (error) {
          //console.log.log('Server Error on getting Subjects: ', error);
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

            this.coursesData = response.data.coursesData;

            //console.log.log('loaded fee status: ', this.myObj.FeeStatus);
            if (this.myObj.FeeStatus == 0) this.isFeeDisabled = false;
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

    UpdateValue(option, id) {
      if (id === "cmbFeeSession") {
        this.cmbFeeSession.value = { id: option.id, name: option.name };
        //console.log.log('updatting session', this.cmbFeeSession.value);
      } else if (id === "cmbFeeStatus") {
        //console.log.log('fee status: ', option.id);
        if (option.id == 0) this.isFeeDisabled = false;
        else this.isFeeDisabled = true;

        this.cmbFeeStatus.value = { id: option.id, name: option.name };
        //console.log.log('updatting status', this.cmbFeeStatus.value);
      } else if (id === "cmbCC") {
        this.cmbCC.value = { id: option.id, name: option.name };
        //console.log.log('updatting CC', this.cmbCC.value);
      }
      this.loadFee();
    },

    feeChange() {
      if (this.cmbFeeStatus.value.id === 0)
        this.statusDiscount = "Fee status (Rs." + this.myObj.monthlyFee + ")";

      if (this.myObj.monthlyFee === null || this.myObj.monthlyFee.length === 0)
        this.statusDiscount = "Fee status (Rs.0)";
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

            this.myObj.courses = this.coursesData;

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
                    } else {
                      this.$store.commit("sID", response.data.id);
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
            this.myObj.courses = this.coursesData;
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
    Enroll() {
      if (this.cmbBatch.value === null || this.cmbBatch.value.id === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select a batch.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }
      if (
        this.cmbCurrentClass.value === null ||
        this.cmbCurrentClass.value.id === null
      ) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select current class.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }
      if (
        this.cmbCurrentSec.value === null ||
        this.cmbCurrentSec.value.id === null
      ) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select current section.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }
      if (
        this.cmbFacultyCurrent.value === null ||
        this.cmbFacultyCurrent.value.id === null
      ) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select current faculty.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }

      //Fill Grid
      var url =
        this.$store.state.domain +
        "/BatchAllocation/Get?cID=" +
        this.$store.state.cID +
        "&_db=" +
        this.$store.state.db +
        "&bID=" +
        this.cmbBatch.value.id +
        "&clsID=" +
        this.cmbCurrentClass.value.id +
        "&sec=" +
        this.cmbCurrentSec.value.name +
        "&facID=" +
        this.cmbFacultyCurrent.value.id;
      //console.log.log('Enroll: ', url)
      axios
        .get(url)
        .then((response) => {
          if (response.data.status === "success") {
            //this.coursesData = response.data.data;
            response.data.data.forEach((element) => {
              let index = this.coursesData.findIndex(
                (check) =>
                  check.tID === element.tID &&
                  check.clsID === element.clsID &&
                  check.sec === element.sec &&
                  check.faculty === element.faculty &&
                  check.subID === element.subID
              );

              if (index === -1) {
                this.coursesData.push({
                  id: element.id,
                  localID: element.localID,
                  Subject: element.Subject,
                  Teacher: element.Teacher,
                  Class: element.Class,
                  subID: element.subID,
                  tID: element.tID,
                  clsID: element.clsID,
                  sec: element.sec,
                  faculty: element.faculty,
                });
              }
            });
          } else {
            //console.log.log('Error on grid: ', response)
          }
        })
        .catch(function (error) {});
    },

    EnrollCourses() {
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
      if (this.cmbTeacher.value === null) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select a teacher.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }
      if (
        this.cmbSubject.value === null ||
        this.cmbSubject.value.length === 0
      ) {
        this.$notify({
          verticalAlign: "top",
          horizontalAlign: "right",
          message: "Error! <br />" + "Please select a subject.",
          type: "danger",
          icon: "fa fa-ban",
          timeout: 0,
        });
        return;
      }

      //Add to Table
      this.cmbSubject.value.forEach((element) => {
        let index = this.coursesData.findIndex(
          (check) =>
            check.tID === this.cmbTeacher.value.id &&
            check.clsID === this.cmbClass.value.id &&
            check.sec === this.cmbSection.value.name &&
            check.faculty === this.cmbFaculty.value.id &&
            check.subID === element.id
        );

        if (index === -1) {
          this.coursesData.push({
            id: 0,
            localID: 0,
            Subject: element.name,
            Teacher: this.cmbTeacher.value.name,
            Class:
              this.cmbClass.value.name +
              " - " +
              this.cmbSection.value.name +
              " (" +
              this.cmbFaculty.value.name +
              ")",
            subID: element.id,
            tID: this.cmbTeacher.value.id,
            clsID: this.cmbClass.value.id,
            sec: this.cmbSection.value.name,
            faculty: this.cmbFaculty.value.id,
          });
        }
      });

      this.customModal = false;
    },

    DeleteCourses(index, row) {
      swal({
        title: "Are you sure?",
        text: "You want to delete " + row.Subject + "?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.deleteRow(row);
        }
      });
    },
    deleteRow(row) {
      //alert('removing: ' + row.localID +  ' - ' + row.Subject)
      let indexToDelete = this.coursesData.findIndex(
        (tableRow) => tableRow.localID === row.localID
      );
      if (indexToDelete >= 0) {
        this.coursesData.splice(indexToDelete, 1);
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
