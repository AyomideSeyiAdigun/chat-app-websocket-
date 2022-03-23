import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Chat from '../components/chatpage.vue'
import User from '../components/userpage.vue'
import Chatpage from '../components/sendDm.vue'
import Registerpage from '../components/RegisterPage.vue'
import Recentchat from '../components/Recentpage.vue'
import Grouppage from '../components/Grouppage.vue'
import Groupchatpage from '../components/Groupchatpage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
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
  {
    path: '/register',
    name: 'Registerpage',
    component: Registerpage
  },
  {
    path: '/recent-chats',
    name: 'Recentchats',
    component: Recentchat
  },
  {
    path: '/groups',
    name: 'Grouppage',
    component:  Grouppage
  },
  {
    path: '/groups/:name',
    name: 'Groupchatpage',
    component:  Groupchatpage
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
