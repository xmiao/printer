<template>
  <div class="main">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside style="background-color: rgb(238, 241, 246)" width="400px">
        <el-card class="printer">
          <div slot="header">
            <span>护理记录定义态</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>

          <div>
          </div>
        </el-card>
      </el-aside>

      <el-container>
        <el-main>
          this is a testa
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import ElementUI from 'element-ui';
import Choice from "@/components/Choice.vue";
import WnFile from "@/components/File.vue";

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};
Vue.use(ElementUI);
@Component({
  components: {Choice, WnFile}
})
export default class Print extends Vue {
  @Prop() private msg!: string;

  format = "";
  orientation = "";
  fileToPrint = {};
  pageToPrint = "";
}

</script>

<style lang="scss" scoped>
.main {
  position: absolute;
  top: 3em;
  bottom: 0;
  left: 0;
  right: 0;

  .el-card {
    margin: 10px;
  }

}

</style>
