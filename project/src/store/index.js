import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
// //state仓库存储数据的地方
// const state ={

// }

// //mutations 修state的唯一手段
// const mutations = {

// }

// //action 书写业务逻辑，也可以处理异步
// const actions = {

// }

// //理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// const getters = {

// }
//引入小仓库
import home from './home';
import search from './search';
import shopcart from './shopcart';
//引入小仓库、
import detail from './detail';
import user from './user'
import trade from './trade';
export default new Vuex.Store({
        modules:{
            home,
            search,
            detail,
            shopcart,
            user,
            trade
        }
})
