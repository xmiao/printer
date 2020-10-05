<template>
  <div class="wn-container">
    <label>
      <span>{{ label() }}</span>
      <el-upload
          ref="upload"
          :http-request="upload"
          :on-change="handleChange"
          action="#">
        <el-button size="small">
          点击上传
        </el-button>
      </el-upload>
    </label>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class WnFile extends Vue {
  @Prop() props !: any;
  @Prop() value !: any;

  innerValue = "";

  input() {
    this.$emit('input', this.innerValue);
  }

  label() {
    return this.props.label;
  }

  handleChange() {
    const {uploadFiles} = this.$refs.upload as any;
  }

  upload() {
    const {uploadFiles} = this.$refs.upload as any;
    debugger;
    if (uploadFiles.length > 1)
      uploadFiles.shift();
    const [{name}] = uploadFiles;
  }
}
</script>

<style lang="scss" scoped>
.wn-container {
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
