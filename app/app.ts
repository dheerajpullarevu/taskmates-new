import Vue from 'nativescript-vue';
import Home from './components/Home.vue';
import store from './store';

// Uncomment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({
  store,
  render: (h) => h('frame', [h(Home)]),
}).$start();