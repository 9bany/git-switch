test: 
	yarn test
test-machine: 
	yarn test-machine
install:
	npm install -g .
uninstall:
	npm uninstall -g swgit
dev: 
	node bin/index.js
.PHONY: test dev install uninstall test-machine