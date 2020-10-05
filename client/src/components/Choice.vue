<template>
  <div>
    <label>
      <span>{{ label() }}</span>
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
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Choice extends Vue {
  @Prop() props = {
    label: "label",
    options: []
  };

  @Prop() private type !: string;
  @Prop() private enumData !: object[];

  label() {
    return this.props.label;
  }

  enumData2() {
    return this.enumData;
  }
}
</script>
