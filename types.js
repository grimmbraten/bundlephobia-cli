const Flags = {
  source: ["---source", "-S"],
  dependencies: ["--dependencies", "-D"],
  peer: ["--peer", "-P"],
  raw: ["--raw", "-R"]
};

const Commands = {
  flags: ["flags", "--flags", "-F"],
  help: ["help", "--help", "-H"]
};

module.exports = {
  Flags,
  Commands
};
