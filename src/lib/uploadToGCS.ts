import { Storage } from "@google-cloud/storage";

import { v4 as uuidv4 } from "uuid";

// const credentials = {
//   type: process.env.type,
//   project_id: process.env.project_id,
//   private_key_id: process.env.private_key_id,
//   private_key: process.env.private_key.replace(/\\n/g, "\n"),
//   client_email: process.env.client_email,
//   client_id: process.env.client_id,
//   auth_uri: process.env.auth_uri,
//   token_uri: process.env.token_uri,
//   auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
//   client_x509_cert_url: process.env.client_x509_cert_url,
//   universe_domain: process.env.universe_domain,
// };

const serviceAccountBuffer = Buffer.from(
  process.env.encoded_service_account_key,
  "base64"
).toString("utf8");

const credentials = JSON.parse(serviceAccountBuffer);
const projectId = process.env.project_id;
// console.log(credentials.private_key);

const storage = new Storage({ projectId, credentials });
const bucketName = process.env.bucket_name;
console.log(bucketName);
const bucket = storage.bucket(bucketName);
export const uploadToGCS = async () => {
  const filePath = "./output/untitled.1.png";
  const fileName = `${uuidv4()}.png`;
  await bucket.upload(filePath, {
    destination: fileName,
  });

  // console.log(credentials);
  console.log(`${fileName} uploaded to ${bucket.name}.`);

  // return `https://storage.googleapis.com/`;
  return `https://storage.cloud.google.com/${bucket.name}/${fileName}`;
};
