const { raw, info, basic, peers, browser, similar, history, dependencies } = require('./callbacks');

const controller = (input, flag) => {
  const endpoints = {
    basic: `https://bundlephobia.com/api/size?package=${input}`,
    history: `https://bundlephobia.com/api/package-history?package=${input}`,
    website: `https://bundlephobia.com/result?p=${input}`,
    similar: `https://bundlephobia.com/api/similar-packages?package=${input}`,
    package: `https://ofcncog2cu-dsn.algolia.net/1/indexes/npm-search/${encodeURIComponent(
      input
    )}?x-algolia-application-id=OFCNCOG2CU&x-algolia-api-key=f54e21fa3a2a0160595bb058179bfb1e`
  };

  if (flag) {
    if (Flags.history.includes(flag)) {
      return {
        endpoint: endpoints.history,
        callback: history,
        request: 'fetching history',
        failed: `could not find ${input}`
      };
    } else if (Flags.similar.includes(flag))
      return {
        endpoint: endpoints.similar,
        callback: similar,
        request: 'search for similar packages',
        failed: `could not find ${input}`
      };
    else if (Flags.info.includes(flag))
      return {
        endpoint: endpoints.package,
        callback: info,
        request: 'fetching package information',
        failed: `could not find ${input}`
      };
    else if (Flags.raw.includes(flag))
      return {
        endpoint: endpoints.basic,
        callback: raw,
        request: 'searching for package',
        failed: `could not find ${input}`
      };
    else if (Flags.dependencies.includes(flag))
      return {
        endpoint: endpoints.basic,
        callback: dependencies,
        request: 'looking up dependencies',
        failed: `could not find ${input}`
      };
    else if (Flags.peer.includes(flag))
      return {
        endpoint: endpoints.basic,
        callback: peers,
        request: 'searching for peers',
        failed: `could not find ${input}`
      };
    else if (Flags.browse.includes(flag)) {
      return {
        endpoint: endpoints.basic,
        callback: browser,
        request: 'searching for package',
        failed: `could not find ${input}`
      };
    } else return;
  }

  return {
    endpoint: endpoints.basic,
    callback: basic,
    request: 'searching for package',
    failed: `could not find ${input}`
  };
};

const Flags = {
  info: ['--info', '-i'],
  dependencies: ['--dependencies', '-d'],
  peer: ['--peer', '-p'],
  raw: ['--raw', '-r'],
  browse: ['--browse', '-b'],
  history: ['--history', '-h'],
  similar: ['--similar', '-s']
};

module.exports = controller;
