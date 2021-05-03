const request = require("request");
const { convert } = require("./helpers");
const { Flags } = require("./flags");
const { present, log } = require("./outputs");

const [, , bundle, ...flags] = process.argv;

if (!bundle) return console.log("no bundle provided");

request(
  `https://bundlephobia.com/api/size?package=${bundle}`,
  (_, { statusCode }, body) => {
    if (statusCode !== 200) {
      return log(
        statusCode === 500
          ? "package not found"
          : "something went wrong, please try again"
      );
    }

    const bundle = JSON.parse(body);

    const zip = convert(bundle.gzip);
    const regular = convert(bundle.size);

    present(regular, zip, bundle.name, bundle.version);

    flags.forEach(flag => {
      if (Flags.raw.includes(flag)) return log(bundle);
      if (Flags.source.includes(flag))
        return log(`${bundle.repository} - ${bundle.description}`);

      if (Flags.dependencies.includes(flag)) {
        if (bundle.dependencyCount === 0) return log("no dependencies");

        bundle.dependencySizes.forEach(dependency => {
          const size = convert(dependency.approximateSize);
          log(
            `${dependency.name}: ${
              size.mb >= 1 ? size.mb + " MB" : size.kb + " kB"
            }`
          );
        });
      } else if (Flags.peer.includes(flag)) {
        if (!bundle.peerDependencies) return log("no peers");
        bundle.peerDependencies.forEach(peer => log(peer));
      }
    });
  }
);
