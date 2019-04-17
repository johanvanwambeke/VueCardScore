import Vue from 'vue'
import VueResource from 'vue-resource';
import './plugins/vuetify'
import App from './App.vue'
import  {store} from './store/store';
import { reduce, whatever, groupby } from "lodash";

Vue.config.productionTip = false;
Vue.use(VueResource);
// Vue.http.interceptors.push((request, next)=>{
//   console.log(request);
//   // request.headers.set('Access-Control-Allow-Origin', '*');
//   next();
// });

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
