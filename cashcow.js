#!/ust/bin/env node
import { getCourse } from "./services/course.service.js";
import cnsl from "./services/log.service.js";
import inquirer from "inquirer";
import fs from "fs";

const questions = [
  {
    type: "list",
    name: "pair",
    message: "PAIR",
    choices: ["BTC_USD", "USD_RUB"],
  },
  {
    type: "number",
    name: "limit",
    message: "LIMIT:",
  },
  {
    type: "number",
    name: "time",
    message: "UPDATE TIME (sec.):",
  },
  {
    type: "password",
    name: "token",
    message: "TOKEN:",
  },
  {
    type: "list",
    name: "config",
    message: "save settings?",
    choices: ["Yes", "No"],
  },
  {
    type: "list",
    name: "load",
    message: "load settings from config.json?",
    choices: ["Yes", "No"],
  },
];

let config = {};

fs.readFile("config.json", "utf8", (err, data) => {
  cnsl.clearLog();
  if (err) {
    initSelect();
  } else {
    inquirer.prompt(questions[5]).then((answer) => {
      if (answer.load == "Yes") {
        config = JSON.parse(data);
        cnsl.configPrint(config);
        init(config);
      } else {
        initSelect();
      }
    });
  }
});

const initSelect = () => {
  inquirer.prompt(questions[0]).then((answer) => {
    config.pair = answer.pair;
    inquirer.prompt(questions[1]).then((answer) => {
      config.limit = answer.limit;
      inquirer.prompt(questions[2]).then((answer) => {
        config.time = answer.time;
        inquirer.prompt(questions[3]).then((answer) => {
          config.token = answer.token;
          cnsl.configPrint(config);
          inquirer.prompt(questions[4]).then((answer) => {
            if (answer.config == "Yes") {
              fs.writeFile(
                "config.json",
                JSON.stringify(config, null, 2),
                () => {
                  init(config);
                }
              );
            } else {
              init(config);
            }
          });
        });
      });
    });
  });
};

const init = ({ pair, limit, time }) => {
  getCourse(pair, limit);
  setInterval(() => {
    getCourse(pair, limit);
  }, time * 1000);
};
