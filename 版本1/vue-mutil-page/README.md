# atsk

> A Vue.js project

快速开始：
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 因入口很多，如果报  JavaScript heap out of memory JavaScript堆内存不足，则在/node_modules/.bin/webpack-dev-server.cmd 中，直接在 node 后面写上 --max_old_space_size=8192，具体的大小可以根据自项目来设置，然后再重新运行 npm run dev/build 就可以正常运行和打包了

前言：本项目原是由 webpack+vue-cli 搭建的单页面项目，通过添加多个入口文件，改造成多页面项目，同时也可以实现单页面的效果。为了使得在web端，单页面通过路由共享侧边栏、头部等，多页面通过页面跳转，实现不需要导航栏和侧边栏的页面的功能的分离。


参考：https://www.jianshu.com/p/0a30aca71b16
环境搭建：
	1.安装Vue-cli并且进行初始化
		执行：cnpm i vue-cli -g
		然后初始化一个Vue项目模板:	vue init 模板名 项目文件夹名称  ，执行：vue init webpack vue-multi-page

		![image](https://github.com/zwy942652315/vue-multi-page/blob/master/src/assets/images/1.png)

		配置好后按下回车就构建完成了Vue脚手架

		进入项目：cd project
		执行： npm run dev

		此时的脚手架的配置都是针对单页面应用进行的，入口只有一个index.html，所以下一步就要对项目目录的结构进行一些调整
	2.调整项目
		主要对src目录进行调整
			新建一个文件夹views，用于存放页面文件，然后在views里面新建一个文件夹index用于存放首页，分别新建index.js、index.html、index.vue
			新建一个文件夹modules，用于存放页面模块
		
		├── project

		│ ├── build

		│ ├── config

		│ ├── package.json

		│ ├── src
			|——index
			  |——index.js
			  |——index.html
			  |——index.vue

		│ │ ├── components   存放组件文件

		│ │ ├── modules  存放页面模块

		│ │ └── views

		│ └── static
		  ├── README.md

	3.修改相应的配置文件

		3.1 在build目录下的util.js中添加两个函数

			// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件

			var glob = require('glob')

			    // 页面模板

			var HtmlWebpackPlugin = require('html-webpack-plugin')

			// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹

			var PAGE_PATH = path.resolve(__dirname, '../src/pages')

			    // 用于做相应的merge处理

			var merge = require('webpack-merge')



			//多入口配置

			// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在

			// 那么就作为入口处理

			exports.entries = function() {

			    var entryFiles = glob.sync(PAGE_PATH + '/*/*.js')

			    var map = {}

			    entryFiles.forEach((filePath) => {

			        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))

			        map[filename] = filePath

			    })

			    return map

			}



			//多页面输出配置

			// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中

			exports.htmlPlugin = function() {

			    let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')

			    return entryHtml.map((filePath) => {

			        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))

			        let conf = {

			            // 模板来源

			            template: filePath,

			            // 文件名称

			            filename: filename + '.html',

			            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本

			            chunks: ['manifest', 'vendor', filename],

			            inject: true

			        }

			        if (process.env.NODE_ENV === 'production') {

			            conf = merge(conf, {

			                minify: {

			                    removeComments: true,

			                    collapseWhitespace: true,

			                    removeAttributeQuotes: true

			                },

			                chunksSortMode: 'dependency'

			            })

			        }

			        return new HtmlWebpackPlugin(conf)

			    })

			}

		3.2	修改build/webpack.base.conf.js的入口配置

			module.exports = {

			  context: path.resolve(__dirname, '../'),

			  // entry: {
			  //   app: './src/main.js'
			  // },
			  entry: utils.entries(),

			  ...

			  ...

			}

		3.3	修改build/webpack.dev.conf.js（开发环境）和build/webpack.prod.conf.js（生产环境）的多页面配置

			开发环境build/webpack.dev.conf.js
				找到该段并且注释掉，然后在后面添加.concat(utils.htmlPlugin())
				![image](https://github.com/zwy942652315/vue-multi-page/blob/master/src/assets/images/2.png)

			生产环境webpack.prod.conf.js

				注释掉这段，并且在后面添加.concat(utils.htmlPlugin())
				![image](https://github.com/zwy942652315/vue-multi-page/blob/master/src/assets/images/3.png)

		3.4 修改config/index.js
		
			为了使得编译后的文件路径正确
			![image](https://github.com/zwy942652315/vue-multi-page/blob/master/src/assets/images/2.png)

	4.对页面应用配置已基本完成，进行测试

