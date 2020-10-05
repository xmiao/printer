<template>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import ElementUI from 'element-ui';

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};
Vue.use(ElementUI);

@Component
export default class Print extends Vue {
  @Prop() private msg!: string;
}

</script>

<style lang="scss" scoped>

</style>
