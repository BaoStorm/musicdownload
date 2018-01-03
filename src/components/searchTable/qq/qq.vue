<template>
  <paging-table :total="result.total" :pageSize="result.pageSize" :rows="result.rows" @currentChange="currentChange" @downClick="downClick" @playClick="playClick" ref="pt">
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
      const url = `${process.env.QQ_SEARCH}fcgi-bin/music_search_new_platform?aggr=1&cr=1&loginUin=0&format=json&outCharset=utf-8&w=${this.keyword}&p=${this.result.pageIndex}&n=${this.result.pageSize}`
      this.axios.get(url)
      .then((response) => {
        self.result.total = response.data.data.song.totalnum
        let rows = []
        response.data.data.song.list.forEach((song) => {
          var spilts = song.f.split('|')
          let row = {
            id: spilts[spilts.length - 5],
            song: song.fsong,
            album: spilts[5],
            singer: song.fsinger,
            time: self.$util.songTimeConver(spilts[7] * 1000),
            source_url: `https://y.qq.com/n/yqq/song/${spilts[spilts.length - 5]}.html`
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
      this.getMusicUrl(row)
      .then((response) => {
        let data = response.data.slice('jsonCallback('.length, -');'.length)
        data = JSON.parse(data)
        let musicUrl = `http://dl.stream.qqmusic.qq.com/C200${row.id}.m4a?vkey=${data.key}&fromtag=0&guid=0`
        // console.log(row.song + '.m4a')
        // console.log(musicUrl)
        self.$util.downloadFile(row.song + '.m4a', musicUrl)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    playClick (row) {
      this.getMusicUrl(row)
      .then((res) => {
        let data = res.data.slice('jsonCallback('.length, -');'.length)
        data = JSON.parse(data)
        row.url = `http://dl.stream.qqmusic.qq.com/C200${row.id}.m4a?vkey=${data.key}&fromtag=0&guid=0`
        this.$store.commit('addMusic', row)
      })
    },
    getMusicUrl (row) {
      const url = `${process.env.QQ_BASE}fcgi-bin/fcg_musicexpress.fcg?json=3&guid=0&format=jsonp&inCharset=GB2312&outCharset=GB2312&notice=0&platform=yqq&needNewCode=0`
      return this.axios.get(url)
    }
  }
}
</script>
