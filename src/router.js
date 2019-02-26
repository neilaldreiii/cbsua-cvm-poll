import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import MrVetMed from "./views/MrVetMedPoll.vue";
import MsVetMed from "./views/MsVetMedPoll.vue";
import Privacy from "./views/Privacy.vue";
import Terms from "./views/Terms.vue";
import Done from "./views/VoteDone.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/mrvetmedpoll",
      name: "mrvetmed",
      component: MrVetMed
    },
    {
      path:"/privacy",
      name: "privacy",
      component: Privacy
    },
    {
      path: "/terms",
      name: "terms",
      component: Terms
    },
    {
      path: "/msvetmedpoll",
      name: "msvetmed",
      component: MsVetMed,
    },
    {
      path: "/done",
      name: "done",
      component: Done
    }
  ],
  mode: "history"
});
