<template>
	<div class="index">
		<div class="main">
			<div v-for="(item,index) in list">
				<span class="danxuan" v-bind:class="{check:item.check}" @click="selected(item)"></span>
				<span>{{item.id}}</span>
				<span>{{item.title}}</span>
				<span v-on:click="changeMony(item,+1)">+</span>
				<input type="text" disabled v-model="item.quentity">
				<span v-on:click="changeMony(item,-1)">-</span>
				<span>{{item.price | formatMony}}</span>
				<span class="totalPrice">{{item.price*item.quentity | mony('元')}}</span>
				<span class="delete" @click="deleteItem(item)">删除</span>
				<span class="default" @click="setDefault(item)">设为默认</span>
			</div>
			<span class="quanxuan" v-bind:class="{check2:checkAll}" @click="selectedAll"></span>
			总金额：<div class="totalAllPrice">{{totalAllPrice}}</div>
			<router-link to="/account">
				<span>结算</span>
			</router-link>
		</div>
		
	</div>
 	
</template>
 
<script>
import Vue from 'vue'
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
     b1:'',
     isCheck:true,
     totalAllPrice:0,
     show:false,
     checkAll:false,
     list:[{title:'红楼梦',id:'1',price:'3',quentity:'2'},{title:'西游记',id:'2',price:'40',quentity:'3'},{title:'水浒传',id:'3',price:'82',quentity:'5'}]
    }
  },
  filters:{
  		formatMony(value){
  			return "￥"+value;
  		}
  },
   mounted(){
   		

  
  },

  methods: {
  	deleteItem(item){
  		var index=this.list.indexOf(item);
  		//从当前索引开始删除，删除一个元素。
  		this.list.splice(index,1);
  		this.computedAllPrice()
  		
  	},
  	selected(item){
  		
  		if(typeof item.check=='undefined'){
  			
  			//局部注册
			this.$set(item,"check",true)
			//全局注册
//			Vue.set('item',"check",true)
  		}else{
  			item.check=!item.check;
  		}
  		this.computedAllPrice()
  	},
  	
  	selectedAll(){
  		this.checkAll=!this.checkAll;
  		if(this.checkAll){
  			//forEach使用箭头函数，所以this的作用域没有改变；
  			this.list.forEach((item,index)=>{
  				if(typeof item.check=='undefined'){
  					this.$set(item,"check",true)
  				}else{
  					item.check=true;
  				}
  				
  			})
  			
  		}else{
  			this.list.forEach((item,index)=>{
  				if(typeof item.check=='undefined'){
  					this.$set(item,"check",false)
  				}else{
  					item.check=false;
  				}
  				
  			})
  		}
  		this.computedAllPrice()
  		
  	},
  	computedAllPrice(){
  		this.totalAllPrice=0;
  		this.list.forEach((item,index)=>{
			if(item.check){
				this.totalAllPrice+=item.price*item.quentity
			}
			
		})
  	},
 	changeMony(product,way){
// 		alert(way)
		if(way>0){
			product.quentity++;
		}else{
			product.quentity--;
			if(product.quentity<1){
				product.quentity=1;
			}
			
		}
		this.computedAllPrice()
	}
 		
 	
	
 }
  
}

Vue.filter('mony',function(value,type){
	console.log(type)
	return "￥"+value+type;
})
</script>
<style lang="scss" type="text/css">
body,html{
	width:100%;
	height:100%;
}
.index{
	width:100%;
	height:100%;
	position:relative;
	box-sizing: border-box;
	font-size:20px;
	.totalPrice{
		color:red;
		font-weight:bolder;
	}
	.delete{
		color:red
	}
	.main{
		width:100%;
		.banner{
			width:100%;
			height:3.88rem;
			img{
				width:100%;
				height:100%;
				display: block;
			}
		}
		p{
			font-size:0.3rem;
			color:#333;
			padding:0 0.3rem!important;
			line-height:0.44rem;
			margin-top:0.32rem!important;
		}
		
		.img2{
			width:79.7%;
			margin:0 0.76rem!important;
			
			
		}
		h5{
			font-size:0.3rem;
			color:#333;
			height:1.7rem;
			line-height: 1.7rem;
			padding-left:0.3rem!important;
			box-sizing: border-box;
					}
		margin-bottom:2.18rem!important;
	}
	.bottom{
		width:100%;
		padding:0 0.3rem!important;
		box-sizing: border-box;
		background:#fafafa;
		height:1.54rem;
		line-height: 1.54rem;
		position:fixed;
		bottom:0;
		left:0;
		border-top:1px solid #e6e6e6;
		
		.create{
			width:100%;
			height:0.9rem;
			line-height: 0.9rem;
			background:#1da1f2;
			font-size:0.3rem;
			color:#fff;
			text-align: center;
			overflow: hidden;
			margin-top:0.3rem!important;
			border-radius:0.1rem;
		}
	}
	

	.toast{
		color:#fff;
		width:92%;
		font-size:0.3rem;
		background:#000;
		height:0.9rem;
		color:#fff;
		text-align:center;
		line-height:0.9rem;
		position:absolute;
		top:5rem;
		margin-left:0.3rem!important;
		border-radius:0.1rem;
		text-decoration:none;
	}
	.danxuan,.quanxuan{
		display:inline-block;
		width:15px;
		height:15px;
		border-radius:50%;
		background:#000;
	}
	.danxuan.check{
		
		background:red;
	}
	.check2{
		
		background:red;
	}
}
</style>