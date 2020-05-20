import {readFileSync, writeFileSync} from "fs";

let noteText = readFileSync("../../data/病历结构数据.json", "utf-8");
let note2 = JSON.parse(noteText);

// let note2: any = {
//     a : null,
//     b: "aaa"
// };

let st = new Set(["ceConceptId", "ceName", "properties", "ontologies", "lastUnit", "entries"]);

function removeNulls(obj: any) {
    if (obj === null) return;
    if (!(obj instanceof Object || obj instanceof Array)) return;

    if (obj instanceof Array) {
        for (let k in obj) {
            let o = obj[k];
            if (o === null) {
                obj.splice(+k, 1);
                continue;
            }
            removeNulls(o)
        }
        return;
    }

    if (obj instanceof Object) {
        for (let k in obj) {
            let o = obj[k];
            if (o === null) {
                delete obj[k];
                continue;
            }
            if (!st.has(k)) {
                delete obj[k];
                continue;
            }
            removeNulls(o);
        }
    }
}

removeNulls(note2);
writeFileSync("../../data/processed.json", JSON.stringify(note2, null, " "));
