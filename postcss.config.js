/**
 * PostCSS config
 */

const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');
const hexrgba = require('postcss-hexrgba');
const stylelint = require('stylelint');
const postcssReporter = require('postcss-reporter');
const postcssInlineSvg = require('postcss-inline-svg');
const postcssSvgo = require('postcss-svgo');
const postcssUtils = require('postcss-utilities');

module.exports = ({ options, env }) => {
  return {
    plugins: [
      stylelint(),
      postcssUtils(),
      postcssInlineSvg(),
      // tailwindConfig is set per *design system* webpack.config.js.
      options.postcssOptions && options.postcssOptions.tailwindConfig && tailwindcss(options.postcssOptions.tailwindConfig),
      // Hex in rgba like Sass
      hexrgba(),
      // Use .browserslistrc to determine CSS mutations
      postcssPresetEnv(),
      // Heavy processing for production
      env === 'production' && cssnano(),
      // else
      env !== 'production' && postcssSvgo(),
      postcssReporter({ clearReportedMessages: true }),
    ],
  };
};
