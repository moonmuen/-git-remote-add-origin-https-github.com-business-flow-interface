#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 打包构建
npm run build

# 进入生成的构建文件夹
cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

# 初始化git
git init
git add -A
git commit -m 'deploy'

# 发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:<用户名>/business-flow-interface.git master:gh-pages

cd -

echo "部署完成，请访问 https://<用户名>.github.io/business-flow-interface" 