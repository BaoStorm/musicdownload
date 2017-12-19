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
          <wangyi-table ref="wangyi">
          </wangyi-table>
        </el-tab-pane>
        <el-tab-pane label="QQ音乐" name="qq">
          <qq-table ref="qq">
          </qq-table>
        </el-tab-pane>
        <el-tab-pane label="百度音乐" name="baidu">
          <baidu-table ref="baidu">
          </baidu-table>
        </el-tab-pane>
        <el-tab-pane label="酷我音乐" name="kuwo">
          <kuwo-table ref="kuwo">
          </kuwo-table>
        </el-tab-pane>
        <el-tab-pane label="虾米音乐" name="xiami">
          <xiami-table ref="xiami">
          </xiami-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/header/head.vue'
import wangyiTable from '@/components/searchTable/wangyi/wangyi.vue'
import qqTable from '@/components/searchTable/qq/qq.vue'
import baiduTable from '@/components/searchTable/baidu/baidu.vue'
import kuwoTable from '@/components/searchTable/kuwo/kuwo.vue'
import xiamiTable from '@/components/searchTable/xiami/xiami.vue'

export default {
  data () {
    return {
      keyword: '',
      activeName: 'qq'
    }
  },
  components: {
    headTop,
    wangyiTable,
    qqTable,
    baiduTable,
    kuwoTable,
    xiamiTable
  },
  methods: {
    onSubmit () {
      this.$refs.wangyi.search(this.keyword)
      this.$refs.qq.search(this.keyword)
      this.$refs.baidu.search(this.keyword)
      this.$refs.kuwo.search(this.keyword)
      this.$refs.xiami.search(this.keyword)
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

</style>




