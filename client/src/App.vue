<template>
  <div id="app">
    <div id="nav">
      <span v-for="route in routes" :key="route.path">
      | <router-link :to="route.path">{{ route.name }}</router-link>
      </span>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import {routes} from "@/router";

export default class App extends Vue {
  routes = routes;
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#nav {
  padding: 10px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
