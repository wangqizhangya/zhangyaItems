var path=require('path');
//使每次打包后的js自动加入index.html中
var htmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
//	entry:'./src/script/main.js',
//	entry:['./src/script/main.js','./src/script/a.js'],
	entry:{
		main:'./src/script/main.js',
		a:'./src/script/a.js',
		b:'./src/script/b.js',
		c:'./src/script/c.js'
	},
	output:{
		path:path.join(__dirname,'dist'),
		//name就是多入口的键值
//		filename:'[name]-[hash].js',
//js/是添加的相对路径
		filename:'js/[name]-[chunkhash].js',
		//当项目上线的时候，如果js地址换了的话
		publicPath:'http://cdn.com/'
	},
	plugins:[
	//初始化插件,以根目录下的index.html为模板生成dist中的index.html
		new htmlWebpackPlugin({
			filename:'a.html',
			template:'index.html',
			//想把引用的js放在head标签还是body标签
			inject:'body',
			//这个title可以在index.html中直接引用<%= htmlWebpackPlugin.options.title %>;
			title:'this is a.html',
			date:new Date(),
			//对当前生成的html进行压缩
			minify:{
				//删除注释
				removeComments:true,
				//删除空格
				collapseWhitespace:true
				
			},
			//限制你想引用的chunks,entry的键值
			chunks:['main','a']
		}),
		new htmlWebpackPlugin({
			filename:'b.html',
			template:'index.html',
			//想把引用的js放在head标签还是body标签
			inject:'body',
			//这个title可以在index.html中直接引用<%= htmlWebpackPlugin.options.title %>;
			title:'this is b.html',
			chunks:['b']
			
		
		}),
		new htmlWebpackPlugin({
			filename:'c.html',
			template:'index.html',
			//想把引用的js放在head标签还是body标签
			inject:'body',
			//这个title可以在index.html中直接引用<%= htmlWebpackPlugin.options.title %>;
			title:'this is c.html',
			
			//排除一些chunks，其他都加载
			
			excludeChunks:['a']
			
		})
	]
	
}

