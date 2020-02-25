import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import x from '../views/x.vue'
import i from '../views/i.vue'
import j from '../views/j.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/x',
    name: 'x',
    component: x
  },
  {
    path: '/i',
    name: 'i',
    component: i
  },
  {
    path: '/j',
    name: 'j',
    component: j
  }
]

const router = new VueRouter({
  routes
})

export default router
