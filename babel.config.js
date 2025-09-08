module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      // Other plugins can go here
      // "transform-remove-console", // optional
      //"react-native-reanimated/plugin", // MUST BE LAST
    ],
  };
};
