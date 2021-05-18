const globalEnv = {
  HOST: 'www.rongxis.com',
  HTTPPORT: 8080,
  WSPORT: 8081
}
const configmixins = {
  devtool: 'none',
  mode: 'production'
}
module.exports = {
  env: globalEnv,
  mixins: configmixins
}