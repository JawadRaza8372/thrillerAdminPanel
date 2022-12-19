<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Welcome!</h1>
              <p class="text-lead text-white">Login with your credentials.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <div class="card-body px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Sign in with credentials</small>
              </div>
              <form
                role="form"
                class="needs-validation"
                @submit.prevent="Login"
              >
                <base-input
                  class="mb-3"
                  append-icon="ni ni-email-83"
                  name="Username"
                  type="text"
                  :error="getError('Username')"
                  :valid="isValid('Username')"
                  v-validate="'required'"
                  placeholder="Username"
                  v-model="myObj.email"
                >
                </base-input>

                <base-input
                  class="mb-3"
                  append-icon="ni ni-lock-circle-open"
                  :type="showPw ? 'text' : 'password'"
                  placeholder="Password"
                  name="Password"
                  :error="getError('Password')"
                  :valid="isValid('Password')"
                  v-validate="'required'"
                  v-model="myObj.password"
                >
                </base-input>

                <base-checkbox>Remember me</base-checkbox>
                <div class="text-center">
                  <base-button
                    type="primary"
                    :disabled="saving"
                    class="my-4 col"
                    @click="Login"
                    ><i v-bind:class="sign"></i>Sign in</base-button
                  >
                </div>
              </form>
            </div>
          </div>
          <div hidden class="row mt-3">
            <div class="col-6">
              <router-link hidden to="/dashboard" class="text-light"
                ><small>Forgot password?</small></router-link
              >
            </div>
            <div class="col-6 text-right">
              <router-link to="/register" class="text-light"
                ><small>Create new account</small></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from "vue";
import qs from "qs";

export default {
  created() {
    console.log("on login");
    try {
      this.$store.state.myUser.email = "";
      this.$store.state.myUser.password = "";
    } catch (error) {}

    this.$store.commit("domain", "https://api.thrillerme.com");
    this.$store.commit("quiqup", "https://api-ae.quiqup.com/order_label/");
    this.$store.commit("isLoggedIn", false);
    this.$store.commit("isVetter", true);
  },
  data() {
    return {
      showPw: false,
      validated: false,
      myObj: {
        email: "",
        password: "",
      },
      model: {
        userID: "",
        password: "",
        rememberMe: false,
      },
      saving: false,
      menu: [],
      db: "",
      sign: "",
    };
  },
  computed: {
    user() {
      return this.$store.state.userData;
    },
  },
  methods: {
    async Login() {
      this.sign = "fas fa-circle-notch fa-spin";
      this.saving = true;
      this.$store.commit(
        "updateQuiqup",
        "https://api-ae.quiqup.com/order_label/"
      );
      var url = this.$store.state.domain + "/registrations/login";

      axios
        .post(url, this.myObj)
        .then((res) => {
          // console.log(res);
          if (res.data.user_role === 3 || res.data.user_role === 0) {
            this.$store.commit("isLoggedIn", true);
            if (res.data.user_role === 0) {
              this.$store.commit("isVetter", false);

              this.$store.state.myUser.role = res.data.user_role;
              this.$store.state.myUser.userId = res.data.user_id;
              this.$store.state.myUser.email = res.data.email;
              this.$store.state.myUser.password = res.data.password;

              this.$store.commit("updateMyUsersData", this.$store.state.myUser);
              let resolved = this.$router.resolve("/fusion/dashboard");
              //  console.log("Router: Hello Osama ",  this.$store.state.myUser);

              if (resolved.route.name != "404")
                this.$router.push({
                  name: resolved.route.name,
                  params: {},
                });
            } else {
              this.$store.commit("isVetter", true);
              let resolved = this.$router.resolve("/fusion/orders");
              ////console.log.log("Router: ", resolved.route.name);
              if (resolved.route.name != "404")
                this.$router.push({
                  name: resolved.route.name,
                  params: {},
                });
            }
          } else {
            alert("Invalid login");
            this.saving = true;
          }
        })
        .catch(function (error) {
          alert("Invalid login");
          ////console.log.error(error);
        })
        .finally(() => {
          this.sign = "";
          this.saving = false;
        });

      // axios
      //   .post("https://api.thrillerme.com/registrations/login", this.myObj)
      //   .then((res) => {
      //     //console.log.log("R", res);
      //     if (res.data.user_role === 3 || res.data.user_role === 0) {
      //       this.$store.commit("isLoggedIn", true);
      //       if (res.data.user_role === 0) {
      //         this.$store.commit("isVetter", false);
      //       } else {
      //         this.$store.commit("isVetter", true);
      //       }

      //       let resolved = this.$router.resolve("/fusion/dashboard");
      //       //console.log.log("Router: ", resolved.route.name);
      //       if (resolved.route.name != "404")
      //         this.$router.push({
      //           name: resolved.route.name,
      //           params: {},
      //         });
      //     } else {
      //       alert("Invalid login");
      //       this.saving = true;
      //     }
      //   })
      //   .catch((e) => {
      //     //console.log.error(e);
      //     this.saving = true;
      //   });
    },

    getError(name) {
      return this.errors.first(name);
    },

    isValid(name) {
      return this.validated && !this.errors.has(name);
    },
  },
};
</script>
