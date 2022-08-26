import { reqUserAddress,reqOrder} from "@/api"
const state = {
    userAddressList :{},
    order:{}
}
const mutations = {
    GETUSERADDRESS(state,userAddressList){
        state.userAddressList = userAddressList
    },
    GETORDER(state,order)
    {
        state.order = order
    }
}
const actions = {
    //获取用户信息地址
    async getUserAddress({commit}){
       let resule = await reqUserAddress()
       if(resule.code == 200){
        commit("GETUSERADDRESS",resule.data)
       }
    },
    //获取用户订单信息
    async getOrder({commit}){
       let result =  await reqOrder();
       if(result.code == 200){
        commit("GETORDER",result.data)
       }
    }
}
const getters = {
    userAddressList(state){
        return state.userAddressList || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
