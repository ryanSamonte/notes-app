import Vue from 'vue'

import App from './App.vue'

import { MdCard, MdField, MdButton } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdCard)
Vue.use(MdField)
Vue.use(MdButton)

import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.config.productionTip = false
