<template>
  <div class="home">
    <div class="intro">
      <h3>Due to some issues concerning the voting system for the Mr. and Ms. Vetmed People's choice award, the organizers decided to create a <b>NEW ONE</b> which is more systematic and fair. Previous photos of the contestants have been deleted. It is the decision of the organizers and it is final.</h3>
    </div>
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
