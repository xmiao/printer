var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function processFile(fileList = [], rootData = {}) {
    let [file] = fileList;
    if (!file)
        return;
    var reader = new FileReader();
    reader.readAsText(file, "utf-8"); //gbk
    reader.onload = function () {
        return __awaiter(this, void 0, void 0, function* () {
            let { result } = this;
            rootData.htmlFile = result;
        });
    };
}
function printFile(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch("./getPDF", {
            body: JSON.stringify(data),
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        });
        if (!response)
            return;
        let { pdf, path } = yield response.json();
        let elem = document.getElementById("pdfviewer");
        // debugger;
        // debugger;
        // elem.src = `./全国医院信息化建设标准与规范-2018.pdf`;
        // elem.src = `data:application/pdf;base64,${btoa(encodeURIComponent(pdf))}`;
        elem.src = path;
    });
}
//# sourceMappingURL=m1.js.map