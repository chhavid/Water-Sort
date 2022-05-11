#! /bin/bash
echo '{"glass1": [1,2,1],"glass2": [2,1,2],"glass3": []}' > waterSort.json
  node generateHtml.js
  open waterSort.html

while [[ $? == 0 ]]; do 
  read -p "Pick a glass to take water " pick
  read -p "Pick a glass to pour " pour

  node waterSort.js ${pick} ${pour}
  exitcode=$?
  node generateHtml.js
  open waterSort.html
  echo "exit" ${exitcode} | bash
done 

echo 'You won!'
