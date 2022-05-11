#!/usr/bin/env bash
echo "migrate database"
cp db_store/db/example_db.json db_store/db/db.json
echo "Install packages"
npm install
echo "Install pkg global"
npm install pkg -g
echo "Run build for mac"
pkg -t node14-macos-x64 --out-path build/mac .
echo "Run build for linux"
pkg -t node14-linux-x64 --out-path build/linux .
echo "Run build for win "
pkg -t node14-win-x64 --out-path build/win .