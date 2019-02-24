import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Privacy from "./views/Privacy.vue";
import Terms from "./views/Terms.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
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
    }
  ],
  mode: "history"
});
