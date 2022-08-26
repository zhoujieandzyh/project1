<template>
  <div>
    <MyHeader></MyHeader>
    <router-view></router-view>
    <MyFooter v-show="$route.meta.show"></MyFooter>
  </div>
</template>
<script>
import MyHeader from './components/Header/MyHeader.vue'
import MyFooter from './components/Footer/MyFooter.vue'
export default {
  name: 'App',
  components:{MyHeader,MyFooter},
  mounted() {
    //派发一个行为，获取商品分类的三级列表
    this.$store.dispatch("categoryList");
  },
}
</script>

<style>

</style>
