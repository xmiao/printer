<template>
  <label>
    <span>纸张：</span>
    <el-radio-group
        v-model="format"
        disable-transitions size="small">
      <el-radio-button
          v-for="item in enumData2()"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      >
      </el-radio-button>
    </el-radio-group>
  </label>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Choice extends Vue {
  data = {}
  compType = true;
  format = "";

  @Prop() private type !: string;
  @Prop() private enumData !: object[];

  enumData2() {
    return this.enumData;
  }
}
</script>
