<template>
  <component :is="component" v-if="component" :data="data"/>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class AFrame extends Vue {
  data = {}

  component(id: string) {
    return import("../views/About.vue")
  }
}
</script>
