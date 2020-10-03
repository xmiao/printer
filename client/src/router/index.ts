import Vue from 'vue';
import VueRouter from 'vue-router';
import * as config from './config.json';

Vue.use(VueRouter);

const {routeList}: any = config;
const modules: any = {
    about: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    home: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    print: () => import(/* webpackChunkName: "print" */ '../components/Print.vue')
};

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routeList
        .map(({path, name, module}: any) => {
            return {
                path, name,
                component: modules[module]
            };
        })
});

export default router;
