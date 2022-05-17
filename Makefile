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
publish-npm:
	npm publish --access public
build-release-mac:
	bash ./scripts/build-production.sh
.PHONY: test dev install uninstall test-machine publish-npm build-release-mac