<template>
  <el-card class="box-card">
    <div class="playContainer">
      <audio class="video"
        @canplay="canplay" 
        @ended="ended" 
        @error="errorLoad" :src="playInfo.url" ref="player" ></audio>
      <el-col :span="4" style="margin-top:16px;margin-left:10px">
        <i class="iconfont icon-shangyishou" @click="prev"></i>
        <i class="iconfont icon-zanting" style="font-size: 40px;" v-if="isPlay" @click="pauseMusic"></i>
        <i class="iconfont icon-bofang" style="font-size: 40px;" v-if="!isPlay" @click="playMusic"></i>
        <i class="iconfont icon-xiayishou" @click="next"></i>
      </el-col>
      <el-col :span="1">
        <!-- 头像-->
        <div class="picDiv" >

        </div>
      </el-col>
      <el-col :span="13" style="margin-left:35px;margin-top:10px;margin-right:5px">
        <div>
          <span style="font-size:12px;color:#999;margin-bottom:-5px;line-height:14px;float:left">{{playInfo.song}}<span style="color:#333；margin-left:5px;padding-left:10px">{{playInfo.singer}}</span></span>
        </div>
        <span style="float:right;color:#999;font-size:12px">{{current}}/<span style="color:#333">{{end}}</span></span>
        <div style="clear:both"></div>
        <el-slider v-model="progress" :min="setting.min" :max="setting.max"></el-slider>
      </el-col>
      <el-col :span="1" style="margin-top:16px;margin-left:35px">
        <i class="iconfont icon-liebiaoxunhuan" v-if="playType===10" @click="switchPlayType"></i>
        <i class="iconfont icon-danquxunhuan" v-if="playType===20" @click="switchPlayType"></i>
        <i class="iconfont icon-suijibofang" v-if="playType===30" @click="switchPlayType"></i>
      </el-col>
      <el-col :span="1" style="margin-top:16px;margin-left:10px">
        <el-popover
          ref="popover1"
          placement="top"
          width="200"
          trigger="click">
          <el-slider @change="changeVolume" v-model="volume"></el-slider>
        </el-popover>
        <i class="iconfont icon-shengyin" v-popover:popover1></i>
      </el-col>
      <el-col :span="1" style="margin-top:16px;margin-left:10px">
        <el-popover
        ref="popoverTable"
        placement="top"
        width="300"
        trigger="click"
        popper-class="popper-table">
        <el-table :data="playlist" size="mini" @row-click="rowClick">
          <el-table-column width="150" property="song" label="歌曲"></el-table-column>
          <el-table-column  property="singer" label="歌手"></el-table-column>
        </el-table>
      </el-popover>
        <i class="iconfont icon-bofangjilu" v-popover:popoverTable></i>
      </el-col>
    </div>
  </el-card>
</template>
<script>
import Vue from 'vue'

export default {
  data () {
    return {
      volume: 100,
      isPlay: false,
      current: '00:00',
      end: '99:99',
      progress: 0,
      setting: {
        min: 0,
        max: 999
      },
      update: '',
      /** @augments 播放模式 0 顺序播放 10 列表循环 20 单曲循环 30 随机播放 */
      playType: 10
    }
  },
  methods: {
    canplay (v) {
      const duration = this.$refs.player.duration
      this.end = Vue.options.filters.timeToStr(duration)
      this.setting.max = Number.parseInt(duration, 10)
      this.playMusic()
    },
    getCurrent: function () {
      if (this.$refs.player !== undefined) {
        const currentTime = this.$refs.player.currentTime
        this.current = Vue.options.filters.timeToStr(currentTime)
        this.progress = Number.parseInt(currentTime, 10)
      }
    },
    pauseMusic () {
      clearInterval(this.update)
      this.isPlay = false
      this.$refs['player'].pause()
    },
    playMusic () {
      this.update = setInterval(this.getCurrent, 1000 / 60)
      this.$refs.player.play()
      this.isPlay = true
    },
    ended () {
      clearInterval(this.update)
      this.progress = 0
      // this.isPlay = false
      this.autoMusic()
    },
    errorLoad () {
      this.$message.error('歌曲加载错误')
    },
    next () {
      this.$store.commit('switchMusicByIndex', this.switchMusic('next'))
    },
    prev () {
      this.$store.commit('switchMusicByIndex', this.switchMusic('prev'))
    },
    switchMusic (direction) {
      let index = this.playlist.indexOf(this.playInfo)
      switch (this.playType) {
        case 0:
        case 10:
        case 20: {
          if (direction === 'next') {
            if (index >= this.playlist.length - 1) {
              index = -1
            }
            index++
          } else {
            if (index === 0) {
              index = this.playlist.length
            }
            index--
          }
          break
        }
        case 30: {
          // 随机播放
          let min = 0
          let max = this.playlist.length - 1
          let Range = max - min
          let Rand = Math.random()
          index = (min + Math.round(Rand * Range))
          break
        }
      }
      return index
    },
    autoMusic () {
      let index = this.playlist.indexOf(this.playInfo)
      switch (this.playType) {
        case 0: {
          // 顺序播放 播放完就不播放了
          if (index < this.playlist.length - 1) {
            index++
          }
          break
        }
        case 10: {
          // 列表循环
          if (index >= this.playlist.length - 1) {
            index = -1
          }
          index++
          this.$store.commit('switchMusicByIndex', index)
          break
        }
        case 20 : {
          // 单曲循环
          this.playMusic()
          break
        }
        case 30: {
          // 随机播放
          let newIndex = this.getRoundNum(0, this.playlist.length - 1)
          while (newIndex === index) {
            newIndex = this.getRoundNum(0, this.playlist.length - 1)
          }
          this.$store.commit('switchMusicByIndex', index)
          break
        }
      }
    },
    switchPlayType () {
      if (this.playType === 10) {
        this.playType = 20
      } else if (this.playType === 20) {
        this.playType = 30
      } else {
        this.playType = 10
      }
    },
    getRoundNum (min, max) {
      let Range = max - min
      let Rand = Math.random()
      return (min + Math.round(Rand * Range))
    },
    changeVolume (value) {
      let volume = 0
      if (value > 0) {
        volume = value / 100.0
      }
      this.$refs.player.volume = volume
    },
    rowClick (row, event, column) {
      this.$store.commit('switchMusic', row)
    }
  },
  computed: {
    playUrl () {
      clearInterval(this.update)
      return this.$store.state.playInfo.url
    },
    playInfo () {
      return this.$store.state.playInfo
    },
    playlist () {
      return this.$store.state.playlist
    }
  }
}
</script>

<style scoped>
  .playContainer{
    /* border: 1px solid rgb(225,225,226); */
    left:50%;
    bottom: 0%;
    height: 65px;
  }

  .playContainer i {
    font-size: 28px;
    color:#409EFF
  }

  .picDiv {
    width: 50px;
    height: 50px;
    margin: 5px;
    border: 1px solid rgb(225, 225, 226)
  }

  .video {
    display: none;
  }

  .popper-table{
    height: 500px;
    overflow:hidden;
  }
</style>

<style>
  .popper-table{
    max-height: 500px;
    overflow:auto;
  }
</style>

