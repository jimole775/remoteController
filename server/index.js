/**
 * Created by Andy on 2017/12/2.
 */
import path from 'path'
import WebSocketServer from './socket/main.js'
import HTTPServer from './http/main.js'

global.ROOT_DIS = path.resolve(__dirname, '../')
global.SOURCES_DIS = path.resolve(__dirname, '../client/dist')
global.SERVER_DIS = path.resolve(__dirname)
global.DB_DIS = path.resolve(__dirname, '../database/json')
global.LOG_DIS = path.resolve(__dirname, '../database/log')

const http = new HTTPServer()
http.open(global.env.HTTPPORT)

const socket = new WebSocketServer()
socket.open(global.env.WSPORT)

console.log(global.CLIENT_DIS)
console.log(global.SERVER_DIS)
console.log(global.ROOT_DIS)
console.log(global.DB_DIS)
console.log(global.LOG_DIS)
console.log(global.env)
