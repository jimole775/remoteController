START "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "http://127.0.0.1:1110"

devtool server/bundle.node.js
IF ERRORLEVEL 1 (node server/bundle.node.js)






