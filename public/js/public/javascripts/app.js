"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
const vue_1 = __importDefault(require("vue"));
const element_ui_1 = __importDefault(require("element-ui"));
require("element-ui/lib/theme-chalk/index.css");
const App_vue_1 = __importDefault(require("./App.vue"));
// import router from './router'
vue_1.default.use(element_ui_1.default);
vue_1.default.config.productionTip = false;
/* eslint-disable no-new */
new vue_1.default({
    el: '#app',
    components: { App: App_vue_1.default },
    template: '<App/>',
    render: h => h(App_vue_1.default)
});
//# sourceMappingURL=app.js.map