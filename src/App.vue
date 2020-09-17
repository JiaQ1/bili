<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepalive" />
    </keep-alive>
      <router-view v-if="!$route.meta.keepalive" />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  box-sizing: border-box;
}
p {
  margin: 0;
  padding: 0;
}
</style>
