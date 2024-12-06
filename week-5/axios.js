/** @format */

const axios = require("axios");

async function axiosRequest() {
  const response = await axios.post(
    " https://httpdump.app/dumps/a5ec8888-e6ca-435e-8c94-d671bfcdf788",
    {
      username: "ansarirashid",
      password: "123456",
    },
    {
      headers: {
        Authorization: "Bearer 123",
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
}

axiosRequest();
