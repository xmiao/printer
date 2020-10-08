<template>
  <div class="wn-text">
    <label>
      <span>{{ label() }}</span>
      <el-input
          v-model="innerValue"
          disable-transitions
          size="small" @input="input">
      </el-input>
    </label>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class WnText extends Vue {
  @Prop() props !: any;
  @Prop() value !: any;

  innerValue = "";

  input() {
    this.$emit('input', this.innerValue);
  }

  label() {
    return this.props.label;
  }
}
</script>

<style lang="scss" scoped>
.wn-text {
  text-align: left;
  margin: 3px 1em;

  span:nth-child(1) {
    display: inline-block;
    min-width: 5rem;
    text-align: right;
  }

  span:nth-child(1):after {
    content: ": ";
    display: inline-block;
    margin-right: 0.5rem;
  }
}
</style>
