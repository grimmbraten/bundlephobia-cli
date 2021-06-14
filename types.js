const Flags = {
  info: ["--info", "-I"],
  dependencies: ["--dependencies", "-D"],
  peer: ["--peer", "-P"],
  raw: ["--raw", "-R"],
  browse: ["--browse", "-B"],
  history: ["--history", "-H"],
  list: ["--list", "-L"],
  similar: ["--similar", "-S"]
};

const Commands = {
  flags: ["flags", "--flags", "-F"],
  help: ["help", "--help", "-H"],
  examples: ["examples", "--examples", "-E"]
};

module.exports = {
  Flags,
  Commands
};
