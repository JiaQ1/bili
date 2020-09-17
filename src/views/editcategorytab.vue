<template>
  <div class="edit">
      <nav-bar></nav-bar>
      <van-divider :style="{ color: '#fb7299', borderColor: '#fb7299', padding: '0 16px' }">已添加的频道</van-divider>
      <div class="new-category newcategory">
          <p v-for="(item,index) in newcategory" :key="index" @click="delcategory(index)">{{item.title}}</p>
      </div>
      <van-divider :style="{ color: '#007ACC', borderColor: '#007ACC', padding: '0 16px' }">已删除的频道</van-divider>
      <div class="new-category delcategory">
          <p v-for="(item,index) in delcate" :key="index" @click="addcategory(index)">{{item.title}}</p>
      </div>
      <togglepage></togglepage>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar.vue";
import togglepage from "@/components/common/footer.vue";
export default {
    data(){
        return {
            newcategory:[],
            delcate:[]
        }
    },
    components:{
        NavBar,
        togglepage
    },
    methods:{
        async selectCategory(){
            const res = await this.$http.get("/category");
            this.newcategory = res.data;
        },
        delcategory(index){
            if(this.newcategory.length<4){
                this.$msg.fail('最少保留三个频道')
                return
            }
            this.delcate.push(this.newcategory[index]);
            this.newcategory.splice(index,1);
            localStorage.setItem('newcate',JSON.stringify(this.newcategory));
        },
        addcategory(index){
            this.newcategory.push(this.delcate[index]);
            this.delcate.splice(index,1);
        }
    },
    created(){
        if(localStorage.getItem('delcate')&&localStorage.getItem('newcate')){
            this.newcategory = JSON.parse(localStorage.getItem('newcate'));
            this.delcate = JSON.parse(localStorage.getItem('delcate'));
            return
        }
        this.selectCategory();
    },
    watch:{
        newcategory(){
            localStorage.setItem('newcate',JSON.stringify(this.newcategory));
            localStorage.setItem('delcate',JSON.stringify(this.delcate));
        }
    }
}
</script>

<style lang="scss">
.new-category{
    padding: 0 2.778vw;
    display: flex;
    flex-wrap: wrap;
   p{   
        width: 20%;
        text-align: center;
        margin: 1.389vw 1.944vw;
        padding: 1.944vw 0vw;
   }
}
.newcategory{
    p{
        color:#fb7299 ;
        border:0.278vw solid #fb7299;
    }
}
.delcategory{
    p{
        color: #1a73e8;
        border: 0.278vw solid #1a73e8;
    }
}
</style>