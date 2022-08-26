import { reqGetGoodsInfo ,reqGetShopInfo} from "@/api"
import {getUuid} from '@/utils/Uuid.js'
//封装游客模块
const state = {
    getGoodsList :{},
    //游客的uuid
    good_uuid:getUuid()

}
const mutations = {
    GETGOODSINFO(state,getGoodsList){
        state.getGoodsList = getGoodsList
    },
}
const actions = {
      async getGoodsInfo({commit},kiuid){
           let result = await reqGetGoodsInfo(kiuid)
           if(result.code == 200){
               commit('GETGOODSINFO',result.data)
           }
        },
        async getShopInfo({commit},{skuid,skuNum}){
            let result = await reqGetShopInfo(skuid,skuNum)
            if(result.code == 200){
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },

}
const getters = {
    //简化代码
    categoryView(state){
        return state.getGoodsList.categoryView || {}
    },
    skuInfo(state){
        return state.getGoodsList.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.getGoodsList.spuSaleAttrList || []
    }
}
export default {
    state,mutations,actions,getters
}