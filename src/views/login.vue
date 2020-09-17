<template>
  <div>
    <login-top middleTop="登录bilibili">
      <div slot="right" style="font-size:2.7vw;" @click="$router.push('register')">注册</div>
    </login-top>
    <login-text label="账号" placeholder="请输入账号" rule="^.{6,16}$" @inputchange="res=>userinfo.username=res" style="margin:4vw 0;"></login-text>
    <login-text
      label="密码"
      placeholder="请输入密码"
      type="password"
      rule="^.{6,16}$"
      @inputchange="res=>userinfo.password=res"
    ></login-text>
    <login-btn btntext="登录" @registerSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>
import LoginTop from '../components/common/LoginTop.vue'
import LoginText from '../components/common/LoginText.vue'
import LoginBtn from '../components/common/Loginbtn.vue'
export default {
  data(){
    return {
      userinfo:{
        username:'',
        password:''
      }
    }
  },
  components:{
    LoginTop,
    LoginText,
    LoginBtn
  },
  methods:{
    async registerSubmit(){
      let rulg = /^.{6,16}$/
            if(rulg.test(this.userinfo.username)&&rulg.test(this.userinfo.password)){
                const res =  await this.$http.post('/login',this.userinfo)
                this.$msg.success(res.data.msg)
                if(res.data.code == 301 || res.data.code == 302){
                    return
                }
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('id',res.data.id)
                setTimeout(() => {  
                    this.$router.push('/userinfo')
                },1000)
            }else{
                this.$msg.fail('格式不正确,请重新输入!')
            }
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f4f4f4;
}
</style>