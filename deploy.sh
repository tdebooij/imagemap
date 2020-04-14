#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

pause

# navigate into the build output directory
cd dist

pause

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

pause

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:tdebooij/imagemap.git master:gh-pages

cd -

pause