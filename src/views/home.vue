<template>
  <div class="home" v-if="category">
    <nav-bar></nav-bar>
    <div class="categorytab">
      <div class="settings" @click="$router.push('/editcategory')">
        <van-icon name="setting-o" />
      </div>
      <van-tabs v-model="active" swipeable sticky>
        <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="detailparent">
              <detail
                class="detailitem"
                :detailitem="categoryitem"
                v-for="(categoryitem,categoryindex) in item.list"
                :key="categoryindex"
              ></detail>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <togglepage></togglepage>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar.vue";
import detail from "@/views/homedetail.vue";
import togglepage from "@/components/common/footer.vue";
export default {
  data() {
    return {
      category: [],
      active: 0,
    };
  },
  components: {
    NavBar,
    detail,
    togglepage,
  },
  activated(){
    if(localStorage.getItem('newcate')){
        let newcate = JSON.parse(localStorage.getItem('newcate'));
        this.category = this.changeCategory(newcate);
        this.selectArticle();
    }
  },
  methods: {
    async selectCategory() {
      if(localStorage.getItem('newcate')){
        return
      }
      const res = await this.$http.get("/category");
      this.changeCategory(res.data);
      this.selectArticle();
    },
    changeCategory(data) {
      const category1 = data.map((item, index) => {
        item.list = [];
        item.finished = false;
        item.loading = false;
        item.page = 0;
        item.pagesize = 10;
        return item;
      });
      this.category = category1;
      return category1;
    },
    async selectArticle() {
      const categoryitem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize,
        },
      });
      categoryitem.list.push(...res.data);
      categoryitem.loading = false;
      if (res.data.lenght < categoryitem.pagesize) {
        categoryitem.finished = true;
      }
    },
    onLoad() {
      const categoryitem = this.categoryItem();
      setTimeout(() => {
        categoryitem.page += 1;
        this.selectArticle();
      }, 1000);
    },
    categoryItem() {
      const categoryitem = this.category[this.active];
      return categoryitem;
    },
  },
  watch: {
    active() {
      this.selectArticle();
    },
  },
  created() {
    this.selectCategory();
  },
};
</script>

<style lang="scss">
.home {
  background-color: #fff;
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    margin: 1.389vw 0;
    width: 45%;
  }
}
.categorytab{
  position: relative;
  .settings{
    position: absolute;
    z-index: 2;
    right: 0;
    top: 5px;
    padding: 5px 10px;
    background-color: white;
  }
}
</style>