<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">搜索列表</el-menu-item>
    <el-menu-item index="2">我的</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    props: [
      'activeIndex'
    ],
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
