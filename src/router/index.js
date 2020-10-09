import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import EditBook from "../views/EditBook.vue";
import PageNotFound from "../views/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/add-book",
    name: "AddBook",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AddBook.vue"),
  },
  {
    path: "/edit-book/:id",
    name: "EditBook",
    component: EditBook
  },
  {
    path: "/*",
    name: "404",
    component: PageNotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
