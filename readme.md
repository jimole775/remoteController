### 国际惯例，先安装环境

[NodeJS](https://nodejs.org)

[Git](http://www.git-scm.com/downloads)(非必需，但推荐)

### 接下来，下载各种依赖包

（由于已经提前把包打好，而且数据量较小，没有部署数据库，单纯要运行的话，可以跳过这一步）

下面的依赖库可以单独下载，当然，如果网络带宽不错，或者已经注册cnpm镜像，可以直接运行

```bash
$ npm install
```

否则，就老老实实的一个个下载：

* webpack
```bash
$ npm install webpack --save-dev
```

* jade，要使用jade，必须要安装一个express，虽然本项目并未使用到express的任何API
```bash
$ npm install express jade --save-dev
```

* babel，ES6,7的主要承载工具
```bash
$ npm install babel-loader babel-core babel-preset-es2015 babel-polyfill --save-dev
```

* css，因为sass依赖于node-sass，所以一并下载
```bash
$ npm install css-loader style-loader sass-loader node-sass --save-dev
```

* file，主要用于处理图片的加载
```bash
$ npm install image-webpack-loader url-loader file-loader --save-dev
```

### 启动项目

所有依赖安装完毕之后，就可以使用 webpack 命令进行打包

编译打包成功后，在根目录运行以下指令，以开启项目

```bash
$ npm run start
```

之后打开地址 1xxx 就能正常访问了

另外，除了Chrome，其他浏览器均未测试，使用时，请有心理准备！


