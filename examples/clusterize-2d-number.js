const kmeans = require('../');
const numbers = require('../fixtures/2d-numbers');

kmeans.clusterize(numbers, 3, (err, res) => {
  console.log(`Iterations: ${res.iterations}`);
  console.log('Centroids: ');
  console.log(res.clusters);
});
