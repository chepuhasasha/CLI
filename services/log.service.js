import chalk from "chalk";

const coursePrint = ({ pair, up, volumes, price }) => {
  if (up) {
    console.log(
      `\n${chalk.greenBright(" ↑")} ${chalk.bgGreenBright(
        chalk.black(` ${pair} `)
      )} ${chalk.greenBright(price)}\n`
    );
  } else {
    console.log(
      `\n${chalk.red(" ↓")} ${chalk.bgRed(` ${pair} `)} ${chalk.red(price)}\n`
    );
  }

  volumes.forEach((item) => {
    console.log(`   ${chalk.grey(item.time + " | ")} ${item.val}`);
  });
  console.log(" ");
};

const errorPrint = (err) => {
  console.log(`${chalk.bgRed(" ERROR ")}🚨\n ${err}`);
};

const dateParse = (timestamp) => {
  const d = new Date(timestamp * 1000);
  const fDate = {
    d: d.getDate() <= 9 ? "0" + d.getDate() : d.getDate(),
    m: d.getMonth() <= 9 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1,
    y: d.getFullYear(),
    h: d.getHours() <= 9 ? "0" + d.getHours() : d.getHours(),
    min: d.getMinutes() <= 9 ? "0" + d.getMinutes() : d.getMinutes(),
    s: d.getSeconds() <= 9 ? "0" + d.getSeconds() : d.getSeconds(),
  };
  return `${fDate.d}.${fDate.m}.${fDate.y} ${fDate.h}:${fDate.min}:${fDate.s}`;
};

const configPrint = ({ pair, limit, time }) => {
  console.log(
    `\n⚙️  ${chalk.bgMagentaBright(chalk.black(" CONFIG "))}\n\n ${chalk.grey(
      "PAIR:"
    )} ${pair} \n ${chalk.grey("LIMIT:")} ${limit} \n ${chalk.grey(
      "UPDATE TIME:"
    )} ${time}\n`
  );
};

const clearLog = () => {
  console.log("\x1Bc");
};

export default {
  course: coursePrint,
  err: errorPrint,
  dateParse,
  configPrint,
  clearLog,
};
