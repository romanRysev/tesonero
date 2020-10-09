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

    component: () => import("../views/AddBook.vue")
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
