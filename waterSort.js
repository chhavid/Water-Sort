const fs = require('fs');
const { exit } = require('process');

const isSameWater = function (game, glass) {
  const length = game[glass].length;
  const sameColor = game[glass].every((block, index, array) =>
    block === array[0]);
  const emptyOrFull = length === 0 || length === 3;
  return sameColor && emptyOrFull;
};

const isGlassValid = function (glass) {
  return /^[1-3]$/.test(glass);
};

const isGlassFull = function (game, glass) {
  return game['glass' + glass].length === 3;
};

const isMoveInvalid = function (glass1, glass2, game) {
  if (game['glass' + glass1].length === 0) {
    return true;
  }
  return ![glass1, glass2].every(isGlassValid) || isGlassFull(game, glass2);
};

const isGameFinished = function (game) {
  return Object.keys(game).every((glass) => isSameWater(game, glass));
};

const pourwater = function (game, pick, pour) {
  game[pour].push(game[pick].pop());
};

const writeFile = function (file, game) {
  fs.writeFileSync(file, JSON.stringify(game, null, 2), 'utf8');
};

const main = function () {
  const [pick, pour] = process.argv.slice(2);
  const game = JSON.parse(fs.readFileSync('waterSort.json', 'utf8'));
  if (isMoveInvalid(pick, pour, game)) {
    console.log('Invalid move');
    return;
  }
  pourwater(game, 'glass' + pick, 'glass' + pour);
  writeFile('waterSort.json', game);
  if (isGameFinished(game)) {
    exit(2);
  }
};

main();
