#!/usr/bin/env node

require("colors");

const ora = require("ora");
const request = require("request");

const controller = require("./controller");

const [, , input, flag] = process.argv;

const spinner = ora(`starting service`).start();

if (!input || input.includes("--"))
  return spinner.info(
    "bundlephobia-cli examples" +
      "\nbp react " +
      "view basic information about the latest react package".gray +
      "\nbp orb --dependencies " +
      "list all dependencies for orb".gray +
      "\nbp colors --info " +
      "view repository information".gray
  );

const command = controller(input, flag);

spinner.text = command.request;

const req = request(command.endpoint, (_, { statusCode }, body) => {
  clearTimeout(timeout);

  if (statusCode !== 200) return spinner.fail(command.failed);

  const package = JSON.parse(body);
  command.callback(spinner, package);
});

const timeout = setTimeout(() => {
  req.abort();
  return spinner.fail("trouble connecting to service, please try again");
}, 5000);
