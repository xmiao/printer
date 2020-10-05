<template>
  <component :is="component" :data="data"/>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Comp extends Vue {
  data = {}
  compType = true;

  @Prop() private type !: string;

  component(id: string) {
    let idx = 0;
    if (this.type === "ok") {
      idx = 1;
    }
    if (idx === 0) {
      return import("../views/About.vue");
    } else {
      return import("./Test.vue");
    }
    // return import(["../views/About", "./Test"][idx]+".vue");
  }
}
</script>
