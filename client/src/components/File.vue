<template>
  <div class="wn-choice">
    <label>
      <span>{{ label() }}</span>
      <el-radio-group
          v-model="innerValue"
          disable-transitions
          size="small" @input="input">
        <el-radio-button
            v-for="item in options()"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-radio-button>
      </el-radio-group>
    </label>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Choice extends Vue {
  @Prop() props !: any;
  @Prop() value !: any;

  innerValue = "";

  input() {
    this.$emit('input', this.innerValue);
  }

  label() {
    return this.props.label;
  }

  options() {
    return this.props.options;
  }
}
</script>

<style lang="scss" scoped>
.wn-choice {
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
