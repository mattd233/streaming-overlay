#!/bin/bash

set -euo pipefail

# source the 'environment' file to import env variables
source ./environment

filename="streaming-overlay.tar.gz"

# tar up the current directory
rm -rf $filename
tar -czvf $filename --exclude='node_modules' --exclude='.output' ./

# copy over files and deploy script 
ssh -i $SSH_KEY_PATH root@$IP_ADDRESS "rm -rf ~/$filename"
scp -i $SSH_KEY_PATH $filename ./scripts/deploy.sh root@$IP_ADDRESS:~/

# run the script
ssh -i $SSH_KEY_PATH root@$IP_ADDRESS "chmod +x deploy.sh && ./deploy.sh"

# clean up
ssh -i $SSH_KEY_PATH root@$IP_ADDRESS "rm -rf ~/$filename deploy.sh"
rm -rf $filename
