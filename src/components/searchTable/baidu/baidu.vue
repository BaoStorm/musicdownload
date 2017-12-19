<template>
  <paging-table :total="result.total" :pageSize="result.pageSize" :rows="result.rows" @currentChange="currentChange" @downClick="downClick" ref="pt">
  </paging-table>
</template>
<script>
import pagingTable from '@/components/table/table.vue'
import $ from 'jquery'

export default {
  data () {
    return {
      result: {
        rows: [],
        total: 0,
        pageSize: 30,
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
      let rows = []
      const url = `${process.env.BAIDU_SEARCH}app/search/searchList.php?qword=${this.keyword}&ie=utf-8&page=${this.result.pageIndex}`
      this.axios.get(url)
      .then((response) => {
        let html = $(response.data)
        let tds = $(html).find('td[class="sName linkTitle linkMV linkCT"] div a')
        let count = $(html).find('div[class="position"] span').text().slice(`搜索“${this.keyword}”,找到相关歌曲`.length, -'首'.length)
        self.result.total = parseInt(count)
        $.each(tds, (i, n) => {
          var songHtml = $(n).attr('onclick').slice("playSong('".length, -')'.length)
          var spilts = songHtml.split("','")
          let row = {
            id: spilts[0],
            song: spilts[2],
            album: $($(html).find('td[class="aName"]')[i + 1]).text(),
            singer: spilts[1],
            time: '',
            source_url: `http://music.baidu.com/song/${spilts[0]}`
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
      const url = `${process.env.BAIDU_SONG}data/music/links?songIds=${row.id}`
      this.axios.get(url)
      .then((response) => {
        if (response.data.data.songList.length > 0) {
          // console.log(response.data.data.songList[0].songLink)
          self.$util.downloadFile('', response.data.data.songList[0].songLink)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
