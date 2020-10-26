import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import Paginate from 'vuejs-paginate'
// import 'materialize-css/dist/css/materialize.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.component('paginate', Paginate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
