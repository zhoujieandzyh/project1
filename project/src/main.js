import Vue from 'vue'
import App from './App.vue'
//引入路有
import router from '@/router'
//三级联动组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)
//引入elment-ul
import { Button,MessageBox} from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.component(Button.name,Button);
Vue.config.productionTip = false
import {reqCategoryList} from '@/api';
reqCategoryList();
//引入仓库
import store from './store'
//引入mockjs模板
import '@/mock/mockSave'
//引入swiper
import 'swiper/css/swiper.css'

//测试接口
// import {reqGetSearchInfo} from '@/api'
// console.log(reqGetSearchInfo({}));
import atm from '@/assets/1.jpg'
//引入全部的接口文件API
import *as API from '@/api'
//注册全局组件pagination
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

// //引入图片懒加载
// import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload,{
//   loding:atm
// })
new Vue({
  render: h => h(App),
  //注册路由，组件身上都拥有￥route，￥router
  router,
  //注册仓库，组件身上都拥有￥store
  store,
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
    Vue.prototype.$API  = API;
  },
  
}).$mount('#app')
