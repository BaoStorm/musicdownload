'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  WANGYYI_API: '"wangyi/"',
  QQ_SEARCH: '"qqsearch/"',
  QQ_BASE: '"qqbase/"',
  BAIDU_SEARCH: '"baidusearch/"',
  BAIDU_SONG: '"baidusong/"',
  KUWO_SEARCH:'"kuwosearch/"',
  KUWO_SONG:'"kuwosong/"'
})
