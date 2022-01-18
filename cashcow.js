#!/ust/bin/env node
import { getCourse } from "./services/course.service.js";
import { getArgs } from "./helpers/args.js";

const initCLI = () => {
  const args = getArgs(process.argv);
  getCourse(args);
  setInterval(() => {
    getCourse(args);
  }, 1000 * 60);
};

initCLI();
