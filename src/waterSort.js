const fs = require('fs');
const { exit } = require('process');

const areGlassesValid = (glass1, glass2) =>
  glass1 && glass2;

const isGlassFull = (glass) => glass.length === 3;

const isGlassEmpty = (glass) => glass.length === 0;

const isMoveInvalid = function (glass1, glass2, game) {
  const first = game['glass' + glass1];
  const second = game['glass' + glass2];
  if (!areGlassesValid(first, second)) {
    return true;
  }
  return isGlassEmpty(first) || isGlassFull(second);
};

const isEmptyOrFull = (glass) => {
  const length = glass.length;
  return length === 0 || length === 3;
}

const isColourSame = function (glass) {
  return glass.every((block, index, array) =>
    block === array[0]);
};

const isSameWater = (glass) =>
  isColourSame(glass) && isEmptyOrFull(glass);

const isGameFinished = (game) =>
  Object.values(game).every((glass) => isSameWater(glass));

const pourwater = function (game, pick, pour) {
  game[pour].push(game[pick].pop());
};

const getObject = function (file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    throw 'Invalid file';
  }
};

const writeFile = function (file, game) {
  try {
    fs.writeFileSync(file, JSON.stringify(game, null, 2), 'utf8');
  } catch (error) {
    throw 'Could not write file.';
  }
};

const updateMove = function (game, pick, pour) {
  pourwater(game, 'glass' + pick, 'glass' + pour);
  writeFile('./src/waterSort.json', game);
};

const printError = function () {
  console.log('Invalid move');
};

const main = function () {
  const [pick, pour] = process.argv.slice(2);
  const game = getObject('./src/waterSort.json');
  isMoveInvalid(pick, pour, game) ? printError() : updateMove(game, pick, pour);
  if (isGameFinished(game)) {
    exit(2);
  }
};

main();
