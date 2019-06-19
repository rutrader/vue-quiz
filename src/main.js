import Vue from 'vue'
import BoostrapVue from 'bootstrap-vue'

import App from './App.vue'

Vue.use(BoostrapVue)

Vue.config.productionTip = false;

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'

new Vue({
  render: h => h(App),
}).$mount('#app')
