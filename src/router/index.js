import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignUpView from '@/views/SignUpView.vue'
import ComposeNoteView from '@/views/ComposeNoteView.vue'
import SoundBoardView from '@/views/SoundBoardView.vue'
import FeedView from '@/views/FeedView.vue'
import DiscoverView from '@/views/DiscoverView.vue'
import { useAuthStore } from '@/stores/authStore'

const requireAuth = (to, from, next) => {
  const authStore = useAuthStore()
  if (!authStore.isLoggedIn) {
    next({ name: 'home' })
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/post-note',
      name: 'postNote',
      component: ComposeNoteView,
      beforeEnter: requireAuth
    },
    {
      path: '/soundboard/:userName',
      name: 'soundboard',
      component: SoundBoardView
    },
    {
      path: '/feed',
      name: 'feed',
      component: FeedView
    },
    {
      path: '/discover',
      name: 'discover',
      component: DiscoverView
    }
  ],
  linkActiveClass: 'border-b-2 border-orange-600'
})

export default router
