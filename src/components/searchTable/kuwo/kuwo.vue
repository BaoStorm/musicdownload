<template>
  <paging-table :total="result.total" :pageSize="result.pageSize" :rows="result.rows" @currentChange="currentChange" @downClick="downClick" ref="pt">
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
      this.result.pageIndex = 1
      this.$refs.pt.setCurrentPage(1)
      this.keyword = keyword
      this.getSonglist()
    },
    getSonglist () {
      let self = this
      const url = `${process.env.KUWO_SEARCH}r.s?all=${this.keyword}&ft=music&itemset=web_2013&client=kt&pn=${this.result.pageIndex - 1}&rn=${this.result.pageSize}&rformat=json&encoding=utf8`
      this.axios.get(url)
      .then((response) => {
        var data = JSON.parse(response.data.replace(/'/g, `"`).replace(/&nbsp;/g, ' '))
        self.result.total = data.total
        let rows = []
        data.abslist.forEach((song) => {
          let row = {
            id: song.MUSICRID,
            song: song.SONGNAME,
            album: song.ALBUM,
            singer: song.ARTIST,
            time: '',
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
      let self = this
      const url = `${process.env.KUWO_SONG}anti.s?type=convert_url&rid=${row.id}&format=aac|mp3&response=url`
      this.axios.get(url)
      .then((response) => {
        self.$util.downloadFile('', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
