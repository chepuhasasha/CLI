import axios from "axios";
import chalk from "chalk";
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
  console.log(
    chalk.bgMagentaBright(chalk.black(" waiting for server response..."))
  );
  await axios(options)
    .then(function (response) {
      console.log("\x1Bc");
      const data = response.data;
      let sort = data[pair]
        .map((itm) => {
          return +itm.price;
        })
        .sort((a, b) => a - b);
      const min = Math.floor(sort[0]);
      const max = Math.floor(sort[data[pair].length - 1]);
      cnsl.course({
        pair,
        up: true,
        price: data[pair][0].price,
        volumes: data[pair].map((itm) => {
          return {
            time: cnsl.dateParse(itm.date),
            val:
              parseFloat(itm.price).toFixed(2) +
              chartLine(+itm.price, min, max),
          };
        }),
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

const chartLine = (val, min, max) => {
  const step = (max - min) / 100;
  const size = 50;
  const percent = (val - min) / step;
  return "    " + chalk.grey("▬").repeat(Math.floor(size * (percent / 100)));
};

export { getCourse };
