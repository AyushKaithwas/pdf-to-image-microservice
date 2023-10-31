import { fromBuffer } from "pdf2pic";
import { mkdirsSync } from "fs-extra";
import { rimraf } from "rimraf";

const outputDirectory = "./output";

export const pdfToImage = async (pdfBuffer: any) => {
  rimraf.sync(outputDirectory);

  mkdirsSync(outputDirectory);

  const baseOptions = {
    width: 1275,
    height: 1650,
    density: 220,
    savePath: outputDirectory,
  };

  const convert = fromBuffer(pdfBuffer, baseOptions);

  return convert(1);
};
