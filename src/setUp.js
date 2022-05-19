const fs = require('fs');

const randomNumber = function (limit) {
  return Math.floor(Math.random() * limit);
};

const levels = [
  [[1, 2, 1], [2, 1, 2], []],
  [[1, 2, 1], [2, 1, 3], [3, 2, 3], []],
  [[1, 1, 1], [2, 2, 2], [3, 3], [4, 4, 4], [3]],
  [[1, 1, 1], [2, 2, 2], [3, 3], [4, 4], [3, 5], [5, 5, 4]],
];

const selectLevel = levels => levels[randomNumber(4)];

const gameObject = function (levels) {
  return {
    'glasses': selectLevel(levels),
    'capacity': 3
  };
};
const main = function (levels) {
  const game = gameObject(levels);
  fs.writeFileSync('./src/waterSort.json', JSON.stringify(game), 'utf-8');
};

main(levels);
