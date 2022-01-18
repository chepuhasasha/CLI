import axios from "axios";
import qs from "qs";
import cnsl from "./log.service.js";

const getCourse = async function (pairs) {
  const res = [];
  const data = { pair: pairs.toString(), limit: 5 };
  const options = {
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(data),
    url: "https://api.exmo.com/v1/trades",
  };
  console.log("жду ответ сервера...");
  await axios(options)
    .then(function (response) {
      // process.stdout.write("\u001b[2J\u001b[0;0H");
      console.log("\x1Bc");
      const data = response.data;
      Object.keys(data).forEach((key) => {
        const d = {
          pair: key,
          up: true,
          price: data[key][0].price,
          volumes: data[key].map((itm) => {
            return {
              time: itm.date,
              val: itm.price,
            };
          }),
        };
        cnsl.course({
          pair: key,
          up: true,
          price: data[key][0].price,
          volumes: data[key].map((itm) => {
            return {
              time: itm.date,
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
