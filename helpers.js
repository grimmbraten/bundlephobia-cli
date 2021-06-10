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

module.exports = {
  convert,
  sizeUnit,
  sizeColor
};
