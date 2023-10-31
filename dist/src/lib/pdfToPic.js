"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfToImage = void 0;
const pdf2pic_1 = require("pdf2pic");
const fs_extra_1 = require("fs-extra");
const rimraf_1 = require("rimraf");
const outputDirectory = "./output";
const pdfToImage = async (pdfBuffer) => {
    rimraf_1.rimraf.sync(outputDirectory);
    (0, fs_extra_1.mkdirsSync)(outputDirectory);
    const baseOptions = {
        width: 1275,
        height: 1650,
        density: 220,
        savePath: outputDirectory,
    };
    const convert = (0, pdf2pic_1.fromBuffer)(pdfBuffer, baseOptions);
    return convert(1);
};
exports.pdfToImage = pdfToImage;
//# sourceMappingURL=pdfToPic.js.map