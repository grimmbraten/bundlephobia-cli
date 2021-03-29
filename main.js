const request = require("request");

const [, , bundle, ...flags] = process.argv;

request(
  `https://bundlephobia.com/api/size?package=${bundle}`,
  (error, response, body) => {
    if (error || response.statusCode !== 200) {
      error.code === "PackageNotFoundError"
        ? console.info(error.message)
        : console.error("Something went wrong, please try again\n: ", error);
    }

    const bundle = JSON.parse(body);

    if ((flags.length === 1 && flags === "--raw") || flags === "-R") {
      console.log(bundle);
      return;
    }

    const {
      name,
      version,
      size,
      gzip,
      repository,
      description,
      dependencyCount,
      dependencySizes,
      peerDependencies,
    } = bundle;

    const zip = convert(gzip);
    const regular = convert(size);

    console.log(
      `\n${name}@${version}\n${
        regular.mb >= 1 ? regular.mb + " MB" : regular.kb + " kB"
      } / ${zip.mb >= 1 ? zip.mb + " MB" : zip.kb + " kB"}`
    );

    flags.forEach(flag => {
      if (flag === "--source" || flag === "-S")
        console.log(`\n${repository}\n${description}`);
      else if (flag === "--dependencies" || flag === "-D") {
        if (dependencyCount === 0) console.log("No dependencies");
        else {
          console.log("");
          dependencySizes.forEach(dependency => {
            const size = convert(dependency.approximateSize);
            console.log(
              `${dependency.name}: ${
                size.mb >= 1 ? size.mb + " MB" : size.kb + " kB"
              }`
            );
          });
        }
      } else if (flag === "--peer" || flag === "-P") {
        if (peerDependencies.length === 0) console.log("No peers");
        else peerDependencies.forEach(peer => console.log(peer));
      }
    });

    console.log("");
  }
);

const convert = size => ({ kb: calculate(size, 1), mb: calculate(size, 2) });

const calculate = (value, pow) => (value / Math.pow(1024, pow)).toFixed(1);
