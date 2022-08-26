//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
//shi使用插件
Vue.use(VueRouter)

import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

//引入store
import store from '@/store'
//先把Vuerouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
let originreplace = VueRouter.prototype.replace;
//重写push
//第一个参数，k告诉原来的push方法，你往哪里跳转
//第二个参数，成功回调
//第三个参数，失败的回调
//call与aplly的区别
//都可以调用函数一次，都可以篡改函数上下文一次
//不同点：call传递参数用逗号隔开，aplle传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
//重写replace
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originreplace.call(this, location, resolve, reject);
    } else {
        originreplace.call(this, location, () => { }, () => { })
    }
}
let router = new VueRouter({
    routes: [
        {
            path: "/center",
            component: Center,
            meta: { show: true },
            children: [
                {
                    path: 'myorder',
                    component: MyOrder
                },
                {
                    path: 'grouporder',
                    component: GroupOrder,
                },
                //重定向,让他定向到myorder
                {
                    path: '/center',
                    redirect: "/center/myorder"
                }

            ]
        },
        {
            path: "/paysuccess",
            component: PaySuccess,
            meta: { show: true }
        },
        {
            path: "/pay",
            component: Pay,
            meta: { show: true }
        },
        {
            path: "/trade",
            component: Trade,
            meta: { show: true },
            //路由独享守卫
            //进入trade时，判断路由跳转是否是来自shopcart的结算
            beforeEnter: (to, from, next) => {
                if(from.path == '/shopcart'){
                    next()
                }else{
                    next(false)
                }

            }
        },
        {
            path: "/shopcart",

            component: ShopCart,
            meta: { show: true }
        },
        {
            path: "/addCartSuccess",
            name: 'addCartSuccess',
            component: AddCartSuccess,
            meta: { show: true }
        },
        {
            path: "/detail/:kiuid",
            component: Detail,
            meta: { show: true }
        },
        {
            path: "/home",
            component: Home,
            //添加路由元信息，隐藏footer组件
            meta: { show: true }
        },
        {
            path: "/search/:keyword?",
            name: 'search',
            component: Search,
            meta: { show: true }
        },
        {
            path: "/login",
            name: 'login',
            component: Login,
            meta: { show: false }
        }, {
            path: "/register",
            component: Register,
            meta: { show: false }
        },
        //重定向，在项目跑起来得时候，让他定向到首页
        {
            path: '*',
            redirect: "/home"
        }

    ],
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 }
    }
})
//全局守卫 前置守卫

router.beforeEach(async (to, from, next) => {
    //有token代表已经登录
    let token = store.state.user.token;
    //有name代表有用户信息
    let name = store.state.user.userInfo.name
    //用户已经登录了
    if (token) {
        //如果去的是login
        if (to.path == '/login') {
            next('/home');
        } else {
            //去的不是login，需判断有没有用户信息
            //如果有name
            if (name) {
                next();
            }
            //如果没有，派发请求获取用户信息，在放行
            else {
                try {
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    //token过期，清除用户信息
                    await store.dispatch('LoginOut');
                }
            }
        }
    }
    //未登录
    else {
        //未登录，不能去交易相关，支付相关,去了就跳转到登录页面
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1|| toPath.indexOf('/center')!=-1||toPath.indexOf('/pay')!=-1){
            next("/login?redirect="+toPath)
            
            //未登录时，查看自己的trade，跳转到登录后，登录完成再跳转到trade，而不是hoem

        }else{
            next()
        }
    }
})
export default router;