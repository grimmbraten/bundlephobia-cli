#!/usr/bin/env node

require("colors");

const ora = require("ora");
const request = require("request");

const controller = require("./controller");

const [, , input, flag] = process.argv;

(() => {
  const spinner = ora(`starting service`).start();

  if (!input)
    return spinner.info(
      "bundlephobia-cli" +
        "\nbp open " +
        "view package size of latest open version".gray +
        "\nbp colors --info " +
        "fetch information about the colors package".gray +
        "\nbp orb --dependencies " +
        "list all dependencies of the orb package".gray
    );

  const command = controller(input, flag);
  if (!command) return spinner.fail(`failed to resolve passed flag`);
  spinner.text = command.request;

  const req = request(command.endpoint, (_, { statusCode }, body) => {
    clearTimeout(timeout);
    if (statusCode !== 200) return spinner.fail(command.failed);
    command.callback(spinner, JSON.parse(body), input);
  });
})();

const timeout = setTimeout(() => {
  req.abort();
  return spinner.fail("trouble connecting to service, please try again");
}, 5000);
