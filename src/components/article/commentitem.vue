<template>
  <div class="commentitems" >
    <div class="commentitem" v-for="(item,index) in commentchild.slice(0,1)" :key="index">
      <div class="userimg">
        <img v-if="item.userinfo.user_img" :src="item.userinfo.user_img" />
        <img v-else src="@/assets/userimg.png" alt />
        <p>
          <span v-if="item.userinfo">{{item.userinfo.name}}</span>
          <span v-else>此用户无姓名</span>
          <span>{{item.comment_date}}</span>
        </p>
      </div>
      <div class="commentcontent">
        <div v-if="!temp">{{item.comment_content}} <span class="publish" @click="PostItemcomment(item.comment_id)">回复</span></div>
        <div v-else>回复 <span style="color:#478ef0">@{{item.parent_user_info.name}}</span> :{{item.comment_content}} <span class="publish" @click="PostItemcomment(item.comment_id)">回复</span></div>
      </div>
      <div>
        <commentchilditem :commentchild="item.child" :temp="true" @postChild="postChild"></commentchilditem>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentchilditem",
  props: ["commentchild","temp"],
  methods:{
    PostItemcomment(id){
      this.$emit('postChild',id);
      this.$emit('PostPublish',id);
    },
    postChild(id){
      this.PostItemcomment(id);
      this.$emit('PostPublish',id);
    }
  }
};
</script>

<style lang="scss" scoped>
.commentitems {
  .commentitem {
    display: flex;
    flex-direction: column;
    .userimg {
      display: flex;
      img{
          margin:0 10px 10px 0;
          border-radius: 50%;
      }
      p {
        flex: 1;
        font-size: 14px;
        color: #555;
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
      }
    }
    .commentcontent{
      position: relative;
      .publish{
        color: pink;
        position: absolute;
        right: 15px;
      }
    }
  }
}
</style>