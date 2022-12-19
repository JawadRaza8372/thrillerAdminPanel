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
        <div class="col-auto">
          <base-button type="primary" size="sm">Accept</base-button>
        </div>
        <div class="col-auto">
          <base-button type="danger" size="sm">Decline</base-button>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import { BaseProgress } from "@/components";

export default {
  name: "user-list",
  components: {
    BaseProgress,
  },
  data() {
    return {
      users: [
        {
          id: 1,
          img:
            "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/triple-chocolate-peanut-butter-layer-cake-2-06eee24.jpg?quality=90&resize=500%2C454",
          name: "Express Cake",
          status: "123 street, Ajman states, UAE",
          statusType: "success",
        },
        {
          id: 2,
          img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs0_b9Byqcb9HWgfBuoxixlvxpHfZbCqJLDQ&usqp=CAU",
          name: "Express Cake",
          status: "123 street, Ajman states, UAE",
          statusType: "danger",
        },
        {
          id: 3,
          img:
            "https://hips.hearstapps.com/clv.h-cdn.co/assets/16/08/1456262739-cl-speckled-malted-coconut-cake.jpg?crop=0.950xw:0.634xh;0.0192xw,0.331xh&resize=640:*",
          name: "Express Cake",
          status: "123 street, Ajman states, UAE",
          statusType: "danger",
        },
        {
          id: 4,
          img:
            "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/triple-chocolate-peanut-butter-layer-cake-2-06eee24.jpg?quality=90&resize=500%2C454",
          name: "Express Cake",
          status: "123 street, Ajman states, UAE",
          statusType: "success",
        },
      ],
    };
  },
};
</script>
<style></style>
