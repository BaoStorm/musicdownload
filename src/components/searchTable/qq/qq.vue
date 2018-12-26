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
      const url = `${process.env.QQ_SEARCH}fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&aggr=1&cr=1&loginUin=0&format=json&outCharset=utf-8&w=${this.keyword}&p=${this.result.pageIndex}&n=${this.result.pageSize}`
      this.axios.get(url)
      .then((response) => {
        self.result.total = response.data.data.song.totalnum
        let rows = []
        response.data.data.song.list.forEach((song) => {
          let row = {
            id: song.mid,
            song: song.name,
            album: song.album.name,
            singer: song.singer[0].name,
            time: self.$util.songTimeConver(song.interval * 1000),
            source_url: `https://y.qq.com/n/yqq/song/${song.songmid}.html`
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
      .then((res) => {
        if (res.data.req_0.code === 0) {
          let data = res.data.req_0.data
          let musicUrl = `${data.sip[0]}${data.midurlinfo[0].purl}`
          self.$util.downloadFile(row.song + '.m4a', musicUrl)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    playClick (row) {
      this.getMusicUrl(row)
      .then((res) => {
        if (res.data.req_0.code === 0) {
          let data = res.data.req_0.data
          row.url = `${data.sip[0]}${data.midurlinfo[0].purl}`
          this.$store.commit('addMusic', row)
        }
      })
    },
    getMusicUrl (row) {
      const data = `%7b%22req%22%3a%7b%22module%22%3a%22CDN.SrfCdnDispatchServer%22%2c%22method%22%3a%22GetCdnDispatch%22%2c%22param%22%3a%7b%22guid%22%3a%221%22%2c%22calltype%22%3a0%2c%22userip%22%3a%22%22%7d%7d%2c%22req_0%22%3a%7b%22module%22%3a%22vkey.GetVkeyServer%22%2c%22method%22%3a%22CgiGetVkey%22%2c%22param%22%3a%7b%22guid%22%3a%221%22%2c%22songmid%22%3a%5b%22${row.id}%22%5d%2c%22songtype%22%3a%5b0%5d%2c%22uin%22%3a%220%22%2c%22loginflag%22%3a1%2c%22platform%22%3a%2220%22%7d%7d%2c%22comm%22%3a%7b%22uin%22%3a0%2c%22format%22%3a%22json%22%2c%22ct%22%3a20%2c%22cv%22%3a0%7d%7d`
      const url = `${process.env.QQ_BASE}cgi-bin/musicu.fcg?format=json&inCharset=utf8&outCharset=utf-8&data=${data}`
      return this.axios.get(url)
    }
  }
}
</script>
