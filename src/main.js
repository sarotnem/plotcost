import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import '@/assets/scss/blk-design-system.scss'
import '@/assets/css/nucleo-icons.css'

window.$ = require('jquery')
window.JQuery = require('jquery')

Vue.config.productionTip = false

// Vue.use(BootstrapVue)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
