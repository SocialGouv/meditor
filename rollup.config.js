import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy";
import filesize from "rollup-plugin-filesize";
import json from "rollup-plugin-json";
import nodeBuiltins from "rollup-plugin-node-builtins";
import nodeGlobals from "rollup-plugin-node-globals";
import nodeResolve from "rollup-plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import postcssUrl from "postcss-url";

export default {
  input: "src",

  output: [
    {
      file: "./dist/index.js",
      format: "umd",
      name: "Meditor",
      globals: {
        react: "React"
      }
    }
  ],

  external: ["react", "react-dom"],

  plugins: [
    // Inject CSS in JS with resources as data uris:
    postcss({
      minimize: true,
      sourceMap: "inline",
      plugins: [postcssUrl({ url: "inline" })]
    }),
    // Externalize peer dependencies:
    peerDepsExternal(),
    // Import JSON files:
    json(),
    // Transpile Babel to ES6:
    babel({ exclude: "./node_modules" }),
    // Convert CommonJS dependencies to ES2015:
    commonjs(),
    // Shim node.js globals:
    nodeGlobals(),
    // Shim node.js built-in libraries:
    nodeBuiltins(),
    // Locate dependencies via node.js resolution algorithm:
    nodeResolve(),
    // Copy typings definitions:
    copy({
      targets: [{ src: "./src/index.d.ts", dest: "./dist" }]
    }),
    // Calculate output bundle size:
    filesize()
  ]
};
