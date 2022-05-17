#! /bin/bash
echo '{"glass1": [1,2,1],"glass2": [2,1,2],"glass3": []}' > waterSort.json
# echo '{"glass1": [1,2,1],"glass2": [2,1,3],"glass3": [3,2,3],"glass4": []}' > waterSort.json
# echo '{"glass1": [1,1,1],"glass2": [2,2,2],"glass3": [3,3],"glass4": [4,4,4],"glass5": [3]}' > waterSort.json
# echo '{"glass1": [1,1,1],"glass2": [2,2,2],"glass3": [3,3],"glass4": [4,4,4],"glass5": [3],"glass6": [5,5,5]}' > waterSort.json
  node generateHtml.js;open waterSort.html

while [[ $? == 0 ]]; do 
  read -p "Pick a glass to take water " pick
  read -p "Pick a glass to pour " pour

  node waterSort.js ${pick} ${pour}
  exitcode=$?
  node generateHtml.js
  echo "exit" ${exitcode} | bash
done 

echo 'You won!'
