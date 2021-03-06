import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// import store from './store'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/css/reset.css'
// import './assets/css/common.scss'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper /* { default global options } */)

new Vue({
  // router,
  // store,
  render: h => h(App)
}).$mount('#app')
