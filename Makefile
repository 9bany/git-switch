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
publish:
	npm publish --access public
.PHONY: test dev install uninstall test-machine