<template>
  <div id="app">
    <app-signin></app-signin>
    <router-view />
  </div>
</template>

<script>

require("@/assets/css/default.css");
require("@/assets/css/main.css");


import SignIn from "@/components/SignIn";

export default {
  name: "app",
  components: {
    "app-signin": SignIn
  }
}
</script>
