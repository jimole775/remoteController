const globalEnv = {
  HOST: 'localhost',
  HTTPPORT: 8080,
  WSPORT: 8081
}
const configmixins = {
  devtool: 'eval-cheap-module-source-map',
  mode: 'development'
}
module.exports = {
  env: globalEnv,
  mixins: configmixins
}