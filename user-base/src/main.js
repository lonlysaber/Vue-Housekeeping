import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import moment from 'moment'
import store from './store'

Vue.prototype.$moment = moment;
Vue.filter('datefmt',function (input,fmtstring) {//当input为时间戳时，需转为Number类型
    // 使用momentjs这个日期格式化类库实现日期的格式化功能
    return moment(input).format(fmtstring);
});
Vue.use(MpvueRouterPatch)
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})
