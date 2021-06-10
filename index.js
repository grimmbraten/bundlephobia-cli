#!/usr/bin/env node

require("colors");

const ora = require("ora");
const open = require("open");
const request = require("request");

const { convert, sizeUnit, sizeColor } = require("./helpers");
const { Flags, Commands } = require("./types");

const [, , input, ...flags] = process.argv;

const browse = `https://bundlephobia.com/result?p=${input}`;
const endpoint = `https://bundlephobia.com/api/size?package=${input}`;

const spinner = ora(`Starting service`).start();

if (Commands.flags.includes(input))
  return spinner.info(
    "available flags \n--browse " +
      "open bundlephobia in your default browser".gray +
      "\n--dependencies " +
      "list a bundles dependencies".gray +
      "\n--peer " +
      "discover a bundles peer dependencies".gray +
      "\n--raw " +
      "print raw api response (json)".gray +
      "\n--source " +
      "view bundle repository information".gray
  );

if (Commands.examples.includes(input))
  return spinner.info(
    "bundlephobia-cli examples" +
      "\nbp react " +
      "view basic information about the latest react package".gray +
      "\nbp orb --dependencies " +
      "list all dependencies for orb".gray +
      "\nbp colors --source --raw " +
      "view repository information and print raw api response (json)".gray
  );

const help =
  "\nbp <bundle> [--flags] " +
  "search for bundle".gray +
  "\nbp --help " +
  "list available commands".gray +
  "\nbp --flags " +
  "list available flags".gray +
  "\nbp --examples " +
  "show usage examples".gray;

if (Commands.help.includes(input))
  return spinner.info("how to use bundlephobia-cli" + help);

if (!input || input.includes("--")) return spinner.warn("invalid usage" + help);

spinner.text = "Searching for bundle";

let establishedConnection = false;

const req = request(endpoint, (_, { statusCode }, body) => {
  clearTimeout(check);

  if (statusCode !== 200) return spinner.fail(`could not find ${input}`);

  const bundle = JSON.parse(body);

  spinner.succeed(`${bundle.name}@${bundle.version}`);

  const zip = convert(bundle.gzip);
  const regular = convert(bundle.size);

  flags.length === 0 &&
    console.log(
      `${sizeColor(regular.mb, sizeUnit(regular))} ` +
        "minified".gray +
        `\n${sizeColor(zip.mb, sizeUnit(zip))} ` +
        "gzipped".gray
    );

  flags.forEach(flag => {
    if (Flags.browse.includes(flag)) return open(browse);
    else if (Flags.raw.includes(flag)) return console.log(bundle);
    else if (Flags.source.includes(flag))
      return console.log(
        "repository: " +
          `${bundle.repository}`.gray +
          "\ndescription: " +
          `${bundle.description}`.gray
      );
    else if (Flags.dependencies.includes(flag)) {
      if (bundle.dependencyCount === 0)
        return console.log("could not find any dependencies");

      bundle.dependencySizes.forEach(dependency => {
        const size = convert(dependency.approximateSize);

        console.log(
          `${dependency.name}: ${sizeColor(size.mb, sizeUnit(size))}`
        );
      });
    } else if (Flags.peer.includes(flag)) {
      if (!bundle.peerDependencies)
        return console.log("could not find any peers");
      bundle.peerDependencies.forEach(peer => console.log(peer));
    } else {
      console.log("invalid flag");
    }
  });
});

const check = setTimeout(() => {
  if (!establishedConnection) {
    req.abort();
    return spinner.fail(
      "trouble connecting to service, please try again later"
    );
  }
}, 5000);
