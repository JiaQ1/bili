<template>
  <div>
      <p class="commenttile">
          <span>评论</span>
          <span>({{commentlenght}})</span>
      </p>
      <div class="commentinfo">
        <img :src="myinfo.user_img" v-if="myinfo">
        <img src="@/assets/userimg.png" v-else>
        <input type="text" placeholder="开始祖安人的狂欢吧" ref="Postipt" v-model="content">
        <button @click="commentput">发表</button>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            myinfo:null,
            commentlenght:null,
            content:'',
        }
    },
  methods: {
    async userinfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.myinfo = res.data[0];
    },
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      this.commentlenght=res.data.length;
    },
    commentput(){
      if(!this.myinfo && !localStorage.getItem('token') && !localStorage.getItem('id')){
        this.$msg.fail('请先登录');
        return
      }
      this.$emit('postcomment',this.content);
      this.content="";
    },
    focusIpt(){
     this.$refs.Postipt.focus()
    }
  },
  created() {
    if(localStorage.getItem('token')){
      this.userinfo();
    };
    this.commentData();
  },
};
</script>

<style lang="scss">
.commenttile{
    padding: 20px 10px 10px 10px;
    font-size: 17px;
    span:nth-child(2){
        color: #aaa;
        margin-left: 10px;
        font-size: 15px;
    }
}
.commentinfo{
  display: flex;
  justify-content: space-between;
  img{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-left: 13px;
  }
  input{
    outline: none;
    border-radius: 30px;
    border: 0;
    background-color: #eee;
    font-size: 14px;
    padding: 0 10px 0 10px;
    width: 60%;
  }
  button{
    outline: none;
    border: 0;
    border-radius: 12px;
    background-color: #fb7299;
    color: white;
    font-size: 13px;
    margin-right: 15px;
  }
}
</style>