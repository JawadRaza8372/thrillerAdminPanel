<template>
  <ul class="list-group list-group-flush" data-toggle="checklist">
    <li class="list-group-item px-0" v-for="item in items" :key="item.title">
      <div
        class="checklist-item"
        :class="{
          'checklist-item-checked': item.done,
          [`checklist-item-${item.checkType}`]: item.checkType,
        }"
      >
        <div class="checklist-info">
          <h5 class="checklist-title mb-0">{{ item.title }}</h5>
          <small>{{ item.description }}</small>
        </div>
        <div>
          <base-checkbox v-model="item.done" :type="item.checkType" />
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Ship order # 64321",
          description: "10:30 AM",
          done: true,
          checkType: "success",
        },
        {
          title: "Prepare order # 82302",
          description: "Pickup at 10:30 AM",
          done: false,
          checkType: "warning",
        },
        {
          title: "Ship order # 64321",
          description: "10:30 AM",
          done: false,
          checkType: "info",
        },
        {
          title: "Prepare order # 82302",
          description: "Pickup at 10:30 AM",
          done: true,
          checkType: "danger",
        },
      ],
    };
  },
};
</script>
