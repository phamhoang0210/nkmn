const webpack = require('webpack')
const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

const config = {
  resolve: {
    alias: {
      modules: 'bundles/modules',
      config: 'config',
      helpers: 'helpers',
    }
  },
  devtool: 'eval',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
  ]
}

module.exports = config;

if (devBuild) {
} else {
  config.plugins.push(
    new webpack.optimize.DedupePlugin()
  );
}
