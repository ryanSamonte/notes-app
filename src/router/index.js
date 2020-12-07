import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import PageContainer from '../components/PageContainer.vue'
import NotesCompleted from '../components/NotesCompleted.vue'
import NotesPending from '../components/NotesPending.vue'
import NotesAll from '../components/NotesAll.vue'
import firebase from 'firebase/app'
import "firebase/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/notes/all'
  },
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
    path: '/notes',
    name: 'PageContainer',
    component: PageContainer,
    children: [
      {
        path: 'all',
        component: NotesAll
      },
      {
        path: 'completed',
        component: NotesCompleted
      },
      {
        path: 'pending',
        component: NotesPending
      }
    ],
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
        path: '/notes/all',
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
