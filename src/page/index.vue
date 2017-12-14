<template>
  <div class="container">
    <head-top activeIndex="1"></head-top>
    <div class="line"></div>
    <div class="search">
      <el-row :gutter="24">
        <el-col :span="20">
          <el-input type="text" v-model="keyword" auto-complete="off"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-col>
      </el-row>
    </div> 
    <div class="line"></div>
    <div class="result">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="网易云音乐" name="wangyi">
          <search-table>
          </search-table>
        </el-tab-pane>
        <el-tab-pane label="QQ音乐" name="qq">QQ音乐</el-tab-pane>
        <el-tab-pane label="百度音乐" name="baidu">百度音乐</el-tab-pane>
        <el-tab-pane label="酷我音乐" name="kuwo">酷我音乐</el-tab-pane>
        <el-tab-pane label="虾米音乐" name="xiami">虾米音乐</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/header/head.vue'
import searchTable from '@/components/table/table.vue'

export default {
  data () {
    return {
      keyword: '',
      activeName: 'wangyi'
    }
  },
  components: {
    headTop,
    searchTable
  },
  methods: {
    onSubmit () {
      console.log(this.keyword)
    },
    tabClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style>

  .container{
    width: 1000px;
    margin: 0 auto;

  }

  .line {
    height: 1px;
    margin: 10px -14px;
  }

  .search {

  }
</style>




