<template>
  <el-card class="box-card">
    <div class="playContainer">
      <audio class="video" @canplay="canplay" :src="playUrl" ref="player" ></audio>
      <el-col :span="4">
        <i class="iconfont icon-shangyishou"></i>
        <i class="iconfont icon-zanting"></i>
        <i class="iconfont icon-bofang"></i>
        <i class="iconfont icon-xiayishou"></i>
      </el-col>
      <el-col :span="1">
        <!-- 头像-->
        <div class="picDiv">

        </div>
      </el-col>
      <el-col :span="12">
        <el-slider v-model="volume"></el-slider>
      </el-col>
      <el-col :span="1">
        <i class="iconfont icon-shengyin"></i>
      </el-col>
      <el-col :span="2">
        <i class="iconfont icon-bofangjilu"></i>
      </el-col>
    </div>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      volume: 100
    }
  },
  methods: {
    canplay (v) {
      console.log('歌曲缓存加载好了')
      this.$refs['player'].play()
    }
  },
  computed: {
    playUrl () {
      console.log(this.$store.state.playInfo)
      return this.$store.state.playInfo.url
    }
  }
}
</script>

<style scoped>
  .playContainer{
    background-color: rgb(246,246,248);
    border: 1px solid rgb(225,225,226);
    left:50%;
    bottom: 0%;
    height: 65px;
  }

  .playContainer i {
    font-size: 28px;
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
