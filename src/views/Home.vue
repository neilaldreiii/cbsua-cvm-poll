<template>
  <div class="home">
    <app-poll></app-poll>
  </div>
</template>

<script>
import Poll from "@/components/AppPoll.vue";

export default {
  name: "home",
  components: {
    "app-poll": Poll
  }
};
</script>
