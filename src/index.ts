import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { pdfToImage } from "./lib/pdfToPic";
import { uploadToGCS } from "./lib/uploadToGCS";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/create-thumbnail", async (req, res) => {
  try {
    const url = req.body.pdfUrl;
    const response = await fetch(url); // Fetch the PDF
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await pdfToImage(buffer); // Convert the buffer to an image

    //this is where we would upload the image to google cloud storage and return the url
    //this logic will use the image stored in the output directory and then delelete it, but in production we would use buffer data
    const imageUrl = await uploadToGCS();
    console.log(imageUrl);
    res.status(200).send({ url: imageUrl });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ status: "error", message: "Failed to convert PDF to image." });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
