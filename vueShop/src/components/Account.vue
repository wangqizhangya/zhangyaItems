<template>
	<div class="account">
		<div v-for="(item,index) in filterAddress" class="addressItem" v-bind:class="{'check':index==curIndex}" @click="curIndex=index">
			<span>{{item.addressDd}}</span>
			<span>{{item.streetName}}</span>
			<span>{{item.userName}}</span>
			<span>{{item.postCode}}</span>
			<span>{{item.tel}}</span>
			<span v-if="!item.isDefault" @click="setDefault(item.addressId)" class="default">设为默认</span>
			<span v-if="item.isDefault" @click="setDefault(addressId)" class="default">默认地址</span>
		</div>
		<div class="more" @click="limitNum=address.length">更多</div>
		<input type="text" v-focus="isfocus"/>
		<input type="text"/>
		<div class="focusClick" @click="focusClick">点击</div>
	
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
     address:[{userName:'张亚',addressId:'1',streetName:'北京市朝阳区',postCode:'100023',tel:'152190447350',isDefault:false},
     {userName:'王奇',addressId:'2',streetName:'上海市琴浦区',postCode:'103023',tel:'198190447350',isDefault:false},
     {userName:'叶子',addressId:'3',streetName:'河南省信阳市',postCode:'100823',tel:'159190447359',isDefault:false},
     {userName:'小红',addressId:'4',streetName:'四川省成都市',postCode:'140023',tel:'182090447350',isDefault:false}],
     limitNum:2,
     curIndex:0,
     isfocus:false,
      msg: 'Hello'
    }
  },
	  filters:{
	  		formatMony(value){
	  			return "￥"+value;
	  		}
	  },
   mounted(){
   		

  
  },
    directives: {
        focus: {
            inserted: function (el,binding) {
            	console.log(el)
              el.focus()
            },
            update: function (el,binding) {
          	el.focus();
            	 
                
            }
        }
      
    },
   
	computed:{
		filterAddress(){
			//slice不会改变原数组，splice会改变原数组
			return this.address.slice(0,this.limitNum);
		}
	},
  methods: {
  
	focusClick(){
	
		this.isfocus=!this.isfocus;
	},
	loadMore(){
		this.limitNum=this.address.length;
	},
	setDefault(addressId){
		this.address.forEach((item,index)=>{
			if(item.addressId==addressId){
				item.isDefault=true;
			}else{
				item.isDefault=false;
			}
		})
	}
 }
  
}


</script>

<style>
	.account{
		font-size:20px;
	}
	.addressItem{
		width:33%;
		float:left;
		height:120px;
		border:1px solid #ccc;
		margin:10px!important;
	}
	.check{
		border:1px solid red;
		
	}
	.default{
		color:red;
	}
</style>