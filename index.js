const open = require("open");
const request = require("request");

const { convert } = require("./helpers");
const { Flags, Commands } = require("./types");
const { present, log } = require("./outputs");

const [, , input, ...flags] = process.argv;

const browse = `https://bundlephobia.com/result?p=${input}`;
const endpoint = `https://bundlephobia.com/api/size?package=${input}`;

if (Commands.flags.includes(input)) return console.log(Flags);

if (!input || Commands.help.includes(input) || input.includes("-"))
  return log("bp <bundle-name> [--flags]");

request(endpoint, (_, { statusCode }, body) => {
  if (statusCode !== 200) return log(`could not find ${input}`);

  const bundle = JSON.parse(body);

  const zip = convert(bundle.gzip);
  const regular = convert(bundle.size);

  flags.length === 0 && present(regular, zip, bundle.name, bundle.version);

  flags.forEach(flag => {
    if (Flags.browse.includes(flag)) return open(browse);

    if (Flags.raw.includes(flag)) return log(bundle);

    if (Flags.source.includes(flag))
      return log(`${bundle.repository} - ${bundle.description}`);

    if (Flags.dependencies.includes(flag)) {
      if (bundle.dependencyCount === 0)
        return log(`${bundle.name} has no dependencies`);

      bundle.dependencySizes.forEach((dependency, index) => {
        if (index === 0) return;

        const size = convert(dependency.approximateSize);

        log(
          `${dependency.name}: ${
            size.mb >= 1 ? size.mb + " MB" : size.kb + " kB"
          }`
        );
      });
    } else if (Flags.peer.includes(flag)) {
      if (!bundle.peerDependencies) return log(`${bundle.name} has no peers`);
      bundle.peerDependencies.forEach(peer => log(peer));
    }
  });
});
