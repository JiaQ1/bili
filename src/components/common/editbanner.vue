<template>
  <div @click="bannerclick">
      <div class="banner">
          <span>{{left}}</span>
          <span><slot name="right" /></span>
      </div>
  </div>
</template>

<script>
export default {
    props:['left'],
    methods:{
        bannerclick(){
            this.$emit('bannerclick');
        }
    }
}
</script>

<style lang="scss">
.banner{
    background-color: #fff;
    padding: 15px;
    font-size: 14px;
    border-bottom: 1px solid #f4f4f4;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>