<template>
  <div class="main">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside style="background-color: rgb(238, 241, 246)" width="400px">
        <el-card class="printer" header="打印设置">
          <div slot="header">
            <span>打印设置</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>

          <wn-file v-model="fileToPrint" :props="fl"></wn-file>
          <choice v-model="format" :props="cd"></choice>
          <choice v-model="orientation" :props="or"></choice>
          <choice v-model="pageToPrint" :props="pg"></choice>

          <div>
            <el-button @click="printFile">预览</el-button>
            <el-button @click="printFile">打印</el-button>
          </div>
        </el-card>
      </el-aside>

      <el-container>
        <el-main>
          <div class="pdf-panel">
            <iframe id="pdfviewer" height="100%" src="" width="100%"></iframe>
          </div>
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
  format = "";
  orientation = "";
  fileToPrint = {};
  pageToPrint = "";
  header = `
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
  footer = `<div style="
    font-size: 6pt;
    text-align: right;
    width: 100%;
    height: 20px;
    border-top: 1px solid black;
    color:black;
    font-family: Arial,serif;
    margin: 0 1cm;">第<span class="pageNumber"></span>页 共<span class="totalPages"></span>页 打印日期<span class="date"></span></div>`;
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
  pg = {
    label: "页码",
    options: [
      {
        "label": "奇数",
        "value": "odd"
      },
      {
        "label": "偶数",
        "value": "even"
      },
      {
        "label": "全部",
        "value": "all"
      }
    ]
  };
  @Prop() private msg!: string;

  async printFile(data: any) {
    const {header, footer, format, fileToPrint: {text: htmlFile = ""} = {} as any, orientation, pageToPrint} = this;
    const data2: any = {
      header,
      footer,
      htmlFile,
      format,
      orientation,
      doPrint: false,
      pageToPrint
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

    elem.src = `data:application/pdf;base64,${pdf}`;
    // elem.src = `http://localhost:3000/${path}`;
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

  .pdf-panel {
    height: 100%;

    iframe {
      border: none;
    }
  }
}

</style>
