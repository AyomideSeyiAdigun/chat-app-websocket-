import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Chat from '../components/chatpage.vue'
import User from '../components/userpage.vue'
import Chatpage from '../components/sendDm.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/chat/users',
    name: 'User',
    component: User
  },
  {
    path: '/chat/:id',
    name: 'Chatpage',
    component: Chatpage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
