const kmeans = require('../');
const engineers = require('../fixtures/engineers');

kmeans.clusterize(engineers, 4, (err, res) => {
  console.log(`Iterations: ${res.iterations}`);
  console.log('Centroids: ');
  console.log(res.clusters);
});
