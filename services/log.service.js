import chalk from "chalk";

const coursePrint = ({ pair, up, volumes, price }) => {
  console.log(chalk.grey("―――――――――――――――――――"));
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
    console.log(`   ${chalk.grey(item.time + ":")} ${item.val}`);
  });
  console.log(" ");
};

const errorPrint = (err) => {
  console.log(`${chalk.bgRed(" ERROR ")}🚨\n ${err}`);
};

export default {
  course: coursePrint,
  err: errorPrint,
};
