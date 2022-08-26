<template>
  <div class="pagination">
    <!-- //上 -->
    <button :disabled="pageNO == 1" @click="$emit('getPage', pageNO - 1)">
      上一页
    </button>
    <button
      v-if="pageStartAndpageEnd.start > 1"
      @click="$emit('getPage', 1)"
      :class="{ active: pageNO == 1 }"
    >
      1
    </button>
    <button v-if="pageStartAndpageEnd.start > 2">.....</button>
    <!-- //中 -->
    <button
      v-show="page >= pageStartAndpageEnd.start"
      v-for="(page, index) in pageStartAndpageEnd.end"
      :key="index"
      @click="$emit('getPage', page)"
      :class="{active:pageNO==page}"
    >
      {{ page }}
    </button>
    <!-- //下 -->
    <button v-if="pageStartAndpageEnd.end < totalPage - 1">...</button>
    <button
      v-if="pageStartAndpageEnd.end < totalPage"
      @click="$emit('getPage', totalPage)"
      :class="{active:pageNO==totalPage}"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNO == totalPage"
      @click="$emit('getPage', pageNO + 1)"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNO", "pageSize", "total", "continues"],
  computed: {
    //总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //分页器连续的起始位置和结束位置
    pageStartAndpageEnd() {
      let start = 0;
      let end = 0;
      //错误情况
      if (this.totalPage < this.continues) {
        start = 1;
        //end = 5错误
        end = this.totalPage;
      } else {
        start = this.pageNO - parseInt(this.continues / 2);
        end = this.pageNO + parseInt(this.continues / 2);
      }
      //头部部分
      if (start < 1) {
        start = 1;
        end = 5;
      }
      //尾部部分
      if (end > this.totalPage) {
        start = this.totalPage - this.continues + 1;
        end = this.totalPage;
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
    .active {
      background-color: #409eff;
    }
  }
}
</style>