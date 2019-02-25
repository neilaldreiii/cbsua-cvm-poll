<template>
  <div id="app" v-if="!closed" class="container">
    <app-signin></app-signin>
    <router-view/>
    <app-footer class="app-footer"></app-footer>
  </div>
</template>

<script>

require("@/assets/css/default.css");
require("@/assets/css/main.css");

import firebase from 'firebase';

import SignIn from "@/components/SignIn";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "app",
  data() {
    return {
      closed: false,
      user: [],
    }
  },
  components: {
    "app-signin": SignIn,
    "app-footer": AppFooter
  },
  beforeCreate() {

    //get user data and pass to router as a prop
    firebase.auth().onAuthStateChanged(user => {
      
      if(user) {
        this.user = user;
      }
      else {
        console.log("Disconnected");
      }

    })
    
  },
  created() {

    this.isDeadLine();

  },
  methods: {
    
    isDeadLine() {

      let today = new Date();
      let deadline = new Date("Feb 28, 2019 12:00:00");

      if(deadline <= today) {

        this.closed = true;

      } else {

        this.closed = false;

      }
    }

  }
}
</script>
