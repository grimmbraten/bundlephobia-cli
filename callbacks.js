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
  spinner.succeed(`${package.name}` + ` ${package.version}`.gray);
  console.log(package);
};

const basic = (spinner, package) => {
  const zip = convert(package.gzip);
  const regular = convert(package.size);

  spinner.succeed(`${package.name}` + ` ${package.version}`.gray);

  console.log(
    `${sizeColor(regular.mb, sizeUnit(regular))} ` +
      "minified".gray +
      `\n${sizeColor(zip.mb, sizeUnit(zip))} ` +
      "gzipped".gray
  );
};

const similar = (spinner, package) => {
  const packages = package.category.similar;
  const count = packages.length;

  spinner.succeed(`found ${count} similar package${count > 1 && "s"}`);

  packages.forEach(package => {
    console.log(package);
  });
};

const info = (spinner, package) => {
  const {
    homepage,
    changelogFilename,
    license,
    deprecated,
    humanDownloadsLast30Days
  } = package;

  spinner.succeed("found additional meta data");

  homepage && console.log(homepage + " homepage".gray);
  changelogFilename && console.log(changelogFilename + " changelog".gray);

  console.log(
    `${license}` +
      ` license`.gray +
      `\n${humanDownloadsLast30Days}` +
      ` downloads (30 days)`.gray
  );
  deprecated &&
    console.log("\nwarning: this package is marked as deprecated".yellow);
};

const history = (spinner, package) => {
  const history = Object.values(package);
  const count = history.length;

  spinner.succeed(`${count} version${count > 1 && "s"}`);

  history.forEach(version => {
    if (Flags.history.includes(flag)) {
      const zip = convert(version.gzip);
      const regular = convert(version.size);

      console.log(
        `\n${version.version}\n${sizeColor(regular.mb, sizeUnit(regular))} ` +
          "minified".gray +
          `\n${sizeColor(zip.mb, sizeUnit(zip))} ` +
          "gzipped".gray
      );
    } else console.log(`${version.version}`);
  });
};

const dependencies = (spinner, package) => {
  spinner.succeed(`${package.name}` + ` ${package.version}`.gray);

  if (package.dependencyCount === 0)
    return console.log("could not find any dependencies");

  package.dependencySizes.forEach(dependency => {
    const size = convert(dependency.approximateSize);

    console.log(`${dependency.name}: ${sizeColor(size.mb, sizeUnit(size))}`);
  });
};

const peers = (spinner, package) => {
  spinner.succeed(`${package.name}` + ` ${package.version}`.gray);

  if (!package.peerDependencies) return console.log("could not find any peers");
  package.peerDependencies.forEach(peer => console.log(peer));
};

module.exports = {
  raw,
  info,
  basic,
  peers,
  similar,
  history,
  dependencies
};
