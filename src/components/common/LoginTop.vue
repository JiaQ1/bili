<template>
  <div>
      <div class="logintop">
        <div></div>
        <div>{{middleTop}}</div>
        <div>
          <slot name="right" />
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props:['middleTop']
}
</script>

<style lang="scss">
.logintop{
  height: 45px;
  background-color: #fff;
  display: flex;
  div{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4vw;
  }
}
</style>