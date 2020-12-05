import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import Home from '../components/Home.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Route Guard
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!firebase.auth().currentUser){
      next({
        path: '/sign-in',
        query: {
          redirect: to.fullPath
        }
      });
    }else{
      next();
    }
  }else if(to.matched.some(record => record.meta.requiresGuest)){
    if(firebase.auth().currentUser){
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }else{
      next();
    }
  }else{
    next();
  }
});

export default router
