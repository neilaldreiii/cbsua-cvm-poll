<template>
  <div id="app">
    <app-signin></app-signin>
    <router-view />
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
