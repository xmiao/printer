<template>
  <iframe id="iframe2" :src="htmlEnc()"></iframe>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import ElementUI from 'element-ui';

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};
Vue.use(ElementUI);

@Component({
  components: {}
})
export default class GenPrint extends Vue {
  @Prop() private def: any;
  @Prop() private data: any;
  @Prop() private mode: any;

  @Watch("data")
  onDataChanged(value: string, oldValue: string) {
    this.$forceUpdate();
  }

  @Watch("mode")
  onModeChanged(value: string, oldValue: string) {
    this.$forceUpdate();
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

    return `<div style="border: 1px solid red">Not handled:${JSON.stringify(t)}</div>`;
  }

  psForm(form: any) {
    if (!form) return "";
    const {fields = []} = form;
    return fields
        .map(({label, text, template}: any) => {
          return `<div class="label-text">
                <div>${label}</div>
                <div>${text}</div>
            </div>`
        })
        .join("");
  }

  psCharting(charting: any) {
    if (!charting) return "";

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
    const metaDataIndex = {} as any;

    function rc2(node: any): any {
      const {
        items: i1 = [], _info: {width, height, x, y}, displayName, html,
        metaData: {id} = {} as any
      } = node || {};
      const rowspan = totalHeight - (y + height) + 1;
      const colspan = width;
      if (!rowData[y]) rowData[y] = [];
      const html2 = `<th${rowspan > 1 && ` rowspan="${rowspan}"` || ""}${colspan > 1 && ` colspan="${colspan}"` || ""}>${html || displayName}</th>`;
      node._info.html = html2;
      rowData[y][x] = html2;

      metaDataIndex[x] = {id};

      for (const i of i1) {
        if (!rowspan || rowspan < 1) continue;
        const {_info = {}} = i;
        _info.y += rowspan - 1;
        rc2(i);
      }
    }
    rc2(charting);

    const hd2 = rowData
        .filter(x => x.length > 1)
        .map(x => `<tr>${x.join(" ")}</tr>`)
        .join("\n");

    const data = this.data || Array(0)
        .fill({});

    const rbuf = [];
    for (const dataItem of data) {
      const cbuf = [];
      for (let c = 0; c < totalWidth; c++) {
        const {[c]: {id = ""} = {}} = metaDataIndex;
        const elem = dataItem[id];
        cbuf.push(elem === undefined ? "&nbsp;" : elem);
      }
      rbuf.push(cbuf);
    }
    const textBody = rbuf
        .map((x, i) => {
          const c = x
              .map(x => `<td><span class="business-content">${x}</span></td>`)
              .join("");
          return `<tr>${c}</tr>`;
        })
        .join("");

    return `
<style>
* {
    font-family: STSong;
}
body{
    padding: 0 1cm;
}
table{
    width: 100%;
    border-collapse: collapse;
}
td, th {
    border: 1px solid black;
}
.label-text {
    display: inline-block;
    margin: 2px;
}
.label-text > div{
    display: inline-block;
}
.label-text div:nth-child(1){
    width: 5rem;
    text-align: right;
    border: none;
}
.label-text div:nth-child(1):after{
    content: ": ";
    white-space: pre;
}
.label-text div:nth-child(2){
    min-width: 5rem;
    text-align: left;
    padding: 0 0.2rem;
    border-bottom: 1px solid black;
}
h1 {
    text-align: center;
}

</style>
<style forprint></style>
<div>
<table>
  <thead>
     ${hd2}
  </thead>
  <tbody>
    ${textBody}
  </tbody>
</table>
</div>
`;
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
        .map((t: any) => {
          const {tag, article, panel, charting, form} = t;
          return this.psPanel(t);
        });
    return `<div>${l.join("")}</div>`;
  }

  htmlEnc() {
    return `data:text/html;charset=utf-8,${encodeURIComponent(this.html())}`;
  }
}
</script>

<style lang="scss" scoped>
iframe {
  height: 100%;
  width: 100%;
  border: none;
}
</style>
