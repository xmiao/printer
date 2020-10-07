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
            <el-button @click="getHTML">打印</el-button>
          </div>
        </el-card>
      </el-aside>

      <el-container>
        <el-main>
          <gen-print :def="chartingDef"></gen-print>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ElementUI from 'element-ui';
import Choice from "@/components/Choice.vue";
import WnFile from "@/components/File.vue";
import chartingDef from "./charting.definition.json";
import GenPrint from "./GenPrint.vue";

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};
Vue.use(ElementUI);

@Component({
  components: {Choice, WnFile, GenPrint}
})
export default class Print extends Vue {
  chartingDef = chartingDef;

  async getHTML() {
    const gp = new GenPrint();
    gp.$props.def = chartingDef;

    const data2: any = {
      header: "",
      footer: "",
      htmlFile: gp.html(),
      format: "A4",
      orientation: "2",
      doPrint: false,
      pageToPrint: "all"
    };

    const response = await fetch("http://localhost:3000/getPDF", {
      body: JSON.stringify(data2), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    });

    if (!response) return;

    const {pdf, path} = await response.json();
    const elem: any = document.getElementById("iframe2");

    elem.src = `data:application/pdf;base64,${pdf}`;
  }
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
