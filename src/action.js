const songTimeConver = (time) => {
  let t = (time - time % 1000) / 1000
  let s = t % 60
  let m = (t - s) / 60
  let str = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
  return str
}

export default {
  songTimeConver
}
