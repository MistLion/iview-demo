import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
//import "iview/src/styles/index.less"
//import 'iview/dist/styles/iview.css';
import './my-theme/index.less'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(iView);
Vue.use(Vuex);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

const  vuex_store = new Vuex.Store({
    state:{
        location:"/"
    },
    mutations:{
        jump(state){
            router.push(state.location);
        }
    }
})

new Vue({
    el: '#app',
    router: router,
    store:vuex_store,
    render: h => h(App)
});
