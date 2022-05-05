test: 
	yarn test
install:
	npm install -g .
uninstall:
	npm uninstall -g swgit
dev: 
	node bin/index.js
.PHONY: test dev install uninstall