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
      let rows = []
      const url = `${process.env.XIAMI_SEARCH}search/song/page/${this.result.pageIndex}?key=${this.keyword}`
      this.axios.get(url)
      .then((response) => {
        let html = $(response.data)
        let count = $(html).find('div[class="search_result"] p[class="seek_counts ok"] b:first').text()
        self.result.total = parseInt(count)
        let tds = $(html).find('table[class="track_list"] tbody tr')
        $.each(tds, (i, n) => {
          let row = {
            id: $(n).find('td[class="chkbox"] input').val(),
            song: $(n).find('td[class="song_name"] a:first').text(),
            album: $(n).find('td[class="song_album"] a:first').text(),
            singer: $(n).find('td[class="song_artist"] a:first').text(),
            time: '',
            source_url: $(n).find('td[class="song_name"] a:first').attr('href')
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
      const url = `${process.env.XIAMI_SEARCH}song/playlist/id/${row.id}/object_name/default/object_id/0/cat/json`
      this.axios.get(url, {
        headers: {
          Referer: 'http://m.xiami.com/'
        }
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
