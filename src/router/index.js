import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import guru from '../views/guruPage.vue'

import login from '../views/login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/guru',
    component: guru
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
