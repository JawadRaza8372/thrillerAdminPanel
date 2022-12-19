<template>
  <ul class="list-group list-group-flush list my--3">
    <li class="list-group-item px-0" v-for="user in users" :key="user.id">
      <div class="row align-items-center">
        <div class="col-auto">
          <!-- Avatar -->
          <a href="#" class="avatar rounded-circle">
            <img alt="Image placeholder" :src="user.img" />
          </a>
        </div>
        <div class="col ml--2">
          <h4 class="mb-0">
            <a href="#!">{{ user.name }}</a>
          </h4>
          <small>{{ user.status }}</small>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import { BaseProgress } from "@/components";

export default {
  name: "top-vendors",
  components: {
    BaseProgress,
  },
  data() {
    return {
      users: [
      
      ],
    };
  },
};
</script>
<style></style>
