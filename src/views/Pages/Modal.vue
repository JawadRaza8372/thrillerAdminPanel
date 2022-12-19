<template>
<div class="col-md-4">
        <base-button block type="default" class=" mb-3" @click="modals.modal3 = true">
            Form
        </base-button>

        <modal :show.sync="modals.modal3"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-sm">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <small>Sign in with</small>
                    </div>
                    <div class="btn-wrapper text-center">
                        <base-button type="neutral" icon>
                            <span class="btn-inner--icon">
                              <img src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/icons/common/github.svg">
                            </span>
                            <span class="btn-inner--text">Github</span>
                        </base-button>

                        <base-button type="neutral" icon>
                            <span class="btn-inner--icon">
                              <img src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/icons/common/google.svg">
                            </span>
                            <span class="btn-inner--text">Google</span>
                        </base-button>
                    </div>
                </template>
                <template>
                    <div class="text-center text-muted mb-4">
                        <small>Or sign in with credentials</small>
                    </div>
                    <form role="form">
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Email"
                                    addon-left-icon="ni ni-email-83">
                        </base-input>
                        <base-input alternative
                                    type="password"
                                    placeholder="Password"
                                    addon-left-icon="ni ni-lock-circle-open">
                        </base-input>
                        <base-checkbox>
                            Remember me
                        </base-checkbox>
                        <div class="text-center">
                            <base-button type="primary" class="my-4">Sign In</base-button>
                        </div>
                    </form>
                </template>
            </card>
        </modal>
</div>
    
</template>

<script>
export default {

    data() {
        return {        
            modals: {
                modal0: false,
                modal1: false,
                modal2: false,
                modal3: false
                }
        }
    }
}
</script>