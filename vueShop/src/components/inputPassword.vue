<template>
    <article class="news news2">
        <p class="list1">
            <span class="span1">输入手机号</span>
            <span class="span2">重置密码</span>
            <span class="span3">完成</span>
        </p>
        <p class="list2 list">
            <strong>您绑定的手机号码：</strong><span>{{phoneNo}}</span>
        </p>
        <p class="list3 list">
            <input id="code" type="text" placeholder="验证码" v-model="authCode" v-focus="state.focusState" ref="authCode" />
            <input id="getCode" @click="changeCode()" :class="{ changeCode: isSetCode }" :disabled="isSetCode"  type="button" v-model="setCode" />
            <i></i>
        </p>
        <p class="list4 list">
            <font></font>
            <input id="newPwd" type="text" ref="newPwd" v-model="newPwd" placeholder="新密码：6-18位数字或字母" />
        </p>
        <p class="list5 list">{{info}}</p>
        <p class="list6 list" @click="next">下一步</p>
    </article>
</template>
<script type="text/javascript">
	import API from "@/config/api";
    import fn from "@/static/common";
    let BASE64 = require('js-base64').Base64;
	export default{
        state = {
            focusState : true
        }
		data(){
			return{
                state ,
				token:"",
                setCode:"获取验证码" ,
                i:"" ,
                isSetCode:false ,
                authCode : "" ,
                newPwd : "" ,
                basePwd : "" ,
                md5:"",
                info : "" 
			}
        },
        directives: {
            focus: {
                inserted: function (el) {
                    //el.focus()
                },
                update: function (el, {value}) {
                    if (value) {
                        //el.focus()
                    } 
                }
            }
        },
        props: {
			"phoneNo":{
				type:String,		//Array,Boolean,Number
				default:false
			}
	    },
		methods: {
			init(){
				this.token = sessionStorage.getItem("myron");	//获取token值
            },
            //获取MD5串
			loginMd5:function(){
                let _this = this ;
				let request = new Request(API.GET_PWD_STR,{
				    headers: new Headers({
				        "Content-Type": "text/plain"
				    }),
				    method : "get",
			 		mode: "cors",
			 		redirect : "follow"
				});
				fetch(request)
				    .then((response) => {
    				//返回 object 类型
			        return response.json();
			    })
			    .then((result) => {
                    _this.md5 = result.data;
                    console.log("md5:", _this.md5 )
			    })
				.catch((error)=>{
				    _this.info = error.msg ;
				});
			},
            //获取手机验证码，倒计时
            changeCode(){
                let _this = this ;
                if(_this.phoneNo){
                    _this.getCode() ;   //调取手机验证码接口
                    _this.i = 60;
                    var timer = setInterval(function() {
                        _this.setCode = "重新发送" + _this.i + "s" ;
                        _this.isSetCode = true ;
                        _this.i = _this.i - 1;
                        if(_this.i < 0) {
                            clearInterval(timer);
                            _this.setCode = "获取验证码" ;
                            _this.isSetCode = false ;
                        } 
                    }, 1000);
                }else{
                    this.info = "无法获取到手机号码"
                }
                
            },
            //获取手机验证码，调接口
            getCode(){
               //开始请求数据
				let params={
					mobilePhone:this.phoneNo,
				    codeType:"1002",
				    token:this.token
				}
				let formData = new FormData(); 
				for (var key in params) {
				    formData.append(key, params[key])
				} 
				let request = new Request(API.GET_FORGET_PASSWORD_CODE,{
				    headers: {},
				    method : "post",
			 		mode: "cors",
			 		redirect : "follow",
					body:formData
				});
				fetch(request)
				    .then((response) => {
    				//返回 object 类型
			        return response.json();
			    })
			    .then((result) => {
                    console.log(result);
                    if(result.result == "success"){

                    }else{
                        this.info = result.msg
                        this.i = 0 ;
                    }
			    })
				.catch((error)=>{
				    this.info = error.msg ;
				});
				//end---开始请求数据
               


            },
            //点击下一步，提交数据
            next(){
                let _this = this ;
                //校验是否填写验证码
				if(_this.authCode==""||_this.authCode==null){
                 //   _this.state.focusState = true ;
					_this.info = "请输入验证码" ;
					_this.$refs['authCode'].focus()
					return false ;
				}else{
					_this.info = ""
                }
                //校验密码格式
				if(!fn.checkPwd(_this.newPwd)){
					_this.info = "密码格式不正取" ;
					_this.$refs['newPwd'].focus()
					return false ;
				}else{
					_this.info = "" ;
					//密码加密
					_this.basePwd = BASE64.encode(BASE64.encode(_this.basePwd)+_this.md5) ;
                }
                this.$emit('setInputPasswordFlag', {state:true,index:2}) ;
            }
		},
		created(){
            this.init();
            this.loginMd5();
            
            console.log("传值：",this.phoneNo)
		}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./inputPassword.scss";
</style>
