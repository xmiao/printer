<template>
  <div class="about">
    <h1>afefewa {{ message }}</h1>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
  // components: {AFrame}
})

@Component
export default class Test extends Vue {
  data = {}
  @Prop() private message!: string;

  component(id: string) {
    return import("./Test.vue")
  }
}

</script>
