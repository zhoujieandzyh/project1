import { reqGetPhone,reqRunLogin,reqLogin,reqUserInfo,reqLoginOut} from "@/api";
const state = {
    phone : {},
    token :localStorage.getItem("TOKEN"),
    userInfo : {}
}
const mutations = {
    GETPHONE(state,phone){
        state.phone = phone
    },
    GRTLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    CLEAR(state){
        state.token = '',
        state.userInfo= {},
        localStorage.removeItem("TOKEN")
        
    }
}
const actions = {
    //验证码
    async getphone({commit},phone){
         let result =  await reqGetPhone(phone)
         
         if(result.code == 200){
            commit("GETPHONE",result.data)
            return 'ok'
         }else{
            return Promise.reject(new Error('faile'))
         }
    },
    //注册
    async RunLogin({commit},data){
          let result = await reqRunLogin(data);
          if(result.code == 200){
            return 'ok'
          }else{
            return Promise.reject(new Error('faile'))
          }
    },
    //用户登录
    async getLogin({commit},data){
       let result =  await reqLogin(data);
       if(result.code == 200){
        commit("GRTLOGIN",result.data.token)
        localStorage.setItem("TOKEN",result.data.token)
        return 'ok'
       }else{
        return Promise.reject(new Error('faile'))
       }
    },
    //获取用户登录信息
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        //需要在home中加载完毕后，派发请求得到用户信息
        if(result.code == 200){
            commit("GETUSERINFO",result.data);
            return 'Ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async LoginOut({commit}){
       let result = await reqLoginOut();
       if(result.code == 200){
        commit("CLEAR")
        return 'ok'
       }else{
        return Promise.reject(new Error('faile'))
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