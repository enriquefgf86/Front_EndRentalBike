import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import UserView from '../views/UserView.vue'
import UserRentView from '../views/UserRentView.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  ,
  {
    path: '/profile',
    name: 'UserView',
    component: UserView
  },
  {
    path: '/profile/rent/:idSelected',
    name: 'UserRentView',
    component: UserRentView,
    props:true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
