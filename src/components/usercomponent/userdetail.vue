<template>
  <div class="userdetail">
    <div>
      <div class="userimg">
        <img :src="imgurl"  />
      </div>
      <div class="edit">
        <div>
          <p>
            <span>0</span>
            <span class="usertext">粉丝</span>
          </p>
          <span class="line"></span>
          <p>
            <span>128</span>
            <span class="usertext">关注</span>
          </p>
          <span class="line"></span>
          <p>
            <span>0</span>
            <span class="usertext">获赞</span>
          </p>
        </div>
        <div>
          <div class="editbtn" @click="$router.push('/edit')">编辑资料</div>
        </div>
      </div>
    </div>
    <div class="text">
      <h2 class="name">{{name}}</h2>
      <p class="ziliao">{{text}}</p>
    </div>
    <div class="dongtai">
      <span>动态</span>
      <span>视频</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgurl: "",
      name:"",
      text:""
    };
  },
  async mounted() {
    const res = await this.$http.get("/user/" + localStorage.getItem("id"));
    this.imgurl=res.data[0].user_img;
    this.name=res.data[0].name;
    this.text=res.data[0].user_desc;
  },
};
</script>

<style lang="scss" scoped>
.userdetail {
  > div:nth-child(1) {
    display: flex;
  }
  background-color: white;
  padding: 0 12px;
  .userimg {
    margin-right: 20px;
    img {
      height: 85px;
      width: 85px;
      border-radius: 50%;
    }
  }
  .edit {
    margin: 10px 0;
    flex: 1;
    div:nth-child(1) {
      display: flex;

      P {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 15px;
        .usertext {
          color: #aaa;
        }
      }
      .line{
        margin-top: 7px;
        height: 20px;
        width: 1px;
        background-color: #aaa;
      }
      // p:nth-child(1),
      // p:nth-child(2) {
      //   border-right: solid 1px #cccc;
      // }
    }
    div:nth-child(2) {
      margin-top: 5px;
      padding: 5px 20px;
      .editbtn {
        height: 30px;
        padding: 3px;
        border: solid 1px #fb7a9f;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fb7a9f;
        border-radius: 4px;
      }
    }
  }
  .text{
      .name {
        margin: 5px 0 3px 0;
      }
      .ziliao{
          padding: 0;
          margin: 2.5vw;
          margin-left: 0px;
          color: #aaa;
      }
    }
  .dongtai{
    border-top: 3px solid #f4f4f4;
    height: 40px;
    display: flex;
    align-items: center;
    span{
      color: #aaa;
    }
    span:nth-child(2){
      margin-left: 10px;
    }
  }
}
</style>