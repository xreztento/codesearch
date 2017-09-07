# codesearch

## introduce
This is a codesearch web app with springboot.
### code constituent analyze
Collect source code project from community like github,sourceforge etc. by crawler.
Download source code of collected project, then use analyze tech as text,ast,token etc. to generate code fingerprint.
Analyze your code constituent by code fingerprint comparing, the content include license, code reference percent etc.
### based keyword search code fragment
Support based keyword search code fragment from source code database.
### community map
Support paint the community map.
## codesearch engine
Default used the codesearch engine is google codesearch. it is the command-line Code Search tools from https://github.com/google/codesearch
But you can define youself engine with add a engine implement to plugin package.
## backend

## fronted
