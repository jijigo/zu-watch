// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from '@/store/index';
import {in_stock} from '@/helper/filter';

import '../src/assets/sass/app.scss';
const _ = require('lodash');

// Vue.use(axios);
Vue.config.productionTip = false;   // ?
Vue.filter('in_stock', in_stock);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
