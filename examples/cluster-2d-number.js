const kmeans = require('../');
const engineers = require('../fixtures/2d-numbers');

kmeans.clusterize(engineers, 3, (err, res) => {
  console.log(`Iterations: ${res.iterations}`);
  console.log('Centroids: ');
  console.log(res.clusters);
});
