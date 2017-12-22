# KMeans Object

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![Test coverage][coveralls-image]][coveralls-url]
  [![David deps][david-image]][david-url]
  [![npm download][download-image]][download-url]

This k-means javascript implementation is optimised for large and sparse data set by using array of objects as input. 

Most of the other implementation takes a N x M matrix (a 2d array) as input. However, if the data matrix is sparse, it would consumed a lot of memory when creating the N x M matrix. For example, after td-idf vectors of text documents actually forms a very large sparse matrix. The program will take much time to allocate the 2d array and will even quit if there is not enough memory.

## Installation

`npm install kmeans-object`

## Usage

```js
const kmeans = require('kmeans-object');

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

// k: number of clusters
// debug: show debug message in console or not, default is false
kmeans.clusterize(numbers, { k: 4, debug: true }, (err, res) => {
  console.log(res);
});
/*
{
  iterations: 3,
  clusters: [
    {
      centroid: { html: 4, angular: 2, react: 4.25, css: 3.75, vue: 1.5 },
      vectorIds: [ 0, 1, 2, 3 ]
    },
    {
      centroid: { nodejs: 1.25, python: 2, mongo: 4.25, mysql: 4.5, redis: 0.75, java: 2.5, php: 2, ruby: 2, oracle: 2.25, csharp: 0.75 },
      vectorIds: [ 4, 5, 6, 7 ]
    },
    {
      centroid: { docker: 3,kubernetes: 1,aws: 2,ansible: 0.75,linux: 1.75,marathon: 3,jenkins: 3.25,heroku: 2,bamboo: 2,nagios: 2,puppet: 1 },
      vectorIds: [ 12, 13, 14, 15 ]
    },
    {
      centroid: { objc: 2.75, swift: 4, xcode: 3.25, crashlytics: 0.75, firebase: 2.25, reactnative: 1, java: 3.25, androidstudio: 2, apteligent: 1 },
      vectorIds: [ 8, 9, 10, 11 ]
    }
  ]
}
*/
```

## Test

```bash
npm install
npm run test
```

## To-Dos
* add a bigger fixture file and create another example

## Authors

  - [Stanley Fok](https://github.com/stanleyfok)

## License

  [MIT](./LICENSE)
