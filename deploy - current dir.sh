#!/bin/bash
# Manual deployment script

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -P 8288 -r build/* crude@49.50.10.46:/var/www/crudeboard.digaji.xyz/

echo "Finished!"