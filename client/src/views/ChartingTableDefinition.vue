<template>
  <div class="main">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside style="background-color: rgb(238, 241, 246)" width="400px">
        <el-card class="printer">
          <div slot="header">
            <span>护理记录定义态</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>

          <wn-file v-model="xlsxFile" :props="params('fl')" @ready="processXlsx"></wn-file>
          <wn-choice v-model="printMode" :props="params('pm')"></wn-choice>
          <wn-text v-model="range" :props="params('rg')"></wn-text>

          <div>
            <el-button @click="getHTML">打印</el-button>
          </div>
        </el-card>
      </el-aside>

      <el-container>
        <el-main>
          <gen-print :data="chartingData" :def="chartingDef" :mode="printMode"></gen-print>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ElementUI from 'element-ui';
import WnFile from "@/components/File.vue";
import chartingDef from "./charting.definition.json";
import GenPrint from "./GenPrint.vue";
import * as XLSX from "xlsx";
import WnChoice from "@/components/Choice.vue";
import print from "./print.json";
import print2 from "./print2.json";
import WnText from "@/components/Text.vue";

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};
Vue.use(ElementUI);

@Component({
  components: {WnChoice, WnFile, GenPrint, WnText}
})
export default class ChartingTableDefinition extends Vue {
  chartingDef = chartingDef;
  xlsxFile: any = {};
  chartingData: any = [];
  printMode: any = "";
  range: any = "";

  params(p: any): any {
    return (print as any)[p];
  }

  async getHTML() {
    const gp = new GenPrint();
    const {chartingDef: def, range, chartingData: data, printMode: mode} = this;
    Object.assign(gp.$props, {def, data, range});
    const f1 = gp.html();

    const data2: any = {
      ...print2,
      htmlFile: f1,
      format: "A4",
      orientation: "2",
      doPrint: false,
      range,
      pageToPrint: "all",
      gen2: true
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

  processXlsx({raw}: any) {
    const {xlsxFile: {text = ""} = {}} = this;
    if (!text) return;
    const workbook = XLSX.read(text, {type: 'binary'});
    const name = workbook.SheetNames[0];
    this.chartingData = XLSX.utils.sheet_to_json(workbook.Sheets[name], {raw: false});
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
