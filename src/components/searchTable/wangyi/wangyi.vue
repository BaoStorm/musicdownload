<template>
  <paging-table :total="result.total" :pageSize="result.pageSize" :rows="result.rows" @currentChange="currentChange" @downClick="downClick">
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
      this.keyword = keyword
      this.getSonglist()
    },
    getHeaders () {
      const headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Referer': 'http://music.163.com',
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
        self.result.total = response.data.result.songCount
        let rows = []
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
        self.result.rows = rows
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    downClick (row) {
      console.log(Encrypt)
      const data = {
        ids: [row.id],
        br: 999000,
        csrf_token: ''
      }
      const cryptoreq = Encrypt(data)
      console.log(cryptoreq)
    }
  }
}
</script>
