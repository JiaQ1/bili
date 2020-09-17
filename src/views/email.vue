<template>
  <div>
    <div class="header">
      <van-icon name="arrow-left" class="ic" @click="$router.back()" size="1.3rem" />
      <p>消息</p>
      <van-icon name="setting-o" size="1.3rem" class="ic2" />
    </div>
    <ul class="emailul">
      <li>
        <van-icon name="chat" color="#71D8A8" size="1.8rem" />
        <p class="emailp">回复我的</p>
      </li>
      <li>
          <van-icon name="good-job" color="#EC697B" size="1.8rem" />
          <p class="emailp">收到的赞</p>
      </li>
      <li>
          <van-icon name="volume"  color="#72CEE7" size="1.8rem" />
          <p class="emailp">系统通知</p>
      </li>
      <li>
          <van-icon name="friends" color="#F8C37F" size="1.8rem" />
          <p class="emailp">我的好友</p>
      </li>
    </ul>
    <div class="chatheader">聊天列表</div>
    <div class="chat">
        <div>还没有消息哦~</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  height: 5vh;
  font-size: 17px;
  .ic {
    padding-left: 5px;
  }
  p {
    padding-right: 5px;
  }
  .ic2 {
    padding-right: 5px;
  }
}
.emailul{
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    align-items: center;
    height: 80px;
    border-top: 2px solid #f4f4f4;
    li{
        .emailp{
            font-size: 1px;
            margin-left: -8px;
            display: block;
            white-space:nowrap; 
        }
    }
    li:nth-child(1){
        margin-left: 20px;
    }
    li:nth-child(4){
        margin-right: 20px;
    }
}
.chatheader{
    display: flex;
    background-color: #fff;
    height: 30px;
    margin-top: 10px;
    align-items: center;
    padding-left: 13px;
    font-size: 15px;
}
.chat{
    margin-top: 2px;
    background-color: #fff;
    height: 645px;
    display: flex;
    justify-content: center;
    align-items: center;
    div{
        color: #bbbbbb;
        font-size: 10px;
    }
}

</style>