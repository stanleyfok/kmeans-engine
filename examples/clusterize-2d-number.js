const kmeans = require('../');
const numbers = require('../fixtures/2d-numbers');

kmeans.clusterize(numbers, { k: 3, maxIterations: 10, debug: true }, (err, res) => {
  console.log('----- Results -----');
  console.log(`Iterations: ${res.iterations}`);
  console.log('Clusters: ');
  console.log(res.clusters);
});
