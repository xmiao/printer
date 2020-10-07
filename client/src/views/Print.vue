<template>
  <div class="main">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside style="background-color: rgb(238, 241, 246)" width="400px">
        <el-card class="printer" header="打印设置">
          <div slot="header">
            <span>打印设置</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>

          <wn-file v-model="fileToPrint" :props="params('fl')"></wn-file>
          <wn-choice v-model="format" :props="params('cd')"></wn-choice>
          <wn-choice v-model="orientation" :props="params('or')"></wn-choice>
          <wn-choice v-model="pageToPrint" :props="params('pg')"></wn-choice>

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
import {Component, Vue} from 'vue-property-decorator';
import ElementUI from 'element-ui';
import WnChoice from "@/components/Choice.vue";
import WnFile from "@/components/File.vue";
import print from "./print.json";
import print2 from "./print2.json";

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};
Vue.use(ElementUI);
@Component({
  components: {WnChoice, WnFile}
})
export default class Print extends Vue {
  format = "";
  orientation = "";
  fileToPrint = {};
  pageToPrint = "";
  printMode = "";

  params(p: any): any {
    return (print as any)[p];
  }

  async printFile(data: any) {
    const {
      format,
      fileToPrint: {text: htmlFile = ""} = {} as any,
      orientation,
      pageToPrint,
      printMode
    } = this;
    const data2: any = {
      ...print2,
      htmlFile,
      format,
      orientation,
      doPrint: false,
      pageToPrint,
      printMode
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
