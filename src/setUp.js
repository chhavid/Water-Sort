const fs = require('fs');

const randomNumber = function (limit) {
  return Math.floor(Math.random() * limit);
};

const levels = [{ "glass1": [1, 2, 1], "glass2": [2, 1, 2], "glass3": [] },
{ "glass1": [1, 2, 1], "glass2": [2, 1, 3], "glass3": [3, 2, 3], "glass4": [] },
{ "glass1": [1, 1, 1], "glass2": [2, 2, 2], "glass3": [3, 3], "glass4": [4, 4, 4], "glass5": [3] }, { "glass1": [1, 1, 1], "glass2": [2, 2, 2], "glass3": [3, 3], "glass4": [4, 4, 4], "glass5": [3], "glass6": [5, 5, 5] }
];

const main = function () {
  const selectLevel = levels => levels[randomNumber(4)];
  const level = selectLevel(levels);

  fs.writeFileSync('./src/waterSort.json', JSON.stringify(level), 'utf-8');
};

main();