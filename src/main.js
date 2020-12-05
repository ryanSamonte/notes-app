import Vue from 'vue'
import { MdCard, MdField, MdButton } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(MdCard)
Vue.use(MdField)
Vue.use(MdButton)

new Vue({
  render: h => h(App),
}).$mount('#app')
