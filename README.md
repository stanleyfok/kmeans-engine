KMeans Engine
=======

[![Build Status](https://travis-ci.org/stanleyfok/kmeans-engine.png?branch=master)](https://travis-ci.org/stanleyfok/kmeans-engine)
[![NPM version](https://img.shields.io/npm/v/kmeans-engine.svg)](https://www.npmjs.com/package/kmeans-engine)

This k-means javascript implementation is optimised for large and sparse data set by using an array of objects to represent a sparse matrix.

Most of the other implementations available in npm take a N x M matrix (a 2d array) as input. However, if the data matrix is sparse, it would consumed a lot of memory when creating the N x M matrix. For example, td-idf vectors of text documents actually form a very large and sparse matrix. It will take much time to allocate the 2d array and will even quit if there is not enough memory.

## Installation

`npm install kmeans-engine`

## What's New

#### 1.4.0

Support options to provide initial centroids. See details in [pull request](https://github.com/stanleyfok/kmeans-engine/pull/2)

#### 1.3.0

Update to newer version of [vector-object](https://www.npmjs.com/package/vector-object)

#### 1.2.0

Support maxIterations parameter in options

#### 1.1.0

Updated to a newer version of [vector-object](https://www.npmjs.com/package/vector-object)

## Usage

```js
const kmeans = require('kmeans-engine');

// array of objects
// engineers and their skills level
const engineers = [
  // frontend engineers
  { html: 5, angular: 5, react: 3, css: 3 },
  { html: 4, react: 5, css: 4 },
  { html: 4, react: 5, vue: 4, css: 5 },
  { html: 3, angular: 3, react: 4, vue: 2, css: 3 },

  // backend engineers
  { nodejs: 5, python: 3, mongo: 5, mysql: 4, redis: 3 },
  { java: 5, php: 4, ruby: 5, mongo: 3, mysql: 5 },
  { python: 5, php: 4, ruby: 3, mongo: 5, mysql: 4, oracle: 4 },
  { java: 5, csharp: 3, oracle: 5, mysql: 5, mongo: 4 },

  // mobile engineers
  { objc: 3, swift: 5, xcode: 5, crashlytics: 3, firebase: 5, reactnative: 4 },
  { java: 4, swift: 5, androidstudio: 4 },
  { objc: 5, java: 4, swift: 3, androidstudio: 4, xcode: 4, firebase: 4 },
  { objc: 3, java: 5, swift: 3, xcode: 4, apteligent: 4 },

  // devops
  { docker: 5, kubernetes: 4, aws: 4, ansible: 3, linux: 4 },
  { docker: 4, marathon: 4, aws: 4, jenkins: 5 },
  { docker: 3, marathon: 4, heroku: 4, bamboo: 4, jenkins: 4, nagios: 3 },
  { marathon: 4, heroku: 4, bamboo: 4, jenkins: 4, linux: 3, puppet: 4, nagios: 5 }
];

// accepted options:
// k: number of clusters
// maxIterations (optional): max number of iterations
// initialCentroids (optional): an array of initial centroids in length of k
// debug (optional): show debug message in console or not, default is false
kmeans.clusterize(engineers, { k: 4, maxIterations: 5, debug: true }, (err, res) => {
  console.log('----- Results -----');
  console.log(`Iterations: ${res.iterations}`);
  console.log('Clusters: ');
  console.log(res.clusters);
});
/*
----- Results -----
Iterations: 3
Clusters:
[
  {
    centroid: { docker: 3, kubernetes: 1, aws: 2, ansible: 0.75, linux: 1.75, marathon: 3, jenkins: 3.25,heroku: 2, bamboo: 2, nagios: 2, puppet: 1 },
    vectorIds: [ 12, 13, 14, 15 ]
  },
  {
    centroid: { nodejs: 1.25, python: 2, mongo: 4.25, mysql: 4.5, redis: 0.75, java: 2.5, php: 2, ruby: 2, oracle: 2.25, csharp: 0.75 },
    vectorIds: [ 4, 5, 6, 7 ]
  },
  {
    centroid: { objc: 2.75, swift: 4, xcode: 3.25, crashlytics: 0.75, firebase: 2.25, reactnative: 1, java: 3.25, androidstudio: 2, apteligent: 1 },
    vectorIds: [ 8, 9, 10, 11 ]
  },
  {
    centroid: { html: 4, angular: 2, react: 4.25, css: 3.75, vue: 1.5 },
    vectorIds: [ 0, 1, 2, 3 ]
  }
]
*/
```

## Test

```bash
npm install
npm run test
```

## To-Dos
* enhance initial centroid picking
* speed optimisation

## Authors

  - [Stanley Fok](https://github.com/stanleyfok)

## License

  [MIT](./LICENSE)
