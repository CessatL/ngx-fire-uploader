const c = require('ansi-colors');
const { execSync } = require('child_process');
const { readdirSync, statSync } = require('fs');
const { join } = require('path');

const getPackages = p =>
  readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());

const packages = getPackages('lib');

console.log(
  'Publishing packages',
  c.cyan(c.symbols.pointerSmall),
  c.yellow(packages)
);

packages.map(function(package) {
  const packagePath = `${__dirname}/../build/${package}`;
  execSync(`cd ${packagePath} && npm publish`);
  console.log(c.bgMagenta(package), 'has been published', c.green(c.symbols.check));
});
