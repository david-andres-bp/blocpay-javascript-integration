const { Axios } = require("axios");
const axios = require("axios");
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
const aegisSignatureUrl = `${process.env.AEGIS_API}/v2/invoices/${this.businessClientCode}/create`;
const AegisAppId = process.env.AEGIS_APP_ID;
const AegisAppKey = process.env.AEGIS_APP_KEY;
const main = () => {
  const APPId = AegisAppId;
  const APIKey = AegisAppKey;
  const businessCode = businessClientCode;

  let requestConfig;
  let headers = {
    "Content-Type": "application/json; charset=utf-8",
    // 'Content-Length': 554
  };
  const nonce = uuidv4().replace(/-/g, "");

  const timeStamp = Math.floor(Date.now() / 1000);
  let contentBase64 = crypto
    .createHash("md5")
    .update(JSON.stringify(data))
    .digest();

  let aegisSignatureUrl = encodeURIComponent(
    aegisSignatureUrl.toLowerCase()
  ).toLowerCase();
  const method = "POST";

  //prepare the payload data. sequence below is required when generating the signature
  const rawPayloadData = `${APPId}${method}${aegisSignatureUrl}${timeStamp}${nonce}${contentBase64}`;
  const secretKeyByteArray = Buffer.from(APIKey, "base64");

  const hmac = crypto.createHmac("sha256", secretKeyByteArray);
  hmac.update(rawPayloadData);
  const sigBase64 = hmac.digest("base64");

  (headers[
    "Authorization"
  ] = `hmac 9958f4c7-aecb-4d13-99e6-c0f6f9ac44eb:wjriBk1nhORWbVdsqeMLOabkCGRbycKXm+YOW2U/9WM=:21eaeb1ef86a458e954689351eb72456:1700487097:2302OMNI`),
    (requestConfig = {
      method,
      url: this.aegisSignatureUrl,
      headers,
    });

  if (method === "POST" && data) {
    requestConfig.data = JSON.stringify(data);
  }

  axios
    .request({
      method: "POST",
      headers: {
        Authorization: `hmac 9958f4c7-aecb-4d13-99e6-c0f6f9ac44eb:GYpayD9UaBNaLWVv+U+3DBB1MLuEe8nEz66p3VGLCN0=:8fdeaab02ff74294a4b1bb9f375f0603:1700487263:2302OMNI`,
        "Content-Type": "application/json",
      },
      url: "https://aegis-integration.azurewebsites.net/v2/invoices/2302OMNI/create",
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
