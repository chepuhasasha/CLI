import axios from "axios";
import qs from "qs";
import cnsl from "./log.service.js";

const getCourse = async function (pair, limit) {
  const data = { pair, limit };
  const options = {
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(data),
    url: "https://api.exmo.com/v1/trades",
  };
  console.log("waiting for server response...");
  await axios(options)
    .then(function (response) {
      console.log("\x1Bc");
      const data = response.data;
      Object.keys(data).forEach((key) => {
        cnsl.course({
          pair: key,
          up: true,
          price: data[key][0].price,
          volumes: data[key].map((itm) => {
            return {
              time: cnsl.dateParse(itm.date),
              val: itm.price,
            };
          }),
        });
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export { getCourse };
