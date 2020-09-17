<template>
  <div class="userinfo">
    <nav-bar></nav-bar>
    <img src="@/assets/bannerimg.png" class="backimg" />
    <detail :userInfo="model"></detail>
    <togglepage></togglepage>
  </div>
</template>

<script>
import detail from "@/components/usercomponent/userdetail.vue";
import NavBar from "@/components/common/navbar.vue";
import togglepage from '@/components/common/footer.vue'
export default {
  data() {
    return {
      model: {},
    };
  },
  components: {
    NavBar,
    detail,
    togglepage
  },
  methods: {
    async userinfoData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0]; 
    },
  },
  created() {
    this.userinfoData();
  },
};
</script>

<style lang="scss">
.userinfo {
  .backimg {
    width: 100vw;
  }
}
</style>