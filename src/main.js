import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import bikeTag from './components/BikeCard.vue'
import userViewTag from './components/UserProfile.vue'
import welcomeViewTag from './components/noUserPage.vue'

Vue.config.productionTip = false
Vue.component('BikeCard',bikeTag);
Vue.component('UserProfile',userViewTag);
Vue.component('noUserPage',welcomeViewTag);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created(){
    store.dispatch('fetchAllBikesJson');
  }
}).$mount('#app')
