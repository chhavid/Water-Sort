#! /bin/bash

node ./src/setUp.js
node ./src/generateHtml.js;open waterSort.html
exitcode=0
while [[ $exitcode == 0 ]]; do 
  read -p "Pick a glass to take water " pick
  read -p "Pick a glass to pour " pour

  node ./src/waterSort.js ${pick} ${pour}
  exitcode=$?
  node ./src/generateHtml.js
done 

echo 'You won!'
