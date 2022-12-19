<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5"></div>
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
      <div class="col-lg-12 mainContainer">
        <grid class="mainDiv">
          <row>
            <column
              :sm="0"
              :md="11"
              style="
                height: 100%;
                width: 100%;
                position: absolute;
                left: 0;
                background: url('https://appick.io/u/okaaik/okaaik_login.png');
                background-size: 100% 100%;
                border-top-left-radius: 20px;
                border-bottom-left-radius: 20px;
              "
            >
            </column>
            <column
              :sm="12"
              :md="5"
              style="
                height: 100%;
                width: 100%;
                position: absolute;
                right: 0;
                background-color: white;
                z-index: 1;
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
                padding: 50px;
              "
            >
              <div
                class="row"
                style="
                  background: #f3f3f3;
                  border-radius: 20px;
                  padding: 5px;
                  color: white;
                  margin-bottom: 20px;
                  width: 170px;
                  height: 35px;
                "
              >
                <div class="col" style="color: black; left: 0">Login</div>
                <div
                  class="col"
                  style="background: #172b4d; border-radius: 20px"
                >
                  Signup
                </div>
              </div>

              <form role="form">
                <div class="row">
                  <div class="col">
                    <base-input
                      alternative
                      class="mb-3"
                      placeholder="First Name"
                      v-model="model.name"
                    >
                    </base-input>
                  </div>
                  <div class="col">
                    <base-input
                      alternative
                      class="mb-3"
                      placeholder="Last Name"
                      v-model="model.address"
                    >
                    </base-input>
                  </div>
                </div>

                <base-input
                  alternative
                  class="mb-3"
                  prepend-icon="ni ni-mobile-button"
                  placeholder="Email"
                  v-model="model.phone"
                >
                </base-input>

                <div class="row">
                  <div class="col">
                    <base-input
                      alternative
                      class="mb-3"
                      prepend-icon="ni ni-lock-circle-open"
                      placeholder="Password"
                      type="password"
                      v-model="model.pwd"
                    >
                    </base-input>
                  </div>
                  <div class="col">
                    <base-input
                      alternative
                      class="mb-3"
                      prepend-icon="ni ni-lock-circle-open"
                      placeholder="Confirm Pw"
                      type="password"
                      v-model="model.pwdRepeat"
                    >
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <base-input
                      alternative
                      class="mb-3"
                      placeholder="Bakery Name"
                      v-model="model.phone"
                    >
                    </base-input>
                  </div>
                  <div class="col">
                    <base-input
                      alternative
                      class="mb-3"
                      prepend-icon="ni ni-mobile-button"
                      placeholder="Mobile No."
                      v-model="model.phone"
                    >
                    </base-input>
                  </div>
                </div>

                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Address"
                  v-model="model.phone"
                >
                </base-input>

                <div class="row">
                  <div class="col">
                    <base-input
                      alternative
                      class="mb-3"
                      placeholder="City"
                      v-model="model.phone"
                    >
                    </base-input>
                  </div>
                  <div class="col">
                    <base-input
                      alternative
                      class="mb-3"
                      placeholder="Country."
                      v-model="model.phone"
                    >
                    </base-input>
                  </div>
                </div>

                <div hidden class="text-muted font-italic">
                  <small
                    >password strength:
                    <span class="text-success font-weight-700"
                      >strong</span
                    ></small
                  >
                </div>
                <div class="row my-4">
                  <div class="col-12">
                    <base-checkbox v-model="model.agree">
                      <span class="text-muted"
                        >I agree with the <a href="#!">Privacy Policy</a></span
                      >
                    </base-checkbox>
                  </div>
                </div>
                <div class="text-center">
                  <router-link to="/fusion/dashboard" class="nav-link">
                    <button type="button" class="btn btn-primary mt-4">
                      Create account
                    </button>
                  </router-link>
                </div>
              </form>
            </column>
          </row>
        </grid>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      model: {
        name: "",
        email: "",
        password: "",
        agree: false,
      },
    };
  },
};
</script>
<style>
.mainDiv {
  height: 68vh;
  margin-top: -220px;
}
.mainContainer {
  background-color: white;
  border-radius: 20px;
  position: relative;
}
</style>
