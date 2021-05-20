const globalEnv = {
  HOST: 'localhost',
  HTTPPORT: 8080,
  WSPORT: 8081
}
const configmixins = {
  devtool: 'eval-source-map',
  mode: 'development'
}
module.exports = {
  env: globalEnv,
  mixins: configmixins
}