<template>
  <paging-table :total="result.total" :pageSize="result.pageSize" :rows="result.rows" @currentChange="currentChange" @downClick="downClick">
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
      let self = this
      const url = `qqsearch/fcgi-bin/music_search_new_platform?aggr=1&cr=1&loginUin=0&format=json&outCharset=utf-8&w=${this.keyword}&p=${this.result.pageIndex}&n=${this.result.pageSize}`
      this.axios.get(url)
      .then((response) => {
        self.result.total = response.data.data.song.totalnum
        let rows = []
        console.log(response.data.data.song)
        response.data.data.song.list.forEach((song) => {
          var spilts = song.f.split('|')
          console.log(spilts.length)
          let row = {
            id: spilts[0],
            song: song.fsong,
            album: spilts[5],
            singer: song.fsinger,
            time: self.$util.songTimeConver(spilts[7] * 1000),
            source_url: ''
          }
          rows.push(row)
        })
        self.result.rows = rows
      })
      .catch((error) => {
        console.log(error)
      })
    },
    downClick (row) {

    }
  }
}
</script>
