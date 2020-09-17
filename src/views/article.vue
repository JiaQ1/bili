<template>
  <div v-if="model" class="articlepage">
    <nav-bar></nav-bar>
    <div class="detailinfo">
      <div class="video">
        <van-icon name="arrow-left" class="back" @click="$router.back()" />
        <video :src="model.content" controls="controls"></video>
      </div>
      <div class="detailinfotext">
        <div>
          <span>{{model.category.title}}</span>
          <span>{{model.name}}</span>
        </div>
        <div>
          <span>{{model.userinfo.name}}</span>
          <span>134.5万次观看</span>
          <span>8603弹幕</span>
          <span>{{model.date}}</span>
        </div>
      </div>
      <div class="function">
        <van-icon name="good-job" size="1.5rem" :color="color" @click="onClick" />
        <svg
          t="1599793017921"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2674"
          width="20"
          height="20"
        >
          <path
            d="M939.514228 613.762564a63.9996 63.9996 0 0 0 68.479572-63.9996s0-102.39936-101.119368-447.9972c0 0-31.359804-101.119368-69.759564-101.119368H426.877432C399.9976 0.0064 325.118068 19.20628 325.118068 72.965944v540.79662S527.9968 763.521628 527.9968 954.240436c5.759964 10.239936-10.239936 69.759564 63.9996 69.759564 0 0 178.558884-19.839876 72.959544-410.237436zM213.758764 613.762564a40.319748 40.319748 0 0 0 41.59974-41.59974V23.046256s0-23.039856-29.439816-23.039856H84.479572a33.919788 33.919788 0 0 0-34.559784 34.559784L16 580.482772a33.279792 33.279792 0 0 0 33.919788 33.279792z"
            p-id="2675"
            fill="#707070"
          />
        </svg>
        <van-icon name="like" @click="subscript" :class="{starcolor:subscriptactive}" size="1.5rem" />
        <van-icon name="star" size="1.5rem" :class="{starcolor:starcolor}" @click="collection" />
        <van-icon name="share" size="1.5rem" color="#707070" @click="showShare = true" />
      </div>
      <div class="icontext">
        <span>7699</span>
        <span>不喜欢</span>
        <span>关注</span>
        <span>8631</span>
        <span>4021</span>
      </div>
      <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" />
    </div>
    <div class="detailparent">
      <cover
        class="detailitem"
        v-for="(item,index) in commendList"
        :key="index"
        :detailitem="item"
      />
    </div>
    <commenttitle @postcomment="postsuccess" ref="commentIpt" />
    <comment @publishClick="PostChildClick" ref="commentpublish" />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar.vue";
import cover from "./homedetail.vue";
import commenttitle from "@/components/article/commenttitle.vue";
import comment from "@/components/article/comment.vue";
export default {
  data() {
    return {
      model: null,
      color: "#707070",
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
      commendList: null,
      myinfo: null,
      starcolor: null,
      subscriptactive:null,
      postcom: {
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: null,
      },
    };
  },
  components: {
    NavBar,
    cover,
    commenttitle,
    comment,
  },
  methods: {
    async articleitemData() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
    },
    onClick() {
      if (this.color == "#707070") {
        this.color = "#fb7299";
      } else {
        this.color = "#707070";
      }
    },
    async commendData() {
      const res = await this.$http.get("/commend");
      this.commendList = res.data;
      if(this.model){
        this.subscriptcheck();
      }
    },
    async postsuccess(res) {
      const date = new Date();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      let str = `${m}-${d}`;
      this.postcom.comment_content = res;
      this.postcom.comment_date = str;
      this.postcom.article_id = this.$route.params.id;
      const result = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.postcom
      );
      this.$refs.commentpublish.commentData();
      this.postcom.parent_id = null;
      if (result.status == 200) {
        this.$msg.success("评论发表成功");
      }
    },
    PostChildClick(id) {
      this.postcom.parent_id = id;
      this.$refs.commentIpt.focusIpt();
    },
    async collection() {
      if (localStorage.getItem("token") && localStorage.getItem("id")) {
        const res = await this.$http.post(
          "collection/" + localStorage.getItem("id"),
          { article_id: this.$route.params.id }
        );
        if (res.data.msg == "收藏成功") {
          this.starcolor = true;
        } else {
          this.starcolor = false;
        }
        this.$msg.success(res.data.msg);
      }
    },
    async collectioncheck() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/collection/" + localStorage.getItem("id"),
          {
            params: {
              article_id: this.$route.params.id,
            },
          }
        );
        this.starcolor = res.data.success;
      }
    },
    //关注发帖用户
    async subscript() {
      if (localStorage.getItem("token") && localStorage.getItem("id")) {
        const res = await this.$http.post(
          "/sub_scription/" + localStorage.getItem("id"),
          { sub_id: this.model.userid }
        );
        if (res.data.msg == "关注成功") {
          this.subscriptactive = true;
        } else {
          this.subscriptactive = false;
        }
        this.$msg.success(res.data.msg);
      }
    },
    async subscriptcheck() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/sub_scription/" + localStorage.getItem("id"),
          {
            params: {
              sub_id: this.model.userid
            },
          }
        );  
        this.subscriptactive = res.data.success;
      }
    },
  },
  created() {
    this.articleitemData();
    this.commendData();
    this.collectioncheck();
  },
  watch: {
    $route() {
      this.articleitemData();
      this.commendData();
      this.collectioncheck();
    },
  },
};
</script>

<style lang="scss">
.articlepage {
  background-color: white;
}
.detailinfo {
  background-color: white;
  .video {
    width: 100%;
    position: relative;
    .back {
      width: 15px;
      height: 15px;
      position: absolute;
      left: 7px;
      top: 10px;
      z-index: 1;
      color: white;
    }
    video {
      width: 100%;
    }
  }
  .detailinfotext {
    padding: 15px;
    div:nth-child(1) {
      span:nth-child(1) {
        padding: 10px 10px;
        color: #fb7299;
        background-color: #f4f4f4;
        border-radius: 10px;
        font-size: 14px;
      }
    }
    div:nth-child(2) {
      padding: 20px 10px;
      span {
        color: #aaa;
        font-size: 10px;
        padding-right: 20px;
      }
      span:nth-child(1) {
        color: black;
        font-size: 13px;
      }
    }
  }
  .function {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    .starcolor {
      color: #fb7299;
    }
  }
  .icontext {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    padding: 0 30px;
    font-size: 10px;
    color: #aaa;
    height: 30px;
    span:nth-child(2),
    span:nth-child(3) {
      margin-left: -4px;
    }
    span:nth-child(4) {
      margin-left: 5px;
    }
  }
}
.detailparent {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    margin: 1.389vw 0;
    width: 45%;
  }
}
</style>