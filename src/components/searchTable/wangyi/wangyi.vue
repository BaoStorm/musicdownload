<template>
  <paging-table :total="result.total" :pageSize="result.pageSize" :rows="result.rows" @currentChange="currentChange">
  </paging-table>
</template>
<script>
import pagingTable from '@/components/table/table.vue'

export default {
  data () {
    return {
      result: {
        rows: [],
        total: 0,
        pageSize: 20,
        pageIndex: 1
      },
      keyword: ''
    }
  },
  components: {
    pagingTable
  },
  methods: {
    currentChange (val) {
      // 分页
      this.result.pageIndex = val
      this.getSonglist()
    },
    search (keyword) {
      // 搜索
      this.keyword = keyword
      this.getSonglist()
    },
    getSonglist () {
      console.log(this.result.pageIndex)
      let self = this
      this.axios({
        method: 'post',
        url: 'search/pc',
        params: {
          s: this.keyword,
          offest: this.result.pageSize * (this.result.pageIndex - 1),
          limit: this.result.pageSize,
          type: 1
        },
        baseURL: process.env.WANGYYI_API,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
        self.result.total = response.data.result.songCount
        let rows = []
        response.data.result.songs.forEach((song) => {
          let row = {
            id: song.id,
            song: song.name,
            album: song.album.name,
            singer: song.artists[0].name,
            time: self.$baseAction.songTimeConver(song.duration)
          }
          rows.push(row)
        })
        self.result.rows = rows
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
