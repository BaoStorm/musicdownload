export default {
  // 方法 对state数据进行统一操作
  addMusic (state, music) {
    // 判断歌曲重复性 目前歌曲名匹配
    let index = -1
    state.playlist.forEach((n, i) => {
      if (n.song === music.song) {
        index = i
      }
    })
    if (index === -1) {
      state.playlist.push(music)
      state.playInfo = music
    } else {
      state.playInfo = state.playlist[index]
    }
  },
  switchMusicByIndex (state, index) {
    state.playInfo = state.playlist[index]
  },
  switchMusic (state, music) {
    state.playInfo = music
  }
}
