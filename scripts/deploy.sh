#!/bin/bash

directory="/root/apps/streaming-overlay"
filename="streaming-overlay.tar.gz"

# delete and unarchive the files
echo "Delete old files..."
rm -rf $directory
mkdir -p $directory

echo "Unarchive $filename..."
tar -xzvf $filename -C $directory

# deploy
cd $directory
yarn && yarn build
pm2 start ecosystem.config.js
