<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="song" label="歌名" width="300">
    </el-table-column>
    <el-table-column prop="singer" label="歌手" width="200">
    </el-table-column>
    <el-table-column prop="album" label="专辑" width="300">
    </el-table-column>
    <el-table-column prop="time" label="时间" width="100">
    </el-table-column>
    <el-table-column  label="操作" >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">跳转</el-button>
        <el-button type="text" size="small">下载</el-button>
      </template>
    </el-table-column>
  </el-table>  
</template>
<script>
export default {
  methods: {
    handleClick (row) {
      console.log(row)
    }
  },
  data () {
    return {
      tableData: [{
        song: '告白气球',
        singer: '周杰伦',
        album: '周杰伦的床边故事',
        time: '03:35'
      }, {
        song: '开不了口',
        singer: '周杰伦',
        album: '范特西',
        time: '04:44'
      }, {
        song: '晴天',
        singer: '周杰伦',
        album: '叶惠美',
        time: '04:29'
      }, {
        song: '算什么男人',
        singer: '周杰伦',
        album: '哎呦，不错哦',
        time: '04:49'
      }, {
        song: '稻香',
        singer: '周杰伦',
        album: '摩羯座',
        time: '03:43'
      }]
    }
  }
}
</script>
