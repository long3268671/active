// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import searchToMap from './utils/searchToMap'
Vue.config.productionTip = false
Vue.prototype.$http = Axios;

const search = searchToMap() // object map;

if (location.search && search.tbkt_token) {
  localStorage.setItem('Tbkt-Token', search.tbkt_token);
}
Axios.interceptors.request.use(
  config => {
    let tbkt_token = localStorage.getItem("Tbkt-Token") || ''
    if(tbkt_token==""){
      router.push("/login")
    }
    if (tbkt_token) config.headers['Tbkt-Token'] = tbkt_token;

    return config
  },
  err => {
    return Promise.reject(err)
  }
)
Axios.interceptors.response.use(
  res => {
    let _data = res.data
    console.log(_data)
    if (_data.tbkt_token){
      localStorage.setItem('Tbkt-Token', _data.tbkt_token)
    }
    if (_data.error === 'no_user' && _data.response === 'fail') {
      layer.alert(_data.message,function(index){
        router.push('/login');
        layer.close(index);
      })
    }
    return res;
  }, err => {
    layer.tips(err)
  }
);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
