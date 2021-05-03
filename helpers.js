const convert = size => ({
  kb: calculate(size, 1),
  mb: calculate(size, 2)
});

const calculate = (value, pow) => (value / Math.pow(1024, pow)).toFixed(1);

module.exports = {
  convert
};
