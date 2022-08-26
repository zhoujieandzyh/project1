import Mock from 'mockjs'
//引入mock
import banner from './banner.json'
import floor from './floor.json'
//引入两个json

//mock数据：第一个参数请求地址，第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner})//模拟首页轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floor})//模拟电器