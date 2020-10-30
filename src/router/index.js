import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'
import Home from '../views/Home'
import User from '../views/User'
import About from '../views/About'
import Charts from '../views/Charts'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User
  },
  {
    path: '/charts',
    name: 'Charts',
    component: Charts
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
