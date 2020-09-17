<template>
  <div v-if="model">
    <div style="margin-bottom:15px;">
      <nav-bar></nav-bar>
    </div>
    <div class="upload">
      <van-uploader :after-read="afterRead" preview-size="200vw" class="upimg" />
      <edit left="头像">
        <img :src="model.user_img" class="touxiang" slot="right" v-if="model.user_img" />
        <img src="@/assets/userimg.png" slot="right" v-else />
      </edit>
    </div>
    <edit left="昵称" @bannerclick="show = true" @cancel="content=''">
      <a href="javascript:;" slot="right">{{model.name}}</a>
    </edit>
    <edit left="账号">
      <a href="javascript:;" slot="right">{{model.username}}</a>
    </edit>
    <edit left="性别" @bannerclick="gendershow = true">
      <a href="javascript:;" slot="right">{{model.gender==0?'男':'女'}}</a>
    </edit>
    <edit left="个性签名" @bannerclick="textshow = true"></edit>
    <van-dialog
      v-model="show"
      title="昵称"
      show-cancel-button
      @confirm="confirmClick"
      @cancel="content=''"
    >
      <van-field v-model="content" autofocus />
    </van-dialog>
    <van-dialog v-model="textshow" title="个性签名" show-cancel-button @confirm="textareaClick">
      <van-field v-model="content" type="textarea" autofocus />
    </van-dialog>
    <van-action-sheet v-model="gendershow" :actions="actions" cancel-text="取消" @select="onSelect" />
    <div class="editback" @click="$router.back()">返回个人中心</div>
    <div class="out" @click="logout">退出登录</div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar.vue";
import edit from "@/components/common/editbanner.vue";
export default {
  data() {
    return {
      model: {},
      show: false,
      textshow: false,
      content: "",
      gendershow: false,
      actions: [
        { name: "男", val: 0 },
        { name: "女", val: 1 },
      ],
    };
  },
  components: {
    NavBar,
    edit,
  },
  methods: {
    async selectuser() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
    async afterRead(file) {
      const fromdata = new FormData();
      fromdata.append("file", file.file);
      const res = await this.$http.post("/upload", fromdata);
      this.model.user_img = res.data.url;
      this.UserUpdate();
    },
    async UserUpdate() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      if (res.data.code == 200) {
        this.$msg.success("修改成功");
      }
    },
    confirmClick() {
      let rule = /^.{6,16}$/;
      if (rule.test(this.content)) {
        this.model.name = this.content;
        this.UserUpdate();
        this.content = "";
      } else {
        this.$msg.fail("格式有误，请重新输入");
        this.content = "";
      }
    },
    textareaClick() {
      if (this.content === "") {
        this.model.user_desc = "这个人很神秘，什么都没有留下";
      } else {
        this.model.user_desc = this.content;
        this.UserUpdate();
        this.content = "";
      }
    },
    onSelect(data) {
      this.model.gender = data.val;
      this.UserUpdate();
      this.gendershow = false;
    },
    logout(){
        this.$msg.success("成功登出");
        setTimeout(()=>{
            this.$router.push('/login')
        },1000)
    }
  },
  created() {
    this.selectuser();
  },
};
</script>

<style lang="scss">
a {
  color: #333;
}
.touxiang {
  height: 46px;
  width: 46px;
  border-radius: 50%;
}
.upload {
  position: relative;
  overflow: hidden;
  .upimg {
    position: absolute;
    opacity: 0;
  }
}
.editback{
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border: #ff9db5;
    color: #ff9db5;
    font-size: 17px;
    padding: 15px;
    margin-top: 120px;
}
.out{
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border: #ff9db5;
    color: #ff9db5;
    font-size: 17px;
    padding: 15px;
    margin-top: 10px;
}
</style>