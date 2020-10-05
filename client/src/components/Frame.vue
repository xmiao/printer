<template>
  <component :is="component" v-if="component" :data="data"/>
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Print extends Vue {
  @Prop() name = 'dynamic-link';
  @Prop() data;
  @Prop() type;

  // data() {
  //   return {
  //     component: null,
  //   }
  // }

  computed = {
    loader() {
      if (!this.type) {
        return null
      }
      return () => import(`templates/${this.type}`)
    },
  }

  mounted() {
    this.loader()
        .then(() => {
          this.component = () => this.loader()
        })
        .catch(() => {
          this.component = () => import('templates/default')
        })
  }
}
</script>
