<template>
     <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Attendance</h6>
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
   
        
      <div>
       <card class="col-6">
          <img slot="image" class="card-img-top" src="../../../public/img/attd.jpg" alt="Image placeholder">
          <!-- Card body -->
          <h5 class="h2 card-title mb-0">Get started with Argon</h5>
          <small class="text-muted">by John Snow on Oct 29th at 10:23 AM</small>
          <p class="card-text mt-4">Argon is a great free UI package based on Bootstrap 4 that includes the most important
              components and features.</p>

          <a href="#!" class="btn btn-link px-0">View article</a>

      </card>
      </div>
    </div>
    
    </div>    
</template>

<script>
import { Table, TableColumn, Select, Option } from 'element-ui';
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
import { BasePagination } from '@/components';
import clientPaginationMixin from '../Tables/PaginatedTables/clientPaginationMixin'
import swal from 'sweetalert2';
import axios from 'axios';
import qs from "qs";
import Vue from 'vue';
import Multiselect from 'vue-multiselect'
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
    [TableColumn.name]: TableColumn
  },

  created(){            
          
  },          
  data() {

    return {
    
    }
  },
  methods: {
 
   
  }
};
</script>