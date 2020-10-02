function processFile(fileList: any[] = [], rootData: any = {}) {
    let [file] = fileList;
    if (!file) return;

    var reader = new FileReader();
    reader.readAsText(file, "utf-8"); //gbk
    reader.onload = async function () {
        let {result} = this;

        rootData.htmlFile = result;
    }
}

async function printFile(data: any) {

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

    let elem: any = document.getElementById("pdfviewer");

    // debugger;

    // debugger;
    // elem.src = `./全国医院信息化建设标准与规范-2018.pdf`;
    // elem.src = `data:application/pdf;base64,${btoa(encodeURIComponent(pdf))}`;
    elem.src = path;

}
