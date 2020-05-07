import Vue from 'vue'
import App from './App.vue'
import store from './store'
import formatDate from './utils/filters'
import clickOutside from './utils/click-outside'

Vue.filter('formatDate', formatDate)
Vue.directive('click-outside', clickOutside)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
