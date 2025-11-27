module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@": "./src",
            "@core": "./src/core",
            "@components": "./src/core/components",
            "@constants": "./src/core/constants",
            "@assets": "./src/core/assets",
            "@auth": "./src/modules/auth",
            "@hooks": "./src/core/hooks"
          },
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
