var path=require('path');
var webpack=require('webpack');
var htmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
	entry:{
		main:'./src/app.js'
		
	},
	output:{
		path:path.join(__dirname,'dist'),
		filename:'js/[name].bundle.js'
	},
	module:{
		 rules : [
            {
                test : /\.js$/,
                loader : 'babel-loader',
                exclude : path.resolve(__dirname,'node_modules'),
                include : path.resolve(__dirname,'src'),
               
                query : {
                    presets : ['latest']
                }
            },
            {
                test : /\.html$/,
                loader : 'html-loader'
               
            },
//          {
//              test : /\.(png|jpg|gif|svg)$/i,
//              loader : 'file-loader',
//              query:{
//              	name:'assets/[name]-[hash].[ext]'
//          	}
//             
//          },
            //当图片的大小大于限制就会丢给fileloader去处理，没超过就自己处理
            {
                test : /\.(png|jpg|gif|svg)$/i,
                loaders : [
                	'url-loader?limit=1000&name=assets/[name]-[hash].[ext]',
                	'image-webpack-loader'
                ]
                
               
               
            },
            {
                test : /\.css$/,
                use : [
                    {
                        loader : 'style-loader'
                    },
                    {
                          loader: 'css-loader?importLoaders: 1'
                          
                    },
                    {
                        loader: 'postcss-loader',
                           options : {
                               plugins : function() {
                                   return [
                                       require('autoprefixer')({
                                           broswers : ['last 5 versions']
                                       })
                                   ];
                               }
                           }
                    }
                ]
            },
            {
                test : /\.less$/,
                use : [
                    {
                        loader : 'style-loader'
                    },
                    {
                          loader: 'css-loader?importLoaders: 1'
                          
                    },
                    {
                        loader: 'postcss-loader',
                           options : {
                               plugins : function() {
                                   return [
                                       require('autoprefixer')({
                                           broswers : ['last 5 versions']
                                       })
                                   ];
                               }
                           }
                    },
                    {
                        loader : 'less-loader'
                    }
                    
                ]
            },
             {
                test : /\.scss$/,
                use : [
                    {
                        loader : 'style-loader'
                    },
                    {
                          loader: 'css-loader?importLoaders: 1'
                          
                    },
                    {
                        loader: 'postcss-loader',
                           options : {
                               plugins : function() {
                                   return [
                                       require('autoprefixer')({
                                           broswers : ['last 5 versions']
                                       })
                                   ];
                               }
                           }
                    },
                    {
                        loader : 'sass-loader'
                    }
                    
                ]
            }
            
            
        ]
	},
	plugins:[
		new htmlWebpackPlugin({
			
			filename:'index.html',
			template:'index.html',
			inject:'body'
		})
		
		
	]
	
}

