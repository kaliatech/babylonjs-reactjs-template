# Babylon.js Template for React and Vite

A starting point and example for a project using typescript, vite, react, and Babylon.js.

Includes:
 - Correct setup and teardown, which is especially noticeable when using `<React.StrictMode>`.
    - Using Babylon.js with React.StrictMode enforces a back-to-back initialize/dispose of the entire Babylon.js engine and underlying resources _unless_ the babylon engine is initialized globally and managed outside of the react rendering scope.
 - Bundle splitting with vite to monitor size of Babylon.js imports
 - Correct imports for Babylon.js to get smaller bundle size. In this example:

vite v7.2.2, building client environment for production...
525 modules transformed.

| File                                      | Size           | Gzipped    |
| -------------                             | -------------: | ---------: |
| dist/index.html                           |     0.65 kB    |   0.37 kB  |
| dist/assets/favicon-DZd3MaSY.svg          |     1.61 kB    |   0.82 kB  |
| dist/assets/index-DCCHBDDu.css            |     0.39 kB    |   0.23 kB  |
| dist/assets/index-YiJ9Zlxd.js             |     3.43 kB    |   1.48 kB  |
| dist/assets/vendor-BsoQGpRC.js            |   192.63 kB    |  60.37 kB  |
| dist/assets/vendor_babylonjs-DyGShI1H.js  | 1,742.97 kB    | 409.50 kB  |
