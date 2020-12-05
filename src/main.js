import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'

import { MdCard, MdField, MdButton } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdCard)
Vue.use(MdField)
Vue.use(MdButton)

Vue.use(Vuelidate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.config.productionTip = false