// Mappanév feloldásához
const path = require("path");

module.exports = {
  devtool: "source-map",
  // Hol van az alkalmazás forráskódja (TypeScriptben)
  entry: ["./src/app"],
  // Hova készüljön el a JS változat
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js"
  },
  // Milyen fájlokat kell fordítania .ts TypeScript .tsx TypeScript react
  resolve: {
    extensions: [".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ["ts-loader"]
      }
    ]
  }
};
