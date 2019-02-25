<template>
  <div id="app" v-if="!closed">
    <app-signin></app-signin>
    <router-view/>
    <div class="description">
      <ul>
        <li style="list-style: none;">
          <h1>Rules</h1>
        </li>
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