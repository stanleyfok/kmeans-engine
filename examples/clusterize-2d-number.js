const kmeans = require('../');
const numbers = require('../fixtures/2d-numbers');

kmeans.clusterize(numbers, { k: 3, debug: true }, (err, res) => {
  console.log('----- Results -----');
  console.log(`Iterations: ${res.iterations}`);
  console.log('Centroids: ');
  console.log(res.clusters);
});
