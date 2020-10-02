import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import * as config from './config.json';

Vue.use(VueRouter);

const {routeList}: any = config;
const modules: any = {
    about: import(/* webpackChunkName: "about" */ '../views/About.vue'),
    home: import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    print: import(/* webpackChunkName: "print" */ '../components/Print.vue')
};

const routes: Array<RouteConfig> = routeList
    .map(({path, name, module}: any) => {
        return {
            path, name,
            component: () => modules[module]
        };
    });

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
