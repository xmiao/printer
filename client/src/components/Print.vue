<template>
  <div class="main">
    <el-card class="printer" header="打印设置">
      <div slot="header" class="ok">
        <span>打印设置</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>

      <wn-file v-model="htmlFile" :props="fl"></wn-file>
      <choice v-model="ok1" :props="cd"></choice>
      <choice v-model="ok2" :props="or"></choice>

      <div>
        <el-button @click="printFile">预览</el-button>
        <el-button @click="printFile">打印</el-button>
      </div>

      <div class="pdf-panel">
        <iframe id="pdfviewer" height="100%" src="" width="100%"></iframe>
      </div>
    </el-card>
    {{ JSON.stringify({ok1, ok2, htmlFile}) }}
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import ElementUI from 'element-ui';

import * as formSch2 from './form-sch.json';
import Choice from "@/components/Choice.vue";
import WnFile from "@/components/File.vue";

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};
Vue.use(ElementUI);
@Component({
  components: {Choice, WnFile}
})
export default class Print extends Vue {
  @Prop() private msg!: string;

  ok1 = "";
  ok2 = "";
  htmlFile = "";

  fl = {
    label: "文件"
  };

  cd = {
    label: "纸张",
    options: [
      {
        "value": "A4",
        "label": "A4"
      },
      {
        "value": "A5",
        "label": "A5"
      }
    ]
  };

  or = {
    label: "方向",
    options: [
      {
        "label": "横向",
        "value": "1"
      },
      {
        "label": "纵向",
        "value": "2"
      }
    ]
  };

  format = '';
  landscape = "";

  formSch(idx: string): any {
    return formSch2.format.enum;
  }

  handleClick() {
    console.log("ok");
  }

  async printFile(data: any) {
    debugger;
    const data2: any = {
      header: "",
      footer: "",
      htmlFile: "",
      format: "A4",
      landscape: false,
      doPrint: false
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
    const elem: any = document.getElementById("pdfviewer");

    // elem.src = `data:application/pdf;base64,${btoa(encodeURIComponent(pdf))}`;
    elem.src = path;
  }
}

const header = `
<div style="
    font-size: 12pt;
    width: 100%;
    height: 30px;
    text-align: center;
    background-color: black;
    border-bottom: 1px solid black;
    margin: 0 1cm;">
    人民医院门诊病历
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

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
  .el-card__header {
    background-color: yellowgreen;
  }

  label {
    display: inline-block;

    span:nth-child(1) {
      display: inline-block;
      min-width: 8em;
      text-align: right;
    }

    :nth-child(2) {
      display: inline-block;
      //max-width: 8em;
    }
  }
}

</style>
