import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import Toasted from 'vue-toasted';
import firebase from 'firebase';
import './firebaseInit';

import { MdCard, MdField, MdButton, MdApp, MdDrawer, MdToolbar, MdList, MdContent, MdDialog, MdDialogConfirm, MdEmptyState } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdCard)
Vue.use(MdField)
Vue.use(MdButton)
Vue.use(MdApp)
Vue.use(MdDrawer)
Vue.use(MdToolbar)
Vue.use(MdList)
Vue.use(MdContent)
Vue.use(MdDialog)
Vue.use(MdDialogConfirm)
Vue.use(MdEmptyState)

Vue.use(Vuelidate)

Vue.use(Toasted)

Vue.config.productionTip = false

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})