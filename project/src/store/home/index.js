//引入
import {reqCategoryList,reqGetbannerList,reqFloorList} from '@/api'
//home小仓库
const state = {
    categoryList :[],
    getBannerList:[],
    getFloorList:[],
}
const mutations =  {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GERBANNERLIST(state,getBannerList){
        state.getBannerList = getBannerList
    },
    //修改数据
    GETFLOORLIST(state,getFloorList){
        state.getFloorList = getFloorList
    }
}
const actions = {
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code == 200){
            commit("CATEGORYLIST",result.data)
        }

    },
    async getBannerList({commit}){
        let res = await reqGetbannerList()  
        if(res.code == 200){
            commit("GERBANNERLIST",res.data)
        }
        
    },
    async getFloorList({commit}){
        let result = await reqFloorList()
        if(result.code == 200){
            commit("GETFLOORLIST",result.data)
        }
    }


}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}