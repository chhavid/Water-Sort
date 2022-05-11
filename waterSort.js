const fs = require('fs');

const isSameWater = function (game, glass) {
  const length = game[glass].length;
  const sameColor = game[glass].every((e, i, a) => e === a[0]);
  const emptyOrFull = length === 0 || length === 3;
  return sameColor && emptyOrFull;
};

const isGlassValid = function (glass) {
  return /^[1-3]$/.test(glass)
};

const isGlassFull = function (game, glass) {
  return game['glass' + glass].length === 3;
};

const isMoveInvalid = function (glass1, glass2, game) {
  return ![glass1, glass2].every(isGlassValid) || isGlassFull(game, glass2);
};

const isGameFinished = function (game) {
  return Object.keys(game).every((glass) => isSameWater(game, glass));
};

const pourwater = function (game, pick, pour) {
  game[pour].push(game[pick].pop());
  writeFile('waterSort.json', game);

};

const writeFile = function (file, game) {
  fs.writeFileSync(file, JSON.stringify(game, null, 2), 'utf8');
};

const main = function () {
  const [pick, pour] = process.argv.slice(2);
  const game = JSON.parse(fs.readFileSync('waterSort.json', 'utf8'));
  if (isMoveInvalid(pick, pour, game)) {
    console.log('Invalid move');
    process.exit(0);
  };
  pourwater(game, 'glass' + pick, 'glass' + pour);
  if (isGameFinished(game)) {
    process.exit(2)
  };
};

main()
process.exit(0);
