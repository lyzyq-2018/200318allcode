<template>
  <div class="pagination">
    <!--上一页按钮-->
    <button :disabled="currentPage===1" @click="changeCurrentPage(currentPage-1)">上一页</button>
    <!--第一页按钮-->
    <button @click="changeCurrentPage(1)">1</button>
    <!--第一个省略号按钮-->
    <button disabled>...</button>
    <!--连续页码按钮-->
    <button>连续页码</button>
    <!--第二个省略号按钮-->
    <button disabled>...</button>
    <!--最后一页按钮-->
    <button @click="changeCurrentPage(totalPages)">{{totalPages}}</button>
    <!--下一页按钮-->
    <button :disabled="currentPage===totalPages" @click="changeCurrentPage(currentPage+1)">下一页</button>
    <!--总条数按钮-->
    <button disabled>共{{pageConfig.total}}条</button>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    // 用来接收外部组件传入的数据
    pageConfig: {
      type: Object, // 对象
      // 外部传入进来的数据,默认应该是有值(不给我传这个数据,那么该数据也应该有个默认值)
      default: {
        // 设置当前内部的数据的默认值
        total: 0, // 总的数据条数
        showPageNo: 5, // 连续的页码数(将来连续显示几个按钮),一般情况该值都是奇数
        pageNo: 1, // 默认显示的是第几页的数据(初始页码值)
        pageSize: 3 // 默认每页显示多少条数据
      }
    }
  },
  // 状态数据对象
  data() {
    return {
      // 设计一个状态数据,用来存储当前的页码数
      currentPage: this.pageConfig.pageNo
    }
  },
  // 根据总的条数及每页的条数,求出总的页码数
  computed: {
    // 计算总的页码数
    totalPages() {
      // 获取总条数和每页的条数
      const { total, pageSize } = this.pageConfig
      // 判断总条数小于等于0或者每页显示的条数小于等于0,没有必要计算总的页码数
      if (total <= 0 || pageSize <= 0) return 0
      // 计算总的页码的
      // 总:13条数据,每页显示2条----->总页: 向上取整
      return Math.ceil(total / pageSize)
    }
  },
  methods: {
    // 点击按钮的回调函数,用来修改当前页码的
    changeCurrentPage(pageNo){
      this.currentPage = pageNo
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
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
  }
}
</style>