set -euo pipefail

# 服务器登录用户名，比如：root
USER="$SSH_USER"
# 主机地址，IP 或 域名
HOST="utils.leishanglin.com"
# 应用的访问域名、部署文件夹名称
DOMAIN_NAME="utils.leishanglin.com"

# GZ_TMP_DIR="/tmp/$DOMAIN_NAME"
GZ_TMP_DIR="~/tmp/$DOMAIN_NAME"
DIST_DIR="/usr/share/nginx/html/$DOMAIN_NAME"
CONF_DIR="/etc/nginx/conf.d/$DOMAIN_NAME"
GZ_FILE="dist.tar.gz"

tar --no-xattr -czf  ./$GZ_FILE dist/
ssh $USER@$HOST "sudo mkdir -p $GZ_TMP_DIR $DIST_DIR $CONF_DIR && sudo chown -R $USER:$USER $GZ_TMP_DIR"

scp ./$GZ_FILE ./nginx.conf $USER@$HOST:$GZ_TMP_DIR

ssh -T $USER@$HOST "bash" << EOF
sudo tar -xzf $GZ_TMP_DIR/$GZ_FILE -C $DIST_DIR --strip-components=1
sudo mv $GZ_TMP_DIR/nginx.conf $CONF_DIR
sudo nginx -t && sudo nginx -s reload
sudo rm -rf $GZ_TMP_DIR
EOF

rm $GZ_FILE