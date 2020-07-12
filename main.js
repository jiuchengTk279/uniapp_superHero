import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 生产环境
Vue.prototype.serverUrl = "https://www.imovietrailer.com/superhero";
// 开发环境
// Vue.prototype.serverUrl = "https://www.imovietrailer-dev.com/superhero";		

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
