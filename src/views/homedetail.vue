<template>
  <div @click="pathPush">
      <div>
        <div class="imgparent">
          <img :src="detailitem.img" style="width:100%;height:100%;">
          <span class="view">11.2万</span>
          <span class="comment">{{detailitem.commentlen}}</span>
        </div>    
        <p>{{detailitem.name}}</p>
      </div>
  </div>
</template>

<script>
export default {
  props:['detailitem'],
  methods:{
    pathPush(){
      if(this.$route.path!='/article/'+this.detailitem.id){
        this.$router.push('/article/'+this.detailitem.id);
      }
    }
  }
}
</script>

<style lang="scss">
p{
  font-size: 13px;
}
.imgparent{
  position: relative;
  .view{
    position: absolute;
    left: 4px;
    bottom: 6px;
    font-size: 13px;
  }
  .comment{
    position: absolute;
    bottom: 6px;
    right: 4px;
  }
}
</style>