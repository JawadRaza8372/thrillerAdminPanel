<template>
  <div class="content">
    <div class="container-fluid mt--6">
      
        <card  class="no-border-card" body-classes="px-0 pb-0" footer-classes="pb-2">
       
       <div class="container">
<div class="messaging">
      <div class="inbox_msg">
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>Recent</h4>
            </div>
            <div class="srch_bar">
              <div class="stylish-input-group">
                <input type="text" class="search-bar"  placeholder="Search" >
                <span class="input-group-addon">
                <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                </span> </div>
            </div>
          </div>
          <div class="inbox_chat">
            <div v-for="getchat in chatlist" :key="getchat" class="chat_list ">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                  <h5>{{getchat.name}} <span class="chat_date">{{getchat.time}}</span></h5>
                  <p>{{getchat.messg}}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="mesgs">
          <div class="msg_history">
         <!--   <div v-for="getmsg in messages" class="incoming_msg">
              <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>{{getmsg}}</p>
                  <span class="time_date"> 11:01 AM    |    June 9</span></div>
              </div>
            </div>
            -->


            <div v-for="getmsg in messages" :key="getmsg" class="outgoing_msg">
              <div class="sent_msg">
                <p>{{getmsg}}</p>
                <span class="time_date"> 11:01 AM    |    June 9</span> </div>
            </div>
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input v-model="message" @keyup.enter="saveMessage" type="text" class="write_msg" placeholder="Type a message" />
              <button class="msg_send_btn" type="button"><i class="fas fa-share" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
      
      

    </div></div>
           
        </card>
      
       </div></div>
    
   
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
import moment from 'moment';
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  mixins: [clientPaginationMixin],
  components: {
    flatPicker,
    Multiselect,
    BasePagination,
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
      message : null,
      messages: ['1 msg', '2nd msg', '3 msg', '4 msg', '5 msg', '6 msg', '7 msg', '7 msg' ,'9 msg'],

    chatlist: [
    {
      name: 'Usman',
      messg: 'on top',
      time : 'Mar 23'
    },
    {
      name: 'Fastech',
      messg: 'on Front',
      time : 'Mar 23'
    },
    {
      name: 'Hasib',
      messg: 'on Bottom',
      time : 'Mar 23'
    },
    {
      name: 'Zeeshan',
      messg: 'on Middle',
      time : 'Mar 23'
    },
    {
      name: 'Jhanzaib',
      messg: 'on Average',
      time : 'Mar 23'
    },
    {
      name: 'Hamza',
      messg: 'on Average',
      time : 'Mar 23'
    },
    {
      name: 'Waqas',
      messg: 'on Middle',
      time : 'Mar 23'
    },
    ],

      
    currentDate: moment().format('YYYY-MM-DD'),
      
      myObj:{
            avatar: null,
            title: null,
            msg: null,
            time: null
      },
            myObj2:{
              fee: null,
              amount: null,            
      },     
      propsToSearch: ['gr'],
      tableColumns: [
         {
          prop: 'title',
          label: 'Title',
          minWidt0h: 120,
          sortable: true
        }

      ],

      
  

    };
  },
  methods: {
saveMessage()
{
  message=this.message;
}

  },
  computed: {
   
  }
 
};
</script>


<style scoped>
  .no-border-card .card-footer{
    border-top: 0;
  }



.container{max-width:100%; margin:auto;}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  overflow-y: auto;
}


</style>