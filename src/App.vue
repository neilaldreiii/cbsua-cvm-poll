<template>
  <div id="app">
    <app-signin></app-signin>
    <router-view />
    <div class="description">
      <ul>
        <lh>
          <h4>Rules</h4>
        </lh>
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
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>

require("@/assets/css/default.css");
require("@/assets/css/main.css");


import SignIn from "@/components/SignIn";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "app",
  components: {
    "app-signin": SignIn,
    "app-footer": AppFooter
  }
}
</script>
