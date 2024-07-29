import { createRouter, createWebHistory } from 'vue-router'
import Profile from '../views/Profile.vue'
import Edit from '../views/Edit.vue'

const routes = [
  {
    path: '/',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
