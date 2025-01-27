// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.ASSET_PATH = '/';
process.env.AUTH_AUDIENCE = 'https://holoniq.auth0.com/api/v2/';
process.env.AUTH_CLIENTID = 'h5b22E6kkiKwjgE7YQSAy2CWLusME7rC'
process.env.AUTH_DOMAIN = 'auth.holoniq.com'
process.env.BASE_URL = 'https://my.holoniq.com'
process.env.API_URL = 'https://be-staging.holoniq.com'





var webpack = require('webpack'),
  config = require('../webpack.config');

delete config.chromeExtensionBoilerplate;

config.mode = 'production';

webpack(config, function (err) {
  if (err) throw err;
});
