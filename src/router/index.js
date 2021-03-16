import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import(/* webpackChunkName: "contact" */ "../views/Contact.vue")
  },
  {
    path: "/404",
    name: "error-404",
    component: () => import(/* webpackChunkName: "404" */ "../views/404.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
