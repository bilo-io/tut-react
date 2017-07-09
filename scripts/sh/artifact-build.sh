rm -rf artifact dist
npm run build
mkdir artifact
mv dist ./artifact
cp server.js ./artifact
cp package.json ./artifact
cd ./artifact
npm install --production
