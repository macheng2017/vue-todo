import Vue from "vue";
import App from './app.vue';
import './assets/images/bg.jpeg';
import './assets/styles/test.css';
import './assets/styles/test-stylus.styl'

// 入口文件 entry point
const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
    render:h => h(App)

}).$mount(root);