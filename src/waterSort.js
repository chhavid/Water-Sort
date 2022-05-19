const fs = require('fs');
const { exit } = require('process');

const areGlassesValid = (glass1, glass2) =>
  glass1 && glass2;

const isGlassFull = (glass, capacity) => glass.length === capacity;

const isGlassEmpty = (glass) => glass.length === 0;

const isMoveInvalid = function (glass1, glass2, game) {
  const first = game.glasses[glass1 - 1];
  const second = game.glasses[glass2 - 1];
  if (!areGlassesValid(first, second)) {
    return true;
  }
  return isGlassEmpty(first) || isGlassFull(second, game.capacity);
};

const isEmptyOrFull = (glass) => {
  const capacity = 3;
  return isGlassEmpty(glass) || isGlassFull(glass, capacity);
};

const isColourSame = function (glass) {
  return glass.every((block, index, array) =>
    block === array[0]);
};

const isSameWater = (glass) =>
  isColourSame(glass) && isEmptyOrFull(glass);

const isGameFinished = (game) =>
  game.glasses.every((glass) => isSameWater(glass));

const pourwater = function (pick, pour) {
  pour.push(pick.pop());
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
  pourwater(game.glasses[pick - 1], game.glasses[pour - 1]);
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
