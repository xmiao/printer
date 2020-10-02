<template>
  <div class="main">
    <div id="input-panel" class="input-panel">
      <h4>
        Remote Printing Service
      </h4>

      <input accept="text/html" type="file" @change="processFile($event.target.files, $data)">

      <label>
        纸张：
        <input v-model="format" type="text">
      </label>

      <label>
        横向：
        <input v-model="landscape" type="checkbox">
      </label>

      <label>
        触发打印：
        <input v-model="doPrint" type="checkbox">
      </label>

      <button @click="printFile($data)">打印</button>

      <!--        <div>-->
      <!--            {{$data}}-->
      <!--        </div>-->
    </div>

    <div class="pdf-panel">
      <iframe id="pdfviewer" height="100%" src="" width="100%"></iframe>
    </div>

    <script>
      new Vue({
        el: "#input-panel",
        data: {
          "header": `<div style="font-size: 12pt; width: 100%; height: 30px;text-align: center;background-color: black; border-bottom: 1px solid black;margin: 0 1cm;\">人民医院门诊病历</div>`,
          "footer": `<div style=\"font-size: 6pt;text-align: right;width: 100%;height: 20px;border-top: 1px solid black;color:black;font-family: Arial,serif;margin: 0 1cm;\">第<span class=\"pageNumber\"></span>页 共<span class=\"totalPages\"></span>页 打印日期<span class=\"date\"></span></div>`,
          htmlFile: "",
          format: "A4",
          landscape: false,
          doPrint: false
        }
      });
    </script>
  </div>
</template>

<script lang="ts">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
