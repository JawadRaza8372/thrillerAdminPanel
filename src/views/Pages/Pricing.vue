<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Choose the best plan for your institute</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="pricing card-group flex-column flex-md-row mb-3">
            <card header-classes="bg-transparent"
                  body-classes="px-lg-7"
                  class="card-pricing border-0 text-center mb-4">
              <h4 slot="header" class="text-uppercase ls-1 text-primary py-3 mb-0">Basic pack</h4>

              <div class="display-2">Rs.30</div>
              <span class="text-muted">per user</span>
              <ul class="list-unstyled my-4">
                <li>
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="icon icon-xs icon-shape bg-gradient-primary shadow rounded-circle text-white">
                        <i class="fas fa-terminal"></i>
                      </div>
                    </div>
                    <div>
                      <span class="pl-2">Web ERP</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="icon icon-xs icon-shape bg-gradient-primary shadow rounded-circle text-white">
                        <i class="fas fa-pen-fancy"></i>
                      </div>
                    </div>
                    <div>
                      <span class="pl-2">Long Term Support</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="icon icon-xs icon-shape bg-gradient-primary shadow rounded-circle text-white">
                        <i class="fas fa-hdd"></i>
                      </div>
                    </div>
                    <div>
                      <span class="pl-2">10GB cloud storage</span>
                    </div>
                  </div>
                </li>
              </ul>

                <a href="https://wa.me/923122828038" class="btn btn-default my-2">Get Demo</a>

            

              <a slot="footer" href="https://wa.me/923122828038" class="text-light">Request a demo</a>
            </card>

            <card gradient="info"
                  class="card-pricing zoom-in shadow-lg rounded border-0 text-center mb-4"
                  header-classes="bg-transparent"
                  body-classes="px-lg-7"
                  footer-classes="bg-transparent"
            >
              <h4 slot="header" class="text-uppercase ls-1 text-white py-3 mb-0">Professional pack</h4>

              <div class="display-1 text-white">Rs.50</div>
              <span class="text-white">per user</span>
              <ul class="list-unstyled my-4">
                <li>
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="icon icon-xs icon-shape bg-white shadow rounded-circle text-muted">
                        <i class="fas fa-terminal"></i>
                      </div>
                    </div>
                    <div>
                      <span class="pl-2 text-white">Parent App</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="icon icon-xs icon-shape bg-white shadow rounded-circle text-muted">
                        <i class="fas fa-pen-fancy"></i>
                      </div>
                    </div>
                    <div>
                      <span class="pl-2 text-white">Teachers App</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="icon icon-xs icon-shape bg-white shadow rounded-circle text-muted">
                        <i class="fas fa-hdd"></i>
                      </div>
                    </div>
                    <div>
                      <span class="pl-2 text-white">Unlimited storage</span>
                    </div>
                  </div>
                </li>
              </ul>

                <a href="https://wa.me/923122828038" class="btn btn-secondary my-2">Get Demo</a>

              <a slot="footer" href="https://wa.me/923122828038" class="text-white">Contact sales</a>
            </card>
          </div>
        </div>
      </div>
      <div hidden class="d-flex justify-content-lg-center px-3 mt-5">
        <div>
          <div hidden class="icon icon-shape bg-gradient-white shadow rounded-circle text-primary">
            <i  hidden class="ni ni-building text-primary"></i>
          </div>
        </div>
        <div hidden class="col-lg-6">
          <p class="text-white"><strong>Packed</strong> with the most essential features!</p>
        </div>
      </div>
      <div class="row row-grid justify-content-center">
        <div class="col-lg-10">
          <div class="table-responsive">
            <base-table class="table table-dark mt-5"
                        :data="features">
              <template slot="columns">
                <th class="px-0 bg-transparent" scope="col">
                  <span class="text-light font-weight-700">Features</span>
                </th>
                <th class="text-center bg-transparent" scope="col">Basic</th>
                <th class="text-center bg-transparent" scope="col">Professional</th>
              </template>

              <template slot-scope="{row}">
                <td class="px-0">{{row.title}}</td>
                <td class="text-center" v-html="row.bravo"></td>
                <td class="text-center" v-html="row.alpha"></td>
              </template>

            </base-table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import BaseTable from '@/components/BaseTable';
  export default {
    name: 'pricing-page',
    components: {
      BaseTable
    },
    data() {
      return {
        features: [
          {
            title: 'Fee Managament',
            bravo: '<i class="fas fa-check text-success"></i>',
            alpha: '<i class="fas fa-check text-success"></i>'
          },
          {
            title: 'Accounts Management',
            bravo: '<i class="fas fa-check text-success"></i>',
            alpha: '<i class="fas fa-check text-success"></i>'
          },
          {
            title: 'Unlimited Push Notifications',
            bravo: '<i class="fas fa-check text-success"></i>',
            alpha: '<i class="fas fa-check text-success"></i>'
          },
          {
            title: 'Live Classes',
            bravo: '-',
            alpha: '<span class="text-sm text-light">Limited to 1 cocurrent session</span>'
          },
          {
            title: 'Parents App',
            bravo: '-',
            alpha: '<i class="fas fa-check text-success">'
          },
          {
            title: 'Teachers App',
            bravo: '-',
            alpha: '<i class="fas fa-check text-success"></i>'
          },         
          {
            title: 'Custom Branding',
            bravo: '-',
            alpha: '<span class="text-sm text-light">Available</span>',
          },
          {
            title: 'WhatApp Integration',
            bravo: '-',
            alpha: '<i class="fas fa-check text-success"></i>',
          },
           {
            title: 'Storage',
            bravo: '<span class="text-sm text-light">10 GB</span>',
            alpha: '<span class="text-sm text-light">Unlimited</span>'
          },
          
        ]
      }
    }
  };
</script>
<style></style>
