/**
*主要入口文件，引入其他四个js
*/
import Vue from 'vue'
import Vuex from 'vuex'

// 引入actions、mutations、getters
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

Vue.use(Vuex)

// 定义状态state
const state = {
  /**
   * 播放列表
   */
  playlist: [],
  playInfo: {
    url: ''
  },
  status: 0
}

// 设置暴露接口
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
