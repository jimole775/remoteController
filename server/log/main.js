
const fs = require("fs")
const path = require("path")
export default new class Log {

  data(data) {
    data = Log.queryMsg(data)
    const timer = Log.getTimer()
    const fileName = Log.createFileName("data")
    const content = `【${timer}】\r\n${data}\r\n`
    this.writeFile("data", fileName, content)
  }

  error(msg) {
    msg = Log.queryMsg(msg)
    const timer = Log.getTimer()
    const fileName = Log.createFileName("error")
    const content = `【${timer}】\r\n${msg}\r\n`
    this.writeFile("error", fileName, content)
  }

  user(id, ip) {
    id = Log.queryMsg(id)
    ip = Log.queryMsg(ip)
    const timer = Log.getTimer()
    const fileName = Log.createFileName("user")
    const content = `【${timer}】\r\n${ip} ${id}\r\n`
    this.writeFile("user", fileName, content)
  }

  static queryMsg(msg) {
    if (typeof msg === "object") {
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

  static createFileName(type) {
    const now = new Date()

    const y = now.getFullYear()
    const m = now.getMonth()
    const d = now.getDay()

    return path.resolve(__dirname.split("\\").join("/"), type, `${y}.${m}.${d}.log`)
  }

  writeFile(type, filePath, content) {
    const mkdir = new Promise(function (resolve, reject) {
      fs.readdir(path.join(__dirname, type), function (err, fileGroup) {
        if (fileGroup instanceof Array) resolve()
        else reject()
      })
    })

    mkdir
      .then(function () {
        fs.appendFile(filePath, content, "utf8")
      }, function () {
        fs.mkdir(path.join(__dirname, type), function () {
          fs.appendFile(filePath, content, "utf8")
        })
      })
  }
}
