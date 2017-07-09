# # Node
# echo '============================================'
# echo ' (init-react)    =>    express'
# echo '--------------------------------------------'
# npm install \
#     express \
# --save
# # Webpack
# echo '============================================'
# echo ' (init-react)    =>    webpack'
# echo '--------------------------------------------'
# npm install \
#     webpack \
#     webpack-dev-server \
#     css-loader \
#     style-loader \
#     sass-loader \
#     file-loader \
#     html-webpack-plugin \
#     node-sass \
# --save-dev
# React
echo '============================================'
echo ' (init-react)    =>    react'
echo '--------------------------------------------'
npm install \
    react \
    react-dom \
--save-dev
# React Router
echo '============================================'
echo ' (init-react)    =>    react-router'
echo '--------------------------------------------'
npm install \
    react-router \
    react-router-dom \
--save-dev
# Babel
echo '============================================'
echo ' (init-react)    =>    babel'
echo '--------------------------------------------'
echo '{
  "presets" : ["es2015", "react"]
}' > .babelrc
npm install \
    babel-core \
    babel-loader \
    babel-preset-es2015 \
    babel-preset-react \
--save-dev