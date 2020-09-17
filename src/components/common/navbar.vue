<template>
  <div class="navbar">
    <!-- <div class="logo">
      <img src="@/assets/logo.png" />
    </div>-->
    <div class="user">
      <img :src="imgurl" @click="$router.push('/userinfo')" v-if="imgurl" />
      <img src="@/assets/userimg.png" v-if="!imgurl" @click="$router.push('/login')">
    </div>
    <div>
      <p>
        走进动物世界观看乌龟交配
        <van-icon class="inp-icon" name="search" />
      </p>
    </div>
    <div class="ic">
      <van-icon name="shop-o" class="tb" />
      <van-icon name="envelop-o" class="tb" @click="$router.push('/email')" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgurl: null,
    };
  },
  async mounted() {
    if (localStorage.getItem("token")) {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.imgurl = res.data[0].user_img;
    }
  },
};
</script>

<style lang="scss">
.navbar {
  height: 13vw;
  background-color: #fff;
  display: flex;
  .user {
    img {
      border-radius: 50%;
    }
  }
  div:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 9px;
    p {
      font-size: 15px;
      line-height: 33px;
      background-color: #f4f4f4;
      padding-left: 25px;
      height: 33px;
      width: 95%;
      border-radius: 13px;
      position: relative;
      color: #aaa;
      .inp-icon {
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translate(0, -50%);
        color: #aaa;
      }
    }
  }
  div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 7px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  div:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: center;
    .tb {
      margin-top: 15px;
      width: 30px;
      height: 30px;
    }
  }
}
</style>