/* eslint-disable import/no-commonjs */

module.exports = api => {
  const isTest = api.env('test');
  const targets = {};

  if (!isTest) {
    targets.browsers = ['last 2 versions', 'ie >= 9'];
  } else {
    targets.node = true;
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets,
        },
      ],
    ],
    overrides: [
      {
        test: 'packages/*',
        presets: ['@babel/preset-typescript'],
      },
    ],
  };
};
