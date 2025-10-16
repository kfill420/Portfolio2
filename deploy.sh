#!/bin/bash

KEY_PATH="/c/Users/alexi/.ssh/oracle_vps.key"
REMOTE_USER="alexis"
REMOTE_HOST="129.151.255.36"
REMOTE_TMP="/home/alexis/deploy_tmp"
REMOTE_PATH="/var/www/portfolio"

echo "📦 Build du projet..."
npm run build

echo "🚀 Transfert vers dossier temporaire..."
ssh -i "$KEY_PATH" $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_TMP"
scp -i "$KEY_PATH" -r dist/* $REMOTE_USER@$REMOTE_HOST:$REMOTE_TMP/

echo "🔧 Déplacement vers dossier Nginx..."
ssh -i "$KEY_PATH" $REMOTE_USER@$REMOTE_HOST << EOF
  sudo mkdir -p $REMOTE_PATH
  sudo cp -r $REMOTE_TMP/* $REMOTE_PATH/
  sudo chown -R www-data:www-data $REMOTE_PATH
  sudo systemctl reload nginx
  rm -rf $REMOTE_TMP
EOF

echo "✅ Déploiement terminé !"