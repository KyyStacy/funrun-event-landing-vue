import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage.vue'),
    meta: { title: 'Reed Fitness Fun Run 2026' }
  },
  {
    path: '/daftar',
    name: 'register',
    component: () => import('../views/RegisterPage.vue'),
    meta: { title: 'Daftar - Reed Fitness Fun Run 2026' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to) => {
  document.title = to.meta.title || 'Reed Fitness Fun Run'
})

export default router
