<template>
  <paging-table :total="result.total" :pageSize="result.pageSize" :rows="result.rows" @currentChange="currentChange" @downClick="downClick" @playClick="playClick" ref="pt">
  </paging-table>
</template>
<script>
import pagingTable from '@/components/table/table.vue'
const Encrypt = require('@/util/crypto.js')

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
    getHeaders () {
      const headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
        'Content-Type': 'application/x-www-form-urlencoded'
        // referer: 'http://music.163.com'
        // 'Host': 'music.163.com',
        // 'User-Agent': this.$util.randomUserAgent()
      }
      return headers
    },
    getSonglist () {
      let self = this
      this.axios({
        method: 'post',
        url: 'api/search/get',
        params: {
          s: this.keyword,
          offset: this.result.pageSize * (this.result.pageIndex - 1),
          limit: this.result.pageSize,
          type: 1
        },
        baseURL: process.env.WANGYYI_API,
        headers: this.getHeaders()
      })
      .then(function (response) {
        let rows = []
        if (response.data.code === 200) {
          self.result.total = response.data.result.songCount
          response.data.result.songs.forEach((song) => {
            let row = {
              id: song.id,
              song: song.name,
              album: song.album.name,
              singer: song.artists[0].name,
              time: self.$util.songTimeConver(song.duration),
              source_url: 'http://music.163.com/#/song?id=' + song.id
            }
            rows.push(row)
          })
        }
        console.log(rows)
        self.result.rows = rows
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    downClick (row) {
      let self = this
      this.getMusicUrl(row)
      .then(function (response) {
        if (response.data.code === 200) {
          if (response.data.data.length > 0) {
            // console.log(row.song + '.' + response.data.data[0].type)
            // console.log(response.data.data[0].url)
            self.$util.downloadFile(row.song + '.' + response.data.data[0].type, response.data.data[0].url)
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    playClick (row) {
      this.getMusicUrl(row)
      .then((res) => {
        if (res.data.code === 200) {
          row.url = res.data.data[0].url
          this.$store.commit('addMusic', row)
        }
      })
    },
    getMusicUrl (row) {
      const br = 999000
      const data = {
        ids: [row.id.toString()],
        br: br,
        csrf_token: ''
      }
      const cryptoreq = Encrypt(data)
      return this.axios({
        method: 'post',
        url: 'weapi/song/enhance/player/url?csrf_token=',
        params: cryptoreq,
        baseURL: process.env.WANGYYI_API,
        headers: this.getHeaders()
      })
    }

  }
}
</script>
