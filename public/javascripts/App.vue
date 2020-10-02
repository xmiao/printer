<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // formView
    }
  }
}
</script>

<style lang="less">
#app {
  text-align: center;

  .firsttit {
    color: #42B983;
    font-size: 20px;

    .secondtit {
      color: pink;
      font-size: 15px;
    }
  }
}
</style>
