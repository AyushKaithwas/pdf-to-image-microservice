"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Import the node-fetch package
const pdfToPic_1 = require("./lib/pdfToPic"); // Adjust this path as needed
const uploadToGCS_1 = require("./lib/uploadToGCS");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.post("/create-thumbnail", async (req, res) => {
    try {
        const url = req.body.pdfUrl;
        const response = await fetch(url); // Fetch the PDF
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await (0, pdfToPic_1.pdfToImage)(buffer); // Convert the buffer to an image
        //this is where we would upload the image to google cloud storage and return the url
        //this logic will use the image stored in the output directory and then delelete it, but in production we would use buffer data
        const imageUrl = await (0, uploadToGCS_1.uploadToGCS)();
        console.log(imageUrl);
        res.status(200).send({ status: "ok" });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .send({ status: "error", message: "Failed to convert PDF to image." });
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map