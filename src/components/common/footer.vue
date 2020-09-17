<template>
  <div>
      <ul class="foot">
        <li class="footicon">
          <van-icon name="wap-home-o" @click="$router.push('/')" />
          <p class="pp">首页</p>
        </li>
        <li class="footicon">
          <van-icon name="tv-o" />
          <p class="pp">频道</p>
        </li>
        <li class="footicon">
          <van-icon name="eye-o" />
          <p class="pp">动态</p>
        </li>
        <li class="footicon">
          <van-icon name="goods-collect-o" class="buy" />
          <p class="pp">会员购</p>
        </li>
      </ul>
  </div>
</template>
<script>
export default {
};
</script>

<style lang="scss">

.foot{
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    .footicon{
      padding: 0 25px;
        .pp{
            font-size: 1px;
            white-space:nowrap; 
            margin-left: -3px;
        }
        .buy{
            right: -6px;
        }
    }
}
</style>