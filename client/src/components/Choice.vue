<template>
  <div style="margin: 5px">
    <label>
      <span>{{ label() }}</span>
      <el-radio-group
          v-model="innerValue"
          @input="change"
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
export default class Choice extends Vue {
  @Prop() props !: any;
  @Prop() value !: any;

  innerValue = "";

  change() {
    this.$emit('input', this.ppp);
  }

  label() {
    return this.props.label;
  }

  options() {
    return this.props.options;
  }
}
</script>
