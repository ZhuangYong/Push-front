process.noDeprecation = true;
module.exports = function(env) {
    const webpackName = `./webpack.${env}.js`;
    console.log("[use webpack]: ", webpackName);
    return require(webpackName);
};
