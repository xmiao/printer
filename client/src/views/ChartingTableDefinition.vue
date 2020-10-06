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
          <div v-html="html()"/>
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
import chartingDef from "./charting.definition.json";

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};
Vue.use(ElementUI);

class HandleDef {
  private readonly def = [];

  constructor(def: any) {
    this.def = def;
  }

  psLabel(article: any) {
    if (!article) return "";
    let {text, html} = article;
    if (html) return html;
  }

  psPanel(t: any) {
    if (!t) return "";

    let {tag, article, form, charting} = t;
    if (tag !== "panel") {
      return `<div>should be panel.</div>`
    }

    if (article || form || charting)
      return [
        this.psLabel(article),
        this.psForm(form),
        this.psCharting(charting)
      ].join("");

    return `<div style="border: 1px solid red">${JSON.stringify(t)}</div>`;
  }

  psForm(form: any) {
    if (!form) return "";
    let {fields = []} = form;
    return fields
        .map(({label, text, template}: any) => {
          return `<div><div>${label}</div><div>${text}</div></div>`
        })
        .join("");
  }

  psCharting(charting: any) {
    if (!charting) return "";
    let {items = []} = charting;
    let hd = items
        .map(({displayName, html, metaData}: any) => {
          return `<th>${html || displayName}</th>`
        })
        .join("");

    return `
<table>
  <thead>
     <tr>${hd}</tr>
  </thead>
</table>`
  }

  psChartingItems() {

  }

  psMetaData() {

  }

  html() {
    let l = this
        .def
        .map(t => {
          let {tag, article, panel, charting, form} = t;
          return this.psPanel(t);
        });
    return `<div>${l.join("")}</div>`;
  }
}

@Component({
  components: {Choice, WnFile}
})
export default class Print extends Vue {
  @Prop() private msg!: string;

  chartingDef = chartingDef;

  html() {
    const hd = new HandleDef(chartingDef);
    return hd.html();
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
