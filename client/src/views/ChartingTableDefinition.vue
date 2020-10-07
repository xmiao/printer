<template>
  <div class="main">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside style="background-color: rgb(238, 241, 246)" width="400px">
        <el-card class="printer">
          <div slot="header">
            <span>护理记录定义态</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>

          <wn-file v-model="xlsxFile" :props="fl" @ready="processXlsx"></wn-file>

          <div>
            <el-button @click="getHTML">打印</el-button>
          </div>
        </el-card>
      </el-aside>

      <el-container>
        <el-main>
          <gen-print :data="chartingData" :def="chartingDef"></gen-print>
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
import * as XLSX from "xlsx";

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};
Vue.use(ElementUI);

@Component({
  components: {Choice, WnFile, GenPrint}
})
export default class ChartingTableDefinition extends Vue {
  chartingDef = chartingDef;
  xlsxFile: any = {};
  fl = {
    label: "文件"
  };
  chartingData: any = {};

  async getHTML() {
    const gp = new GenPrint();
    gp.$props.def = chartingDef;
    const header = `
<div style="
    font-size: 12pt;
    width: 100%;
    height: 30px;
    text-align: center;
    background-color: black;
    border-bottom: 1px solid black;
    margin: 0 1cm;">
    人民医院
</div>`;
    const footer = `<div style="
    font-size: 6pt;
    text-align: right;
    width: 100%;
    height: 20px;
    border-top: 1px solid black;
    color:black;
    font-family: Arial,serif;
    margin: 0 1cm;">第<span class="pageNumber"></span>页 共<span class="totalPages"></span>页 打印日期<span class="date"></span></div>`;

    const data2: any = {
      header,
      footer,
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

  processXlsx({raw}: any) {
    const {xlsxFile: {text = ""} = {}} = this;
    if (!text) return;
    const workbook = XLSX.read(text, {type: 'array'});
    const name = workbook.SheetNames[0];
    this.chartingData = XLSX.utils.sheet_to_json(workbook.Sheets[name], {header: "A"});
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
