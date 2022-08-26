<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updataChecked(cart,$event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="hander('reduce', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="hander('input', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="hander('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deleteCartInfo(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isTrue" @change="checkedCartAll"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCatrAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ cartInfoList.length }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    // this.getDate();
    // this.$store.dispatch("getCartInfo")
    this.getData();
  },
  methods: {
    //将派发请求写为方法
    getData() {
      this.$store.dispatch("getCartInfo");
    },
    //使用节流,防止用户点击过快
    hander:throttle(async function(type,number,cart){
           //type 区别类型
      //number 1代表+ -1代表- input代表input的值
      //cartId识别是谁
      switch (type) {
        case "reduce":
          //判断cart.skuNum是否大于1
          number = cart.skuNum > 1 ? -1 : 0;
          break;
        case "add":
          number = 1;
          break;
        
        case "input":
          //判断number用户输入的值的非法字符
          if(isNaN(number) || number < 0){
            number = 0
          }else{
            number = parseInt(number) - cart.skuNum
          }
          break;
      }
      try {
        await this.$store.dispatch("getShopInfo", {
          skuid: cart.skuId,
          skuNum: number,
        });
        this.getData();
      } catch (error) {}
    },500),
    //删除购物车
    async deleteCartInfo(cart){
        try {
          //成工了，派发新请求获取数据进行展示
         await this.$store.dispatch("deleteCartInfo",cart.skuId);
          this.getData();
        } catch (error) {
          alert(error.messege)
        }
    },
    //更改购物车选中状态
    async updataChecked(cart,event){
     try {
      let isChecked =  event.target.checked ? '1': '0';
      console.log(isChecked);
      await this.$store.dispatch('updataChecked',{skuid:cart.skuId,isChecked})
      this.getData()
     } catch (error) {
      alert(error.messege)
     }
        
    },
    //删除全选的商品
    async deleteCatrAll(){
      try {
        await this.$store.dispatch("deleteCartAll");
        this.getData()
      } catch (error) {
        alert(error.message);
      }
    },
    //全选与全不选
    checkedCartAll(event){
      let isChecked = event.target.checked?"1":"0";
      this.$store.dispatch("checkedCartAll",isChecked)
    }
  },
  computed: {
    ...mapGetters(["getCartList"]),
    cartInfoList() {
      return this.getCartList.cartInfoList || [];
    },
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((e) => {
        sum = sum + e.cartPrice * e.skuNum;
      });
      return sum;
    },
    isTrue() {
      let result = this.cartInfoList.every((item) => item.isChecked == 1);
      return result;
    },
  },
};
</script>
<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>