function processFile(fileList = [], rootData = {}) {
    let [file] = fileList;
    if (!file) return;

    var reader = new FileReader();
    reader.readAsText(file, "utf-8"); //gbk
    reader.onload = async function () {
        let {result} = this;

        rootData.htmlFile = result;
    }
}

async function printFile(data) {
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
    elem.src = path;
}
