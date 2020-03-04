<template>
  <div id="app">
    <!-- <router-view/> -->
    <Home/>
  </div>
</template>

<script>
import Home from '@/views/Home.vue'
export default {
  components: {
    Home
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // background: #161616;
  height: 100%;
}
.bigScreen{
  // height: 100%;
  // padding-top: 128px;
  // box-sizing: border-box;
}
</style>
