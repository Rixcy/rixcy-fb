import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/dash'
    },
    {
      name: 'dash',
      path: '/dash',
      component: () => import('@/views/Dash'),
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'posts',
      path: '/posts',
      component: () => import('@/views/Posts'),
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'users',
      path: '/users',
      component: () => import('@/views/Users'),
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/Login')
    },
    {
      name: 'settings',
      path: '/settings',
      component: () => import('@/views/Settings'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
