<template>
  <div class="about">
    <h1>{{ message }}</h1>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
  components: {AFrame}
})

@Component
export default class AFrame extends Vue {
  data = {}
  @Prop() private message!: string;

  component(id: string) {
    return import("./Test.vue")
  }
}

</script>
