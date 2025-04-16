#!/bin/bash

# Chargez NVM avec le bon chemin
export NVM_DIR="/home/gwenell/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Utilisez la bonne version de Node
nvm use v22.14.0 >/dev/null 2>&1

# Démarrez le serveur avec le chemin complet
cd /var/www/web-ide
$NVM_DIR/versions/node/v22.14.0/bin/serve -s build -l 3100
