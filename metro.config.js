const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'), // Specify the SVG transformer
  },
  resolver: {
    assetExts: [], // Initialize as an empty array to start filtering
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx', 'svg'], // Include svg extension
  },
};

// Merge default configuration with your custom settings
module.exports = mergeConfig(getDefaultConfig(__dirname), {
  transformer: config.transformer,
  resolver: {
    assetExts: getDefaultConfig(__dirname).resolver.assetExts.filter(
      ext => ext !== 'svg',
    ), // Exclude svg from asset extensions
    sourceExts: config.resolver.sourceExts, // Use the source extensions from the config
  },
});
