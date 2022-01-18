const pairs = ["BTC_USD", "USD_RUB"];

const getArgs = (args) => {
  const res = [];
  let err = null;
  const [executer, file, ...rest] = args;
  rest.forEach((value) => {
    res.push(value);
  });
  return err ? err : res;
};

export { getArgs };
