const fs = require('fs');

const generateTag = function (tag, tagClass, content = '') {
  return '<' + tag + ' class="' + tagClass + '">' + content + '</' + tag + '>';
};

const getColour = function (colourCode) {
  const colours = ['', 'red', 'blue'];
  return colours[colourCode];
};

const getWater = function (colourCode) {
  return generateTag('div', 'water-block ' + getColour(colourCode));
};

const singleRow = function (game, glass) {
  const row = game[glass].map(getWater);
  return generateTag('div', 'glass', row.join(''));
};

const generateRows = function (game) {
  const glasses = Object.keys(game);
  return glasses.map((glass) =>
    singleRow(game, glass)).join('');
};

const header = function () {
  return '<head><title>Tic Tac Toe</title>' +
    '<link rel = "stylesheet" href = "style.css"></head> ';
};

const body = function (game) {
  return generateTag('div', 'wrapper', generateRows(game));
};

const generateHtml = function (game) {
  return generateTag('html', '', header() + body(game));
};

const main = function () {
  const game = JSON.parse(fs.readFileSync('waterSort.json', 'utf-8'));

  fs.writeFileSync('waterSort.html', generateHtml(game), 'utf8');
};

main();
