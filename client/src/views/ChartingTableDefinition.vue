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
    const {text, html} = article;
    if (html) return html;
  }

  psPanel(t: any) {
    if (!t) return "";

    const {tag, article, form, charting} = t;
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
    const {fields = []} = form;
    return fields
        .map(({label, text, template}: any) => {
          return `<div><div>${label}</div><div>${text}</div></div>`
        })
        .join("");
  }

  psCharting(charting: any) {
    if (!charting) return "";
    const {items = []} = charting;

    function rc(node: any, pos: any): any {
      const {items: i1 = []} = node || {};
      let width = 0, height = 1;
      const {x = 0, y = 0} = pos;
      for (const i of i1) {
        const {width: w2, height: h2} = rc(i, {x: x + width, y: y + 1});
        width += w2;
        height = Math.max(height, h2 + 1);
      }
      width = Math.max(1, width);
      node._info = {width, height, x, y};
      return {width, height, x, y};
    }

    const {width: totalWidth, height: totalHeight} = rc(charting, {});
    const rowData: any[] = [];

    function rc2(node: any): any {
      const {items: i1 = [], _info: {width, height, x, y}, displayName, html, metaData} = node || {};
      const rowspan = totalHeight - (y + height) + 1;
      const colspan = width;
      if (!rowData[y]) rowData[y] = [];
      const html2 = `<th${rowspan > 1 && ` rowspan="${rowspan}"` || ""}${colspan > 1 && ` colspan="${colspan}"` || ""}>${html || displayName}</th>`;
      node._info.html = html2;
      rowData[y][x] = html2;
      for (const i of i1) {
        rc2(i);
      }
    }

    rc2(charting);
    console.log(JSON.stringify(charting, null, "  "));
    console.log(JSON.stringify({totalWidth, totalHeight}, null, "  "));

    const hd2 = rowData.map(x => x.join("")).join("")
    const hd = items
        .map(({displayName, html, metaData}: any) => {
          return `<th>${html || displayName}</th>`
        })
        .join("");
    console.log(JSON.stringify(rowData));

    return `
<table>
  <thead>
     <tr>${hd2}</tr>
  </thead>
</table>`
  }

  psChartingItems() {
    debugger;
  }

  psMetaData() {
    debugger;
  }

  html() {
    const l = this
        .def
        .map(t => {
          const {tag, article, panel, charting, form} = t;
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
