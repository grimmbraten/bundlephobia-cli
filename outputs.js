const log = (output, params) => console.log(output);

const present = (regular, zip, name, version) =>
  console.log(
    `${name}@${version}\n${
      regular.mb >= 1 ? regular.mb + " MB" : regular.kb + " kB"
    } / ${zip.mb >= 1 ? zip.mb + " MB" : zip.kb + " kB"}`
  );

module.exports = {
  log,
  present
};
