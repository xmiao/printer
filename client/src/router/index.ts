import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes: any = [
    {
        "path": "/",
        "name": "Charting Definition",
        "component": () => import(/* webpackChunkName: "print" */ '../views/ChartingTableDefinition.vue')
    },
    {
        "path": "/print",
        "name": "Print",
        "component": () => import(/* webpackChunkName: "print" */ '../views/Print.vue')
    },
    {
        "path": "/about",
        "name": "About",
        "component": () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
export {routes};
