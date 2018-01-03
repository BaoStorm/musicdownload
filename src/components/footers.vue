<template>
  <el-card class="box-card">
    <div class="playContainer">
      <audio class="video"
        @canplay="canplay" 
        @ended="ended" 
        @error="errorLoad" :src="playInfo.url" ref="player" ></audio>
      <el-col :span="4" style="margin-top:16px;margin-left:10px">
        <i class="iconfont icon-shangyishou"></i>
        <i class="iconfont icon-zanting" style="font-size: 40px;" v-if="isPlay" @click="pauseMusic"></i>
        <i class="iconfont icon-bofang" style="font-size: 40px;" v-if="!isPlay" @click="playMusic"></i>
        <i class="iconfont icon-xiayishou"></i>
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
        <i class="iconfont icon-suijibofang"></i>
      </el-col>
      <el-col :span="1" style="margin-top:16px;margin-left:10px">
        <i class="iconfont icon-shengyin"></i>
      </el-col>
      <el-col :span="1" style="margin-top:16px;margin-left:10px">
        <i class="iconfont icon-bofangjilu"></i>
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
      update: ''
    }
  },
  methods: {
    canplay (v) {
      console.log('歌曲缓存加载好了')
      const duration = this.$refs.player.duration
      this.end = Vue.options.filters.timeToStr(duration)
      this.setting.max = Number.parseInt(duration, 10)
      this.playMusic()
    },
    getCurrent: function () {
      const currentTime = this.$refs.player.currentTime
      this.current = Vue.options.filters.timeToStr(currentTime)
      this.progress = Number.parseInt(currentTime, 10)
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
      this.isPlay = false
    },
    errorLoad () {

    }
  },
  computed: {
    playUrl () {
      return this.$store.state.playInfo.url
    },
    playInfo () {
      console.log(this.$store.state.playInfo)
      return this.$store.state.playInfo
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
</style>
