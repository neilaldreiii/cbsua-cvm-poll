<template>
    <div class="home">
      <div class="rules">
        <h1>Rules</h1>
        <ul>
          <li>
            Voters must connect to facebook before proceeding.
          </li>
          <li>
            Voters will get four(4) Maximum total votes. Two(2) for Mr. VetMed candidates and Two(2) for Ms. VetMed Candidates.
          </li>
          <li>
            Voters cannot vote for the same candidate twice.
          </li>
          <li>
            Voters cannot vote if their total votes reaches zero(0).
          </li>
          <li>
            Mr. and Ms. VetMed poll will end on <b>February 28, 2019 @12pm</b>
          </li>
        </ul>
        <div class="controls">
          <router-link to="/mrvetmedpoll">Accept rules and start voting</router-link>
        </div>
      </div>
    </div>
</template>

<script>
import Poll from "@/components/AppPoll.vue";

export default {
  name: "home",
  components: {
    "app-poll": Poll,
  }
};
</script>
