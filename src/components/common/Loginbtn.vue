<template>
  <div class="btnparent" @click="registerClick">
    <div class="loginbtn">{{btntext}}</div>
  </div>
</template>

<script>
export default {
    props:['btntext'],
    methods: {
      registerClick(){
        this.$emit("registerSubmit")
      }
    },
};
</script>

<style>
.btnparent{
    padding: 15px 10px;
}
.loginbtn {
  height: 45px;
  background-color: #ff9db5;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-radius: 20px;
}
</style>