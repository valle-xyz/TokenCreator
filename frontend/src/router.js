import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

Vue.use(Router);

export default new Router({
  // Make sure the server can handle the history mode
  // If not, set it to hash (or delete the mode)
  // More info here: https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
  ],
  linkActiveClass: "active",
});
