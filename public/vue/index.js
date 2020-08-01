// import Vue from 'vue';

// import App from './vue/App';
//
// Vue.config.productionTip = false;
//
// /* eslint-disable no-new */
// new Vue({
//     el: '#app',
//     template: '<App/>',
//     components: {App}
// });
//
//
// 'use strict';
// var User = httpVueLoader('./js/user.vue')
// var Sidebar = httpVueLoader('./js/sidebar.vue')
// var UserList = httpVueLoader('./js/user-list.vue')
// var NamedWrapper = httpVueLoader('./js/named.vue')
//
//
// /* Router and App setup: */
// var routes = [
//     {
//         path: '/users',
//         name: 'userList',
//         component: UserList
//     },
//     {
//         path: '/named',
//         name: 'named',
//         component: NamedWrapper,
//         children: [{
//             path: 'user/:userId',
//             name: 'named_id',
//             components: {user_details: User, sidebar: Sidebar},
//             props: {user_details: true, sidebar: false}
//         }]
//     },
//     {
//         path: '/user/:userId',
//         name: 'user',
//         component: User,
//         props: true
//     }
// ];
//
// var router = new VueRouter({
//     routes: routes
// });

/* eslint-disable no-new */
new Vue({
    el: "#app",
    data: {
        "header": `<div style="font-size: 12pt; width: 100%; height: 30px;text-align: center;background-color: black; border-bottom: 1px solid black;margin: 0 1cm;\">人民医院门诊病历</div>`,
        "footer": `<div style=\"font-size: 6pt;text-align: right;width: 100%;height: 20px;border-top: 1px solid black;color:black;font-family: Arial,serif;margin: 0 1cm;\">第<span class=\"pageNumber\"></span>页 共<span class=\"totalPages\"></span>页 打印日期<span class=\"date\"></span></div>`,
        htmlFile: "",
        format: "A4",
        landscape: false,
        doPrint: false
    }
});

// new Vue({router: router})
//     .$mount('#app');
