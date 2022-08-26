//当前模块，API进行统一管理
import requests from "./request";
import mockAjax from "./mockAjax"
//三级联动接口/api/product/getBaseCategoryList
export const reqCategoryList =()=>{
    //发请求
   return requests({url:'/product/getBaseCategoryList',method:'get'})
}

export const reqGetbannerList =()=>{
    return mockAjax('/banner')
}

//获取floor的数据
export const reqFloorList = ()=>{
    return mockAjax('/floor')
}
export const reqGetSearchInfo =(params)=>requests({ url:'/list',method:'post',data:params})

export const reqGetGoodsInfo = (skuid)=>requests({url:`/item/${skuid}`,method:'get'})

export const reqGetShopInfo = (skuid,skuNum)=>requests({url:`/cart/addToCart/${skuid}/${skuNum}`,method:'post'})

export const reqGetCartInfo = ()=>requests({url:'/cart/cartList',method:'get'})

//删除产品购物车接口
export const reqDeleteShopInfo = (skuid) =>requests({url:`/cart/deleteCart/${skuid}`,method:'delete'})

//切换产品勾选状态接口
export const reqUpdataCheched = (skuid,isChecked) =>requests({url:`/cart/checkCart/${skuid}/${isChecked}`,method:'get'})

//注册获取phone接口
export const reqGetPhone = (phone) =>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册验证信息，跳转到登录页面
export const reqRunLogin = (data) =>requests ({url:'/user/passport/register',method:'post',data})

//登录接口 /api/user/passport/login 请求方式 post
export const reqLogin =(data) =>requests({url:'/user/passport/login',data,method:'post'})

//获取用户登录信息
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录
export const reqLoginOut = () =>requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList get
export const reqUserAddress =()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取用户订单 /order/auth/trade
export const reqOrder =()=>requests({url:'/order/auth/trade',method:'get'})

//提交订单接口
export const reqOutOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取订单支付信息
///api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取支付信息 /api/payment/weixin/createNative/{orderId}
export const reqPayment  =(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取我的订单 /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page,limit) =>requests({url:`/order/auth/${page}/${limit}`,method:'get'})