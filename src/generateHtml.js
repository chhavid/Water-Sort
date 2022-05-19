const fs = require('fs');

const generateTag = function (tag, tagClass, content = '') {
  return '<' + tag + ' class="' + tagClass + '">' + content + '</' + tag + '>';
};

const getColour = function (colourCode) {
  const colours = ['', 'red', 'blue', 'yellow', 'green', 'purple'];
  return colours[colourCode];
};

const getWater = function (colourCode) {
  return generateTag('div', 'water-block ' + getColour(colourCode));
};

const singleRow = function (glass) {
  const row = glass.map(getWater);
  return generateTag('div', 'glass', row.join(''));
};

const generateRows = function (game) {
  const glasses = game.glasses;
  return glasses.map((glass) =>
    singleRow(glass)).join('');
};

const header = function () {
  return '<head><title>Water Sort</title>' +
    '<link rel = "stylesheet" href = "./src/style.css">' +
    '<meta http-equiv="refresh" content="0.5"></head>';
};

const body = function (game) {
  return generateTag('div', 'wrapper', generateRows(game));
};

const generateHtml = function (game) {
  return generateTag('html', '', header() + body(game));
};

const main = function () {
  const game = JSON.parse(fs.readFileSync('./src/waterSort.json', 'utf-8'));
  fs.writeFileSync('waterSort.html', generateHtml(game), 'utf8');
};

main();
