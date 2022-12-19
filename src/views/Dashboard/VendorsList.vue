<template>
  <ul class="list-group list-group-flush list my--3">
    <li
      class="list-group-item px-0"
      v-for="user in users"
      :key="user.seller_id"
    >
      <div class="row align-items-center">
        <div class="col-auto">
          <!-- Avatar -->
          <!--<a href="#" class="avatar rounded-circle">
            <img alt="Image placeholder" :src="user.img" />
          </a> -->
        </div>
        <div class="col ml--2">
          <h4 class="mb-0">
            <a>{{ user.firstName + " " + user.lastName }}</a>
          </h4>
          <small>{{ user.address }}</small>
        </div>
        <div class="col-auto">
          <base-button
            type="primary"
            size="sm"
            @click.native="
              handleAccept(user.user_id, user.email, user.firstName)
            "
            >Accept</base-button
          >
        </div>
        <div class="col-auto">
          <base-button
            type="danger"
            size="sm"
            @click.native="
              handleDelete(user.user_id, user.email, user.firstName)
            "
            >Decline</base-button
          >
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import { BaseProgress } from "@/components";
import { axios } from "axios";
import qs from "qs";
import swal from "sweetalert2";
import Vue from "vue";
export default {
  name: "vendors-list",
  components: {
    BaseProgress,
  },
  created() {
    this.LoadNewSellers();
    // //console.log.log(this.users[0]);
    //console.log.log("Osama");
  },
  mounted() {},
  data() {
    return {
      users: [],
    };
  },
  methods: {
    handleAccept(userId, useremail, username) {
      //console.log.log(userId,useremail,username);
      swal({
        title: "Are you sure?",
        text: "You want to a accept " + username + " as official seller?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Yes, Accept please!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          var url =
            this.$store.state.domain + `/registrations/accept/${userId}`;
          // //console.log.log(url);
          // //console.log.log(result.value);
          //  this.responseAvailable = false;

          fetch(url, {
            method: "PUT",
          })
            .then((response) => {
              if (response.ok) {
                //console.log.log(response.json());

                fetch(this.$store.state.domain + "/signup", {
                  emailTo: useremail,
                  emailType: "approved",
                  method: "POST",
                })
                  .then((res) => {
                    //console.log.log(res);
                  })
                  .catch((err) => {
                    //console.log.error(err);
                  });

                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message:
                    'Done! <br />Seller "' +
                    row.firstName +
                    '" has been accepted.',
                  type: "success",
                  icon: "fa fa-check",
                  timeout: this.$store.state.timeout,
                });
                // .then(response => {
                //     if(response.ok){
                //         return response.json()
                //     } else{
                //         alert("Server returned " + response.status + " : " + response.statusText);
                //     }
                // })
                // .then(response => {
                //     this.result = response.body;
                //     this.responseAvailable = true;
                // })
                //     }
                //     else
                //     {
                //        //console.log.log(response.status + " : " + response.statusText);
                //     }
                // })
                // .then(response => {
                //     this.result = response;
                //     // //console.log.log(this.result)
                //     this.responseAvailable = true;
                //  })

                // .then((response) => {
                //   ////console.log.log("R", response);
                //   if (response.data.status === "error") {
                //   } else {
                //     axios.post(this.$store.state.domain + "/signup", {
                //         emailTo: username,
                //         emailType: "approved",
                //       })
                //       .then((res) => {
                //         //console.log.log(res);
                //       })
                //       .catch((err) => {
                //         //console.log.error(err);
                //       });

                //     this.$notify({
                //       verticalAlign: "bottom",
                //       horizontalAlign: "center",
                //       message:
                //         'Done! <br />Seller "' +
                //         username +
                //         '" has been accepted.',
                //       type: "success",
                //       icon: "fa fa-check",
                //       timeout: this.$store.state.timeout,
                //     });
                //   }
                // })  .catch(function (error) {});
              }
            })
            .catch(function (error) {});
        }
      });
    },
    handleDelete(userId, useremail, username) {
      swal({
        title: "Are you sure?",
        text: "You want to reject " + username + "?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Yes, reject it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          var url =
            this.$store.state.domain + `/registrations/reject/${userId}`;
          //console.log.log(url);
          fetch(url, {
            method: "PUT",
          })
            .then((response) => {
              if (response.ok) {
                //console.log.log(response.json());

                fetch(this.$store.state.domain + "/signup", {
                  emailTo: useremail,
                  emailType: "rejected",
                  method: "POST",
                })
                  .then((res) => {
                    //console.log.log(res);
                  })
                  .catch((err) => {
                    //console.log.error(err);
                  });

                this.$notify({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  message: 'Done! <br />Seller "' + username + '" rejected.',
                  type: "danger",
                  icon: "fa fa-check",
                  timeout: this.$store.state.timeout,
                });
                // .then(response => {
                //     if(response.ok){
                //         return response.json()
                //     } else{
                //         alert("Server returned " + response.status + " : " + response.statusText);
                //     }
                // })
                // .then(response => {
                //     this.result = response.body;
                //     this.responseAvailable = true;
                // })
                //     }
                //     else
                //     {
                //        //console.log.log(response.status + " : " + response.statusText);
                //     }
                // })
                // .then(response => {
                //     this.result = response;
                //     // //console.log.log(this.result)
                //     this.responseAvailable = true;
                //  })

                // .then((response) => {
                //   ////console.log.log("R", response);
                //   if (response.data.status === "error") {
                //   } else {
                //     axios.post(this.$store.state.domain + "/signup", {
                //         emailTo: username,
                //         emailType: "approved",
                //       })
                //       .then((res) => {
                //         //console.log.log(res);
                //       })
                //       .catch((err) => {
                //         //console.log.error(err);
                //       });

                //     this.$notify({
                //       verticalAlign: "bottom",
                //       horizontalAlign: "center",
                //       message:
                //         'Done! <br />Seller "' +
                //         username +
                //         '" has been accepted.',
                //       type: "success",
                //       icon: "fa fa-check",
                //       timeout: this.$store.state.timeout,
                //     });
                //   }
                // })  .catch(function (error) {});
              }
            })
            .catch(function (error) {});
        }
      });
    },
    LoadNewSellers() {
      var url = "https://api.thrillerme.com/sellers/new";

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.users = data;
        });

      //   axios
      //     .get(url)
      //     .then((response) => {
      //       //console.log.log(response);
      //       if (response.data.status === "error") {
      //       } else {
      //         this.users = response.data;
      //       }
      //     })
      //     .catch(function (error) {
      //       //console.log.error("err", error)
      //     });
    },
  },
};
</script>
<style></style>
