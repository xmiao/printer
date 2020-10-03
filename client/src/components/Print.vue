<template>
  <div class="main">
    <el-card class="printer" header="打印设置">
      <div slot="header" class="ok">
        <span>打印设置</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>

      <el-upload
          ref="upload"
          :http-request="upload"
          :on-change="handleChange"
          action="#">
        <el-button size="small" type="primary">
          点击上传
        </el-button>
      </el-upload>

      <label>
        <span>纸张：</span>

        <el-select v-model="format" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <!--        <el-input v-model="format" type="text"></el-input>-->
      </label>

      <label>
        <span>横向：</span>
        <!--        <input v-model="landscape" type="checkbox">-->
      </label>

      <div>
        <el-button @click="printFile($data)">预览</el-button>
        <el-button @click="printFile($data)">打印</el-button>
      </div>

      <div class="pdf-panel">
        <iframe id="pdfviewer" height="100%" src="" width="100%"></iframe>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
// import { Button } from 'element-ui';
import ElementUI from 'element-ui';

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};
// Vue.use(Button);
Vue.use(ElementUI);

@Component
export default class Print extends Vue {
  @Prop() private msg!: string;

  handleChange() {
    const {uploadFiles} = this.$refs.upload as any;
  }

  data: any = {
    header: "",
    footer: "",
    htmlFile: "",
    format: "A4",
    landscape: false,
    doPrint: false
  };
  options = [{
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶'
  }, {
    value: '选项3',
    label: '蚵仔煎'
  }, {
    value: '选项4',
    label: '龙须面'
  }, {
    value: '选项5',
    label: '北京烤鸭'
  }];
  format = '';

  handleClick() {
    console.log("ok");
  }

  upload() {
    const {uploadFiles} = this.$refs.upload as any;
    if (uploadFiles.length > 1)
      uploadFiles.shift();
    const [{name}] = uploadFiles;
    console.log(name);
  }

  // processFile(fileList = [], rootData: any = {}) {
  //   debugger;
  //
  //   const [file] = fileList;
  //   if (!file) return;
  //
  //   const reader = new FileReader();
  //   reader.readAsText(file, "utf-8"); //gbk
  //   reader.onload = async function () {
  //     const {result} = this;
  //     rootData.htmlFile = result;
  //   }
  // }

  async printFile(data: any) {
    const response = await fetch("./getPDF", {
      body: JSON.stringify(data), // must match 'Content-Type' header
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
    display: block;
    text-align: left;

    span:nth-child(1) {
      display: inline-block;
      min-width: 8em;
      text-align: right;
    }

    :nth-child(2) {
      display: inline-block;
      max-width: 8em;
    }
  }
}

</style>
