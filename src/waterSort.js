const fs = require('fs');
const { exit } = require('process');

const glassCount = game =>
  Object.keys(game).length;

const isGlassValid = (game, glass) =>
  glass > 0 && glass <= glassCount(game);

const areGlassesValid = function (game, glass1, glass2) {
  return [glass1, glass2].every((glass) => isGlassValid(game, glass));
};

const isGlassFull = (game, glass) =>
  game['glass' + glass].length === 3;

const isGlassEmpty = (game, glass) =>
  game['glass' + glass].length === 0;

const isMoveInvalid = function (glass1, glass2, game) {
  if (!areGlassesValid(game, glass1, glass2)) {
    return true;
  }
  return isGlassEmpty(game, glass1) || isGlassFull(game, glass2);
};

const isEmptyOrFull = (length) =>
  length === 0 || length === 3;

const isColourSame = function (game, glass) {
  return game[glass].every((block, index, array) =>
    block === array[0]);
};

const isSameWater = function (game, glass) {
  const length = game[glass].length;
  return isColourSame(game, glass) && isEmptyOrFull(length);
};

const isGameFinished = (game) =>
  Object.keys(game).every((glass) => isSameWater(game, glass));

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