
import fs from 'fs'
import path from 'path'
import buildPath from '../utils/build-path'

export default new class Log {

  data(data) {
    data = Log.queryMsg(data)
    const timer = Log.getTimer()
    const content = `【${timer}】\r\n${data}\r\n`
    this.writeFile('data', content)
  }

  error(msg) {
    msg = Log.queryMsg(msg)
    const timer = Log.getTimer()
    const content = `【${timer}】\r\n${msg}\r\n`
    this.writeFile('error', content)
  }

  user(id, ip) {
    id = Log.queryMsg(id)
    ip = Log.queryMsg(ip)
    const timer = Log.getTimer()
    const content = `【${timer}】\r\n${ip} ${id}\r\n`
    this.writeFile('user', content)
  }

  static queryMsg(msg) {
    if (typeof msg === 'object') {
      try {
        msg = JSON.stringify(msg)
      } catch (error) {
        msg = `${error.message}\r\n${error.stack}`
      }
    }
    return msg
  }

  static getTimer() {
    const now = new Date()
    let h = now.getHours().toString()  //时
    let m = now.getMinutes().toString()  //分
    let s = now.getSeconds().toString()  //秒
    h = h.length < 2 ? 0 + h : h
    m = m.length < 2 ? 0 + m : m
    s = s.length < 2 ? 0 + s : s
    return `${h}:${m}:${s}`
  }

  static createFileName(dbpath) {
    const now = new Date()

    const y = now.getFullYear()
    const m = now.getMonth()
    const d = now.getDay()

    return path.join(dbpath, `${y}.${m}.${d}.log`)
  }

  writeFile(type, content) {
    const dbpath = buildPath(path.join(global.LOG_DIS, type))
    const fileName = Log.createFileName(dbpath)
    fs.appendFile(fileName, content, () => {})
  }
}
