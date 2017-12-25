<template>
  <div>
    <el-table :data="rows" border style="width: 100%" size="small">
      <el-table-column label="歌名" width="300">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.song}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="singer" label="歌手" width="200">
      </el-table-column>
      <el-table-column prop="album" label="专辑" width="300">
      </el-table-column>
      <el-table-column prop="time" label="时间" width="100">
      </el-table-column>
      <el-table-column  label="操作" >
        <template slot-scope="scope">
          <el-button @click="playClick(scope.row)" type="text" size="small">播放</el-button>
          <el-button @click="downClick(scope.row)" type="text" size="small">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
        v-show="rows.length>0">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick (row) {
      window.open(row.source_url)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.$emit('currentChange', val)
    },
    downClick (row) {
      this.$emit('downClick', row)
    },
    playClick (row) {
      this.$emit('playClick', row)
    },
    setCurrentPage (val) {
      this.currentPage = val
    }
  },
  props: {
    rows: {
      type: Array,
      default: []
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentPage: 1
    }
  }
}
</script>
<style scoped>
  .pagination{
    text-align: center;
    margin-top: 15px;
  }
</style>

