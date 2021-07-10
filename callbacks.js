const open = require("open");
const colors = require("colors");

const convert = size => ({
  kb: calculate(size, 1),
  mb: calculate(size, 2)
});

const sizeUnit = size => (size.mb >= 1 ? size.mb + " MB" : size.kb + " kB");

const sizeColor = (size, output) =>
  size < 0.5
    ? colors.green(output)
    : size >= 1
    ? colors.red(output)
    : colors.yellow(output);

const calculate = (value, pow) => (value / Math.pow(1024, pow)).toFixed(1);

const raw = (spinner, package) => {
  spinner.succeed(`${package.name}` + `@${package.version}`.gray);
  console.log(package);
};

const basic = (spinner, package) => {
  const zip = convert(package.gzip);
  const regular = convert(package.size);

  spinner.succeed(`${package.name}` + `@${package.version}`.gray);

  console.log(
    `${sizeColor(regular.mb, sizeUnit(regular))} ` +
      "minified".gray +
      `\n${sizeColor(zip.mb, sizeUnit(zip))} ` +
      "gzipped".gray
  );
};

const browser = (spinner, package) => {
  open(`https://bundlephobia.com/result?p=${package.name}`);

  spinner.succeed(
    `opened ${package.name}` +
      `@${package.version}`.gray +
      " in your default browser"
  );
};

const similar = (spinner, package) => {
  const packages = package.category.similar;
  const count = packages.length;

  if (count > 0) {
    spinner.succeed(
      package.name + ` ${count} similar package${count > 1 && "s"}`.gray
    );

    packages.forEach(package => {
      console.log(package);
    });
  } else {
    spinner.fail("could not find any similar packages");
  }
};

const info = (spinner, package) => {
  spinner.succeed(`${package.name}` + `@${package.version}`.gray);

  console.log({
    project: package.name,
    version: package.version,
    description: package.description,
    dependents: package.dependents,
    dependencies: Object.keys(package.dependencies).length,
    devDepends: Object.keys(package.devDependencies).length,
    types: Object.values(package.types).toString(),
    license: package.license,
    keywords:
      package.keywords.length > 5
        ? package.keywords.slice(0, 5).toString() + ", ..."
        : package.keywords.toString(),
    deprecated: package.deprecated,
    popular: package.popular,
    downloads: package.humanDownloadsLast30Days,
    crawled: package.lastCrawl,
    authors: package.owners.map(owner => owner.name).join()
  });
};

const history = (spinner, package, input) => {
  const history = Object.values(package);
  const count = history.length;

  spinner.succeed(input + ` ${count} version${count > 1 && "s"}`.gray);

  history.forEach(version => {
    if (Object.keys(version).length > 0) {
      const zip = convert(version.gzip);
      const regular = convert(version.size);

      console.log(
        `\n${input}` +
          `@${version.version}\n${sizeColor(regular.mb, sizeUnit(regular))}`
            .gray +
          " minified".gray +
          `\n${sizeColor(zip.mb, sizeUnit(zip))}` +
          " gzipped".gray
      );
    }
  });
};

const dependencies = (spinner, package) => {
  spinner.succeed(`${package.name}` + `@${package.version}`.gray);

  if (package.dependencyCount === 0)
    return console.log("could not find any dependencies");

  package.dependencySizes.forEach(dependency => {
    const size = convert(dependency.approximateSize);

    console.log(`${dependency.name}: ${sizeColor(size.mb, sizeUnit(size))}`);
  });
};

const peers = (spinner, package) => {
  spinner.succeed(`${package.name}` + `@${package.version}`.gray);

  if (!package.peerDependencies) return console.log("could not find any peers");
  package.peerDependencies.forEach(peer => console.log(peer));
};

module.exports = {
  raw,
  info,
  basic,
  peers,
  browser,
  similar,
  history,
  dependencies
};
