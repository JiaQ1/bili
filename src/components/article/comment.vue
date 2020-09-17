<template>
  <div class="commentparent">
    <div v-for="(item,index) in comments" :key="index">
      <div class="commentitem">
        <div class="userimg">
          <img v-if="item.userinfo.user_img" :src="item.userinfo.user_img" />
          <img v-else src="@/assets/userimg.png" alt />
        </div>
        <div class="commentcontent">
          <p>
            <span v-if="item.userinfo">{{item.userinfo.name}}</span>
            <span v-else>此用户无姓名</span>
            <span>{{item.comment_date}}</span>
          </p>
          <div>
            {{item.comment_content}}
            <span class="publish" @click="publishClick(item.comment_id)">回复</span>
          </div>
        </div>
      </div>
      <div>
        <comment-item :commentchild="item.child" style="padding-left:40px;" @PostPublish="publishClick"></comment-item>
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from "@/components/article/commentitem.vue";
export default {
  data() {
    return {
      comments: null,
    };
  },
  components: {
    CommentItem,
  },
  methods: {
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      this.comments = this.getcomment(res.data);
    },
    getcomment(data) {
      function fn(temp) {
        let arr1 = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr1.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return arr1;
      }
      return fn(null);
    },
    publishClick(id){
      this.$emit('publishClick',id);
    }
  },
  created() {
    this.commentData();
  },
};
</script>

<style lang="scss">
.commentparent {
  padding: 20px 10px;
  > div {
    border-bottom: 1px solid #e7e7e7;
  }
  .commentitem {
    display: flex;
    padding: 10px 0 0 0;
    .userimg {
      margin-right: 15px;
      img {
        width: 35px;
        height: 35px;
      }
    }
  }
  .commentcontent {
    position: relative;
    flex: 1;
    p {
      font-size: 14px;
      color: #555;
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    div {
      font-size: 13px;
    }
  }
  .publish {
    position: absolute;
    color: pink;
    position: absolute;
    right: 15px;
  }
}
</style>