#!/bin/bash
zip App.zip App/app.js App/package.json
cp App.zip Prod/
rm App.zip
zip Monitor.zip Monitor/package.json Monitor/redis_server.json Monitor/removeRedisEntry.js Monitor/restartMonkey.py Monitor/updateRedisCpu.js
cp Monitor.zip Prod/
rm Monitor.zip
cd Prod/
pwd
echo "-------------------------------------------------------------------------"
echo "Installing dependencies..."
npm install
echo "Successfully installed the required dependencies."
echo "-------------------------------------------------------------------------"
node digitalocean.js
echo "-------------------------------------------------------------------------"
echo "Waiting for the digital ocean droplet to get properly initialized....."
sleep 2m
echo "-------------------------------------------------------------------------"
echo "Running the ansible playbook now."
pwd
ansible-playbook -i inventory --sudo prod_configuration.yml
echo "Playbook executed successfully."
echo "-------------------------------------------------------------------------"
cd ..
echo "Copying inventory file in parent directory."
cp Prod/inventory .