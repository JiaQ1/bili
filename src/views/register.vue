<template>
  <div>
    <!-- <van-cell-group>
      <van-field v-model="value" label="文本" placeholder="请输入用户名" />
    </van-cell-group>-->
    <login-top middleTop="注册bilibili">
      <div slot="right" style="font-size:2.7vw;" @click="$router.push('login')">登录</div>
    </login-top>
    <login-text
      label="姓名"
      style="margin:4vw 0;"
      placeholder="请输入姓名"
      rule="^.{6,16}$"
      @inputchange="res=>userinfo.name=res">
      </login-text>
    <login-text label="账号" placeholder="请输入账号" rule="^.{6,16}$" @inputchange="res=>userinfo.username=res"></login-text>
    <login-text
      label="密码"
      placeholder="请输入密码"
      type="password"
      rule="^.{6,16}$"
      @inputchange="res=>userinfo.password=res"
    ></login-text>
    <login-btn btntext="注册" @registerSubmit="registerSubmit"></login-btn>
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
        name:'',
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
      let rule = /^.{6,16}$/
      if(rule.test(this.userinfo.name)&&rule.test(this.userinfo.username)&&rule.test(this.userinfo.password)){
        const res = await this.$http.post("/register",this.userinfo)
        this.$msg.fail(res.data.msg);
        localStorage.setItem('id',res.data.id);
        localStorage.setItem('token',res.data.objtoken);
        if(res.data.code===200){
            setTimeout(()=>{
          this.$router.push('/userinfo')
        },1000)
        }
      }else{
        this.$msg.fail('格式不正确，请重新输入')
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