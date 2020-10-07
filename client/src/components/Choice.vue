<template>
  <div class="wn-choice">
    <label>
      <span>{{ label() }}</span>
      <el-radio-group
          v-model="innerValue"
          @input="input"
          disable-transitions size="small">
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
export default class WnChoice extends Vue {
  @Prop() props !: any;
  @Prop() value !: any;

  innerValue = "";

  input() {
    const label2val = {} as { [key: string]: string };
    for (const {label, value} of this.props.options) {
      label2val[label] = value;
    }
    this.$emit('input', label2val[this.innerValue] || "");
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
