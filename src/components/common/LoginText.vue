<template>
  <div>
    <van-field v-model="content" :label="label" :placeholder="placeholder" :type="type" :rule="rule"  />
  </div>
</template>

<script>
export default {
  data(){
    return {
      content:''
    }
  },
  props: ["label", "type", "rule", "placeholder"],
  methods:{
    handlerulg(){
      const rul=new RegExp(this.rule);
      if(rul.test(this.content)){
          this.$emit("inputchange",this.content)
      }
    }
  },
  watch:{
    content(){
      this.handlerulg()
    }
  }
};
</script>

<style>
</style>