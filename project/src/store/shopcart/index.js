import { reqGetCartInfo,reqDeleteShopInfo,reqUpdataCheched } from "@/api"
const state = {
    getCartList :[]

}
const mutations = {
    GETCARTINFO(state,getCartList){
        state.getCartList = getCartList
    }

}
const actions = {
    async getCartInfo({commit}){
        let result = await reqGetCartInfo();
        if(result.code == 200){
            commit("GETCARTINFO",result.data)
        }

    },
    //此处不需要vuex 三连环，但需要判断成功没有
    async deleteCartInfo({commit},skuid){
        let result = await reqDeleteShopInfo(skuid)
        if(result.code == 200){
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //购物车产品切换勾选状态
    async updataChecked({commit},{skuid,isChecked}){
           let result =await reqUpdataCheched(skuid,isChecked)
           if(result.code == 200 ){
            return 'Ok'
           }else{
            return Promise.reject(new Error('faile'))
           }
    },
    //删除全选的商品
    deleteCartAll({dispatch,getters}){
        //comtext 仓库
        let promiseAll = []
        getters.getCartList.cartInfoList.forEach(item =>{
            let promise = item.isChecked == 1 ? dispatch("deleteCartInfo",item.skuId):'';
            promiseAll.push(promise);
        })
        return Promise.all(promiseAll)
        
    },
    //全选操作
    checkedCartAll({dispatch,state},isChecked){
        console.log(isChecked);
        console.log(state);
    }
}
const getters = {
    getCartList(state){
        return state.getCartList[0] || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}