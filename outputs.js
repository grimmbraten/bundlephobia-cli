const colors = require("colors");

const log = output => console.log(output);

const sizeColor = (size, output) =>
  size < 1
    ? colors.green(output)
    : size >= 2
    ? colors.yellow(output)
    : colors.red(output);

const present = (regular, zip, name, version) => {
  const regularText = regular.mb >= 1 ? regular.mb + " MB" : regular.kb + " kB";
  const zipText = zip.mb >= 1 ? zip.mb + " MB" : zip.kb + " kB";

  console.log(
    `${name}@${version}\n${sizeColor(regular.mb, regularText)} / ${sizeColor(
      zip.mb,
      zipText
    )}`
  );
};

module.exports = {
  log,
  present
};
