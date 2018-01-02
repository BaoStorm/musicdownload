export default {
  // 方法 对state数据进行统一操作
  addMusic (state, music) {
    console.log(music)
    state.playlist.push(music)
    state.playInfo = music
  }
}
