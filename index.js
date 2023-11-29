const { Axios } = require("axios");
const axios = require("axios");
const { v4: uuidv4  } = require('uuid');
const crypto = require("crypto");


require("dotenv").config();

const invoice = {
  SessionId: "000001",
  ReferenceNo: "TEST001",
  Description: "Invoice Testing",
  Notes: "Payment for subscription",
  InvoiceDate: new Date().toISOString(),
  TaxPercent: 0.0,
  ClientDetails: {
    FirstName: "Dev1",
    LastName: "Test",
    Email: "testemail@gmail.com",
    PhoneCode: "+65",
    PhoneNo: "987654321",
    Address1: "test address",
    City: "test city",
    Country: "CA",
    PostalCode: "123456",
    DateOfBirth: "1985-03-10T00:00:00",
    Nationality: "CA",
    Occupation: "businessman",
  },
  InvoiceItems: [
    {
      Description: "Monthly fee",
      Qty: 1,
      Amount: 1.0,
    },
  ],
  KycDocuments: [],
};

const businessClientCode = process.env.AEGIS_BU_CODE;
const aegisSignatureUrl = `${process.env.AEGIS_API}`;
const AegisAppId = process.env.AEGIS_APP_ID;
const AegisAppKey = process.env.AEGIS_APP_KEY;
const main = () => {
  const APPId = AegisAppId;
  const APIKey = AegisAppKey;
  const businessCode = businessClientCode;

  let requestConfig;
  let headers = {
    "Content-Type": "application/json; charset=utf-8"
  };
  const nonce = uuidv4().replace(/-/g, "");
  const timeStamp = Math.floor(Date.now() / 1000);

  const jsonPayloadByteArray =Buffer.from(JSON.stringify(invoice));

  let contentBase64 = crypto
    .createHash("md5")
    .update(jsonPayloadByteArray)
    .digest("base64");

 let _aegisSignatureUrl = encodeURIComponent(
    aegisSignatureUrl.toLowerCase()
  ).toLowerCase();
  const method = "POST";

  //prepare the payload data. sequence below is required when generating the signature
  const rawPayloadData = `${APPId}${method}${_aegisSignatureUrl}${timeStamp}${nonce}${contentBase64}`;
  const secretKeyByteArray = Buffer.from(APIKey, "base64");
  console.log(rawPayloadData);

  const hmac = crypto.createHmac("sha256", secretKeyByteArray);
  hmac.update(rawPayloadData);
  const sigBase64 = hmac.digest("base64");

  (headers[
    "Authorization"
  ] = `hmac ${APPId}:${sigBase64}:${nonce}:${timeStamp}:${businessCode}`),
    (requestConfig = {
      method,
      url: this.aegisSignatureUrl,
      headers,
    });

  if (method === "POST" && invoice) {
    requestConfig.data = JSON.stringify(invoice);
  }

  axios
    .request({
      method: "POST",
      headers: {
        Authorization: `hmac ${APPId}:${sigBase64}:${nonce}:${timeStamp}:${businessCode}`,
        "Content-Type": "application/json",
      },
      url: `${process.env.AEGIS_API}`,
      data: invoice,
    })
    .then((response) => {
      // Handle successful response
      console.log("Response:", response.data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
  return;
};

main();
