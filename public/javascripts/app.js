function processFile(e) {
    let {files: [file] = []} = e || {};
    if (!file) return;

    var reader = new FileReader();
    reader.readAsText(file, "utf-8"); //gbk
    reader.onload = async function () {
        let {result} = this;

        let data = {
            "header": `<div style="font-size: 12pt; width: 100%; height: 30px;text-align: center;background-color: black; border-bottom: 1px solid black;margin: 0 1cm;\">人民医院门诊病历</div>`,
            "footer": `<div style=\"font-size: 6pt;text-align: right;width: 100%;height: 20px;border-top: 1px solid black;color:black;font-family: Arial,serif;margin: 0 1cm;\">第<span class=\"pageNumber\"></span>页 共<span class=\"totalPages\"></span>页 打印日期<span class=\"date\"></span></div>`,
            "htmlFile": `${result}`,
            "doPrint": false
        }

        let response = await fetch("./getPDF", {
            body: JSON.stringify(data), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
        });
        if (!response) return;

        let {pdf, path} = await response.json();

        let elem = document.getElementById("pdfviewer");

        // debugger;

        // debugger;
        // elem.src = `./全国医院信息化建设标准与规范-2018.pdf`;
        // elem.src = `data:application/pdf;base64,${btoa(encodeURIComponent(pdf))}`;
        elem.src = path;
    }
}
