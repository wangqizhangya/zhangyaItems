
import React,{ Component } from 'react';
import { imageData } from './imgList.js'
import '../assets/css/app.css'
//var img2=require("../images/1.jpg")

//function genImageURL(imageDataArr){
//	for(var i=0;j=imageDataArr.length;i<j;i++){
//		var singleImageData=imageDataArr[i];
//		singleImageData.imgURL=require(singleImageData.fileName);
//		imageDataArr[i]=singleImageData;
//	}
//	return imageDataArr;
//}
//imageData=genImageURL(imageData)
//只执行一次的函数可以写成自执行函数

var imageData2=(function genImageURL(imageDataArr){
	for(var i=0;i<imageDataArr.length;i++){
		var singleImageData=imageDataArr[i];
		
		singleImageData.imgURL=require('../images/'+singleImageData.fileName);
		imageDataArr[i]=singleImageData;
	}
	return imageDataArr;
})(imageData)

class ImgFigure extends Component{
	constructor(props){
		super(props);
		this.state={
		 
	    };
	}
	render() {
	
	    return (
	   <figure className="img-figure">
	   	<img src={this.props.data.imgURL} alt={this.props.data.title} className="imgs" />
	   	<figcaption>
	   		<h2>{this.props.data.title}</h2>
	   	</figcaption>
	   </figure>
	   )
	  }
}
class Home extends Component{
	constructor(props){
		super(props);
		this.state={
		 
	    };
	}
	componentDidMount(){
		this.refs.stage.
	}
	render() {
		var controllerUnits=[];
		var imgFigures=[];
		imageData2.forEach(function(value){
			imgFigures.push(<ImgFigure data={value} />)
		})
	    return (
	    <section className="stage" ref="stage">

	    	<section className="img-sec">
	    		{imgFigures}
	    	</section>
	    	<nav className="controller-nav">
	    		{controllerUnits}
	    	</nav>
	    </section>
	   )
	  }
}
export { Home };