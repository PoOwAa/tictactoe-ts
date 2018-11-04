# Tic Tac Toe

## telepítés

```
npm i
```

## compile

```
npx webpack-cli --config .\webpack.config.js
```

## Projekt kezdése a nulláról

### Hozz létre egy mappát a projektednek

### Függőségek feltelepítése (ha valamelyik már van globálisan, akkor nem kell pl.: typescript)

```bash
$ npm i --save preact typescript webpack ts-loader
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "module": "commonjs",
    "target": "es6",
    "jsx": "react",
    "jsxFactory": "h"
  },
  "include": ["./src/**/*.tsx", "./src/**/*.ts"]
}
```

Itt a lényeges dolog a react miatt az a `jsx: "react"` és a `jsxFactory: "h"`. Alapértelmezetten a TypeScript kód a JSX tagokat `React.createElement(...)` formára alakítja, ami nem fog működni Preact-tal. A Preact ehelyett szimplán `h` használ JSX-nél.

### webpack.config.js

```js
// Mappanév feloldásához
const path = require("path");

module.exports = {
  // Készítsen .map fájlt
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
```

### Mappaszerkezet

- `assets`: ide kerülnek a képek/css fájlok
- `src`: a forráskód maga
- `node_modules`: node hozza létre csomagokat ide telepíti ha npm installnál --SAVE flag vagy -S volt használva
- `dist`: webpack ide generálja ki a kész alkalmazást
